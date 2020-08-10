import {
  YouthProfileByApprovalToken,
  MembershipDetails,
  YouthLanguage,
  AddressType,
  Language,
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
const youthProfile = {
  profile: {
    addresses: {
      edges: mockAddresses,
      __typename: 'AddressNodeConnection' as 'AddressNodeConnection',
    },
    firstName: 'Georde',
    lastName: 'Tsaridiz',
    language: 'Greek' as Language,
    __typename: 'ProfileNode' as 'ProfileNode',
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
  },
  birthDate: '2006-02-02',
  schoolName: '',
  schoolClass: '',
  languageAtHome: 'English' as YouthLanguage,
  photoUsageApproved: false,
  approverFirstName: 'Joan',
  approverLastName: 'Kivinen',
  approverEmail: 'email@email.com',
  approverPhone: '+358000000',
  membershipNumber: '1',
  __typename: 'YouthProfileType' as 'YouthProfileType',
};
const mockMembershipDetails: MembershipDetails = {
  youthProfile,
};
const mockApprovalToken: YouthProfileByApprovalToken = {
  youthProfileByApprovalToken: youthProfile,
};

describe('getAddresses', () => {
  it('should extract addresses from membership details', () => {
    const addresses = getAddresses(mockMembershipDetails, 'en');

    expect(addresses).toEqual(['Pyyninki 4, 00000, Helsinki, Finland']);
  });

  it('should extract addresses from approval token', () => {
    const addresses = getAddresses(mockApprovalToken, 'en');

    expect(addresses).toEqual(['Pyyninki 4, 00000, Helsinki, Finland']);
  });
});
