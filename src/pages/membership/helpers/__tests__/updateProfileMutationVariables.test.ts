import { FormValues } from '../../components/youthProfileForm/YouthProfileForm';
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
  city: 'Helsinki',
  postalCode: '00100',
  address: 'Testaddress 123',
  photoUsageApproved: 'false',
  birthDate: '2000-01-01',
  languageAtHome: YouthLanguage.FINNISH,
  approverPhone: '0501234567',
  approverEmail: 'gee@guardian.com',
  approverLastName: 'Guardian',
  approverFirstName: 'Gee',
  schoolClass: '1S',
  schoolName: 'Smooth School',
  countryCode: 'FI',
  profileLanguage: Language.FINNISH,
};

const profileData: MembershipDetails = {
  youthProfile: {
    profile: {
      firstName: 'Teemu',
      lastName: 'Testaaja',
      language: Language.FINNISH,
      primaryAddress: {
        __typename: 'AddressNode',
        address: 'Testikatu 123',
        city: 'Helsinki',
        countryCode: 'FI',
        id: '123',
        postalCode: '00100',
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
    __typename: 'YouthProfileType',
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
        updateAddresses: [
          {
            city: 'Helsinki',
            postalCode: '00100',
            address: 'Testaddress 123',
            id: '123',
            countryCode: 'FI',
            addressType: AddressType.OTHER,
          },
        ],
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
        },
      },
    },
  };

  expect(variables).toEqual(expectedResult);
});
