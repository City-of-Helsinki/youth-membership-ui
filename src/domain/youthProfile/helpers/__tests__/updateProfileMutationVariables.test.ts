import { Values as FormValues } from '../../form/YouthProfileForm';
import {
  AddressType,
  Language,
  MembershipDetails,
  PhoneType,
  YouthLanguage,
} from '../../../../graphql/generatedTypes';
import { getEditMutationVariables } from '../updateProfileMutationVariables';

const formValues: FormValues = {
  firstName: 'Tina',
  lastName: 'Testaaja',
  email: 'tina@testaaja.fi',
  phone: '0501234567',
  primaryAddress: {
    city: 'Helsinki',
    postalCode: '00100',
    address: 'Testaddress 123',
    countryCode: 'FI',
    id: '123',
    primary: true,
    addressType: AddressType.OTHER,
    __typename: 'AddressNode',
  },
  addresses: [
    {
      city: 'Helsinki',
      postalCode: '00100',
      address: 'Testaddress 123',
      countryCode: 'FI',
      id: '123',
      primary: true,
      addressType: AddressType.OTHER,
      __typename: 'AddressNode',
    },
  ],
  photoUsageApproved: 'false',
  birthDate: '2000-01-01',
  languageAtHome: YouthLanguage.FINNISH,
  approverPhone: '0501234567',
  approverEmail: 'gee@guardian.com',
  approverLastName: 'Guardian',
  approverFirstName: 'Gee',
  schoolClass: '1S',
  schoolName: 'Smooth School',
  profileLanguage: Language.FINNISH,
  additionalContactPersons: [],
};

const profileData: MembershipDetails = {
  myYouthProfile: {
    profile: {
      firstName: 'Teemu',
      lastName: 'Testaaja',
      language: Language.FINNISH,
      id: '1234',
      primaryAddress: {
        city: 'Helsinki',
        postalCode: '00100',
        address: 'Testaddress 123',
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
        id: '123',
      },
      primaryPhone: {
        id: '123',
        __typename: 'PhoneNode',
        phone: '0501234567',
      },
      __typename: 'ProfileNode',
    },
    membershipNumber: '12345',
    birthDate: '2000-01-01',
    languageAtHome: YouthLanguage.FINNISH,
    approverPhone: '0501234567',
    approverEmail: 'gee@guardian.com',
    approverLastName: 'Guardian',
    approverFirstName: 'Gee',
    schoolClass: '1S',
    schoolName: 'Smooth School',
    photoUsageApproved: false,
    additionalContactPersons: {
      edges: [],
      __typename: 'AdditionalContactPersonNodeConnection',
    },
    __typename: 'YouthProfileNode',
  },
};

test('test object is correct and all fields are present', () => {
  const variables = getEditMutationVariables(formValues, profileData);

  const expectedResult = {
    input: {
      profile: {
        firstName: 'Tina',
        lastName: 'Testaaja',
        language: Language.FINNISH,
        addAddresses: [],
        updateAddresses: [],
        removeAddresses: [],
        updatePhones: [
          {
            phone: '0501234567',
            id: '123',
            phoneType: PhoneType.OTHER,
          },
        ],
        youthProfile: {
          photoUsageApproved: false,
          birthDate: '2000-01-01',
          languageAtHome: YouthLanguage.FINNISH,
          approverPhone: '0501234567',
          approverEmail: 'gee@guardian.com',
          approverLastName: 'Guardian',
          approverFirstName: 'Gee',
          schoolClass: '1S',
          schoolName: 'Smooth School',
          addAdditionalContactPersons: [],
          updateAdditionalContactPersons: [],
          removeAdditionalContactPersons: [],
        },
      },
    },
  };

  expect(variables).toEqual(expectedResult);
});
