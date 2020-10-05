import React from 'react';
import { mount } from 'enzyme';
import { MockedProvider, MockedResponse } from '@apollo/react-testing';
import { MemoryRouter } from 'react-router';
import { Provider as ReduxProvider } from 'react-redux';
import { loader } from 'graphql.macro';

import store from '../../../../redux/store';
import { updateWrapper } from '../../../../common/test/testUtils';
import ApproveYouthProfilePage from '../ApproveYouthProfilePage';
import {
  Language,
  YouthLanguage,
  YouthProfileByApprovalToken,
} from '../../../../graphql/generatedTypes';

const PROFILE_BY_TOKEN = loader(
  '../../graphql/YouthProfileByApprovalToken.graphql'
);

const data: YouthProfileByApprovalToken = {
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
    __typename: 'YouthProfileType',
  },
};

const defaultMock = [
  {
    request: {
      query: PROFILE_BY_TOKEN,
      variables: {},
    },
    result: {
      loading: false,
      data: data,
    },
  },
];

const getWrapper = (mocks?: MockedResponse[]) => {
  return mount(
    <ReduxProvider store={store}>
      <MemoryRouter>
        <MockedProvider mocks={mocks} addTypename={true}>
          <ApproveYouthProfilePage />
        </MockedProvider>
      </MemoryRouter>
    </ReduxProvider>
  );
};

test('data exists, form gets rendered', async () => {
  const wrapper = getWrapper(defaultMock);

  await updateWrapper(wrapper);

  const formData = wrapper.find('div[className="formData"]');
  expect(formData).toBeTruthy();
});

test('there is no user data / profile has already been approved', async () => {
  const wrapper = getWrapper([]);

  await updateWrapper(wrapper);

  const content = wrapper.find('main[className="wrapper"]');
  const title = content.find('h2');

  expect(title.text()).toEqual('Hakemus on jo hyväksytty ');
});
