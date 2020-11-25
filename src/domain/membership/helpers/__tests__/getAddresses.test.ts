import {
  AddressType,
  Language,
  MembershipDetails,
  MembershipDetails_myYouthProfile as MyYouthProfile,
  YouthLanguage,
  YouthProfileByApprovalToken,
} from '../../../../graphql/generatedTypes';
import getAddresses from '../getAddresses';

const mockAddresses = [
  {
    node: {
      address: 'Hyysalo 45',
      postalCode: '00000',
      city: 'Helsinki',
      countryCode: 'FI',
      primary: true,
      id: '1234',
      addressType: 'OTHER' as AddressType,
      __typename: 'AddressNode' as 'AddressNode',
    },
    __typename: 'AddressNodeEdge' as 'AddressNodeEdge',
  },
  {
    node: {
      address: 'Pyyninki 4',
      postalCode: '00000',
      city: 'Helsinki',
      countryCode: 'FI',
      primary: false,
      id: '1234',
      addressType: 'OTHER' as AddressType,
      __typename: 'AddressNode' as 'AddressNode',
    },
    __typename: 'AddressNodeEdge' as 'AddressNodeEdge',
  },
];

const profile = {
  firstName: 'Georde',
  lastName: 'Tsaridiz',
  language: Language.ENGLISH,
  id: '1234',
  addresses: {
    edges: mockAddresses,
    __typename: 'AddressNodeConnection',
  },
  primaryAddress: {
    address: 'Pyyninki 4',
    postalCode: '00000',
    city: 'Helsinki',
    countryCode: 'FI',
    primary: false,
    id: '1234',
    addressType: 'OTHER' as AddressType,
    __typename: 'AddressNode' as 'AddressNode',
  },
  primaryEmail: {
    id: '1234',
    email: 'georde123@email.com',
    __typename: 'EmailNode' as 'EmailNode',
  },
  primaryPhone: {
    id: '1234',
    phone: '+358000000',
    __typename: 'PhoneNode' as 'PhoneNode',
  },
  __typename: 'ProfileNode' as 'ProfileNode',
};

describe('getAddresses', () => {
  it('should extract addresses from profile', () => {
    const addresses = getAddresses(profile, 'en');

    expect(addresses).toEqual(['Pyyninki 4, 00000, Helsinki, Finland']);
  });
});
