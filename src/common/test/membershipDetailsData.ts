import {
  AddressType,
  Language,
  MembershipDetails,
  YouthLanguage,
} from '../../graphql/generatedTypes';

export const membershipDetailsData: MembershipDetails = {
  youthProfile: {
    profile: {
      firstName: 'Teemu',
      lastName: 'Testaaja',
      language: Language.FINNISH,
      primaryPhone: {
        id: '123',
        phone: '0501234567',
        __typename: 'PhoneNode',
      },
      primaryEmail: {
        id: '123',
        email: 'teemu@testaaja.com',
        __typename: 'EmailNode',
      },
      primaryAddress: {
        id: '123',
        address: 'Testikatu 55',
        postalCode: '12345',
        city: 'Helsinki',
        primary: true,
        countryCode: 'FI',
        addressType: AddressType.OTHER,
        __typename: 'AddressNode',
      },
      addresses: {
        edges: [
          {
            node: {
              address: 'Testikatu 66',
              addressType: AddressType.OTHER,
              city: 'Helsinki',
              countryCode: 'FI',
              id: '234',
              postalCode: '00100',
              primary: false,
              __typename: 'AddressNode',
            },
            __typename: 'AddressNodeEdge',
          },
        ],
        __typename: 'AddressNodeConnection',
      },
      __typename: 'ProfileNode',
    },
    membershipNumber: '00123',
    birthDate: '2000-1-1',
    languageAtHome: YouthLanguage.FINNISH,
    photoUsageApproved: false,
    schoolName: 'School',
    schoolClass: 'Class',
    approverFirstName: 'Ville',
    approverLastName: 'Vanhempi',
    approverEmail: 'ville@vanhempi.com',
    approverPhone: '0501234567',
    additionalContactPersons: {
      edges: [
        {
          node: {
            id: '123',
            firstName: 'Jopre',
            lastName: 'Jaramand',
            phone: '000000000',
            email: 'jopre@email.com',
            __typename: 'AdditionalContactPersonNode',
          },
          __typename: 'AdditionalContactPersonNodeEdge',
        },
      ],
      __typename: 'AdditionalContactPersonNodeConnection',
    },
    __typename: 'YouthProfileType',
  },
};
