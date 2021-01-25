import React from 'react';

import {
  render,
  cleanup,
  screen,
} from '../../../../common/test/testing-library';
import { Language, YouthLanguage } from '../../../../graphql/generatedTypes';
import ApproveYouthProfilePage from '../ApproveYouthProfilePage';
import useProfileByTokens from '../useProfileByTokens';

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
  return render(<ApproveYouthProfilePage />);
};

describe('<ApproveYouthProfilePage />', () => {
  test('data exists, form gets rendered', () => {
    useProfileByTokens.mockImplementation(() => ({
      loading: false,
      error: null,
      data,
    }));

    getWrapper();

    expect(screen.getAllByText('Hyväksy jäsenyys')[0]).toBeInTheDocument();
  });

  test('there is no user data / profile has already been approved', () => {
    useProfileByTokens.mockImplementation(() => ({
      loading: false,
      error: null,
      data: null,
    }));
    getWrapper();

    expect(screen.getByText('Linkki on vanhentunut')).toBeInTheDocument();
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

    it('should show approved link error when useProfileByTokens returns one of the supported errors', () => {
      const errorCodes = [
        'PROFILE_DOES_NOT_EXIST_ERROR',
        'TOKEN_EXPIRED_ERROR',
      ];
      expect.assertions(errorCodes.length);

      for (const code of errorCodes) {
        useProfileByTokens.mockReturnValueOnce(getMockError(code));
        getWrapper();
        expect(
          screen.getAllByText('Linkki on vanhentunut')[0]
        ).toBeInTheDocument();
        cleanup();
      }
    });
  });
});
