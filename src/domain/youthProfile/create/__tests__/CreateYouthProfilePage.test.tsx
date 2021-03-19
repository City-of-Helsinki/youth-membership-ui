import React from 'react';
import { MockedResponse } from '@apollo/client/testing';
import { User } from 'oidc-client';
import { loader } from 'graphql.macro';
import { act } from 'react-dom/test-utils';

import {
  render,
  screen,
  waitFor,
} from '../../../../common/test/testing-library';
import i18n from '../../../../common/test/testi18nInit';
import CreateYouthProfilePage from '../CreateYouthProfilePage';
import {
  AddressType,
  Language,
  PrefillRegistartion,
} from '../../../../graphql/generatedTypes';

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
  return render(<CreateYouthProfilePage />, mocks);
};

Object.defineProperty(window.document, 'cookie', {
  writable: true,
  value: 'birthDate=2005-01-01',
});

test('renders form with pre-filled values', async () => {
  getWrapper(getMocks({}));

  await waitFor(() => screen.getByText('Täytä tietosi'));

  expect(screen.getAllByLabelText('Etunimi *')[0].value).toEqual('Teemu');
  expect(screen.getAllByLabelText('Sukunimi *')[0].value).toEqual('Testaaja');
  expect(screen.getByLabelText('Katuosoite *').value).toEqual('Testikuja 55');
  expect(screen.getByLabelText('Ensisijainen asiointikieli').value).toEqual(
    'FINNISH'
  );
});

describe('language pre-fill', () => {
  test('language is finnish', async () => {
    getWrapper(getMocks({ language: '' }));

    await waitFor(() => screen.getByText('Täytä tietosi'));

    expect(screen.getByLabelText('Ensisijainen asiointikieli').value).toEqual(
      'FINNISH'
    );
  });

  test('language is english', async () => {
    await act(async () => {
      await i18n.changeLanguage('en');
    });

    getWrapper(getMocks({ language: '' }));

    await waitFor(() => screen.getByText('Please fill in your information'));

    expect(screen.getByLabelText('Preferred service language').value).toEqual(
      'ENGLISH'
    );
  });

  test('language is swedish', async () => {
    await act(async () => {
      await i18n.changeLanguage('sv');
    });

    getWrapper(getMocks({ language: '' }));

    await waitFor(() => screen.getByText('Vänligen fyll i din information'));

    expect(screen.getByLabelText('Prefererat servicespråk').value).toEqual(
      'SWEDISH'
    );
  });
});
