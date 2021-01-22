import React from 'react';
import { mount } from 'enzyme';
import { MockedProvider } from '@apollo/client/testing';
import { MemoryRouter } from 'react-router';
import { Provider as ReduxProvider } from 'react-redux';

import store from '../../../../redux/store';
import { updateWrapper } from '../../../../common/test/testUtils';
import ApproveYouthProfilePage from '../ApproveYouthProfilePage';
import { Language, YouthLanguage } from '../../../../graphql/generatedTypes';
import useProfileByTokens from '../useProfileByTokens';
import { mountWithProviders } from '../../../../common/test/testUtils';

jest.mock('../useProfileByTokens');

const data = {
  youthProfileByApprovalToken: {
    profile: {
      firstName: 'Teemu',
      lastName: 'Testaaja',
      language: Language.FINNISH,
      primaryEmail: {
        email: 'teemu.testaaja@tete.fi',
        __typename: 'EmailNode',
        id: '123',
      },
      primaryAddress: {
        address: 'Testikatu 123',
        postalCode: '12345',
        countryCode: 'FI',
        city: 'Helsinki',
        __typename: 'AddressNode',
        id: '123',
      },
      primaryPhone: {
        phone: '0501234567',
        __typename: 'PhoneNode',
        id: '123',
      },
      __typename: 'ProfileNode',
    },
    birthDate: '2000-01-01',
    schoolName: 'Koulu',
    schoolClass: 'Luokka',
    photoUsageApproved: true,
    languageAtHome: YouthLanguage.FINNISH,
    approverEmail: 'ville.vanhempi@test.fi',
    approverFirstName: 'Ville',
    approverLastName: 'Vanhempi',
    approverPhone: '0501234567',
    membershipNumber: '123',
    additionalContactPersons: {
      edges: [],
    },
    __typename: 'YouthProfileType',
  },
};

const getWrapper = () => {
  return mountWithProviders(
    <ApproveYouthProfilePage />
  );
};

describe('<ApproveYouthProfilePage />', () => {
  const expectError = wrapper => {
    const content = wrapper.find('main[className="wrapper"]');
    const title = content.find('h1');

    expect(title.text()).toEqual('Linkki on vanhentunut');
  };

  test('data exists, form gets rendered', async () => {
    useProfileByTokens.mockImplementation(() => ({
      loading: false,
      error: null,
      data,
    }));

    const wrapper = getWrapper();

    await updateWrapper(wrapper);

    const formData = wrapper.find('div[className="formData"]');
    expect(formData).toBeTruthy();
  });

  test('there is no user data / profile has already been approved', async () => {
    useProfileByTokens.mockImplementation(() => ({
      loading: false,
      error: null,
      data: null,
    }));

    const wrapper = getWrapper([]);

    await updateWrapper(wrapper);

    expectError(wrapper);
  });

  describe('errors', () => {
    const getMockError = code => ({
      loading: false,
      error: {
        graphQLErrors: [
          {
            extensions: {
              code,
            },
          },
        ],
      },
      data: null,
    });

    it('should show approved link error when useProfileByTokens returns one of the supported errors', async () => {
      const errorCodes = [
        'PROFILE_DOES_NOT_EXIST_ERROR',
        'TOKEN_EXPIRED_ERROR',
      ];
      expect.assertions(errorCodes.length);

      for (const code of errorCodes) {
        useProfileByTokens.mockReturnValueOnce(getMockError(code));

        const wrapper = getWrapper();

        await updateWrapper(wrapper);

        expectError(wrapper);
      }
    });
  });
});
