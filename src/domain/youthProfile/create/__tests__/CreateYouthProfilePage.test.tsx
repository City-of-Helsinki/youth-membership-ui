import React from 'react';
import { MockedResponse } from '@apollo/react-testing';
import { User } from 'oidc-client';
import { loader } from 'graphql.macro';
import { act } from 'react-dom/test-utils';
import { MemoryRouter } from 'react-router';

import {
  mountWithApolloProvider,
  updateWrapper,
} from '../../../../common/test/testUtils';
import i18n from '../../../../common/test/testi18nInit';
import CreateYouthProfilePage from '../CreateYouthProfilePage';
import {
  AddressType,
  Language,
  PrefillRegistartion,
} from '../../../../graphql/generatedTypes';

/* eslint-disable @typescript-eslint/camelcase */
const mockTunnistamoUser: User = {
  profile: {
    iss: '',
    sub: '',
    aud: '',
    exp: 0,
    iat: 0,
  },
  access_token: '',
  expired: false,
  expires_at: 0,
  expires_in: 0,
  id_token: '',
  scope: '',
  scopes: [],
  state: undefined,
  token_type: '',
  toStorageString(): string {
    return '';
  },
};
/* eslint-enable @typescript-eslint/camelcase */

jest.mock('../../../auth/getAuthenticatedUser', () => () =>
  Promise.resolve(mockTunnistamoUser)
);

const PREFILL_REGISTRATION = loader(
  '../../graphql/PrefillRegistration.graphql'
);

type MyProfile = {
  language?: string;
};

const getMocks = (myProfile: MyProfile) => {
  return [
    {
      request: {
        query: PREFILL_REGISTRATION,
        variables: {},
      },
      result: {
        loading: false,
        data: {
          myProfile: {
            firstName: 'Teemu',
            lastName: 'Testaaja',
            language: Language.FINNISH,
            ...myProfile,
            primaryAddress: {
              address: 'Testikuja 55',
              postalCode: '00100',
              city: 'Helsinki',
              countryCode: 'FI',
              id: '123',
              primary: true,
              addressType: AddressType.OTHER,
              __typename: 'AddressNode',
            },
            addresses: {
              edges: [],
              __typename: 'AddressNodeConnection',
            },
            primaryEmail: {
              email: 'teemu.testaaja@test.fi',
              __typename: 'EmailNode',
            },
            primaryPhone: {
              id: '123',
              phone: '05501234567',
              __typename: 'PhoneNode',
            },
            __typename: 'ProfileNode',
          },
        } as PrefillRegistartion,
      },
    },
  ];
};

const getWrapper = (mocks?: MockedResponse[]) => {
  return mountWithApolloProvider(
    <MemoryRouter>
      <CreateYouthProfilePage />
    </MemoryRouter>,
    mocks
  );
};

Object.defineProperty(window.document, 'cookie', {
  writable: true,
  value: 'birthDate=2005-01-01',
});

test('renders form with pre-filled values', async () => {
  const wrapper = getWrapper(getMocks({}));
  await updateWrapper(wrapper);

  const firstName = wrapper.find('input[name="firstName"]');
  const lastName = wrapper.find('input[name="lastName"]');
  const address = wrapper.find('input[name="primaryAddress.address"]');
  const profileLanguage = wrapper.find('select[name="profileLanguage"]');

  expect(firstName.props().value).toEqual('Teemu');
  expect(lastName.props().value).toEqual('Testaaja');
  expect(address.props().value).toEqual('Testikuja 55');
  expect(profileLanguage.props().value).toEqual('FINNISH');
});

describe('language pre-fill', () => {
  test('language is finnish', async () => {
    const wrapper = getWrapper(getMocks({ language: '' }));
    await updateWrapper(wrapper);
    const profileLanguage = wrapper.find('select[name="profileLanguage"]');

    expect(profileLanguage.props().value).toEqual('FINNISH');
  });

  test('language is english', async () => {
    await act(async () => {
      await i18n.changeLanguage('en');
    });

    const wrapper = getWrapper(getMocks({ language: '' }));
    await updateWrapper(wrapper);
    const profileLanguage = wrapper.find('select[name="profileLanguage"]');

    expect(profileLanguage.props().value).toEqual('ENGLISH');
  });

  test('language is swedish', async () => {
    await act(async () => {
      await i18n.changeLanguage('sv');
    });

    const wrapper = getWrapper(getMocks({ language: '' }));
    await updateWrapper(wrapper);
    const profileLanguage = wrapper.find('select[name="profileLanguage"]');

    expect(profileLanguage.props().value).toEqual('SWEDISH');
  });
});
