import { FormValues } from '../../components/createYouthProfileForm/CreateYouthProfileForm';
import {
  PrefillRegistartion,
  YouthLanguage,
} from '../../../../graphql/generatedTypes';
import {
  getYouthProfile,
  getAddress,
  getPhone,
  getEmail,
  getMutationVariables,
} from '../createProfileMutationVariables';

const formValues: FormValues = {
  firstName: 'Tina',
  lastName: 'Tester',
  email: 'tina@tester.fi',
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
};

const profileValues: PrefillRegistartion = {
  myProfile: {
    firstName: '',
    lastName: '',
    primaryPhone: {
      phone: '0501234567',
      id: 'id',
      __typename: 'PhoneNode',
    },
    primaryAddress: {
      address: 'Testaddress 123',
      city: 'Helsinki',
      postalCode: '00100',
      id: 'id',
      __typename: 'AddressNode',
    },
    primaryEmail: {
      email: 'tina@tester.fi',
      __typename: 'EmailNode',
    },
    __typename: 'ProfileNode',
  },
};

describe('getYouthProfile tests', () => {
  it('user is over ageConstants.PHOTO_PERMISSION_MIN', () => {
    const youthVariables = getYouthProfile(formValues);
    expect(youthVariables.photoUsageApproved).toEqual(false);
  });

  it('user is younger than ageConstants.PHOTO_PERMISSION_MIN', () => {
    const formVariables = { ...formValues, birthDate: '2008-01-01' };
    const youthVariables = getYouthProfile(formVariables);
    expect(youthVariables.photoUsageApproved).toBeUndefined();
  });
});

describe('getAddress tests', () => {
  it('has data from pre-fill', () => {
    const variables = getAddress(formValues, profileValues);
    expect(variables).toHaveProperty('updateAddresses');
  });

  it('has only formValues', () => {
    const variables = getAddress(formValues);
    expect(variables).toHaveProperty('addAddresses');
  });
});

describe('getPhone tests', () => {
  it('has data from pre-fill', () => {
    const variables = getPhone(formValues, profileValues);
    expect(variables).toHaveProperty('updatePhones');
  });

  it('has only formValues', () => {
    const variables = getPhone(formValues);
    expect(variables).toHaveProperty('addPhones');
  });
});

describe('getEmail tests', () => {
  it('has data from pre-fill', () => {
    const variables = getEmail(formValues, profileValues);
    expect(variables?.addEmails).toEqual([null]);
  });
  it('has only formValues', () => {
    const variables = getEmail(formValues);
    expect(variables).toEqual({
      addEmails: [
        {
          email: 'tina@tester.fi',
          emailType: 'OTHER',
          primary: true,
        },
      ],
    });
  });
});

it('getMutationVariables returns correct object', () => {
  const variables = getMutationVariables(formValues, profileValues);
  expect(variables).toEqual({
    input: {
      profile: {
        firstName: 'Tina',
        lastName: 'Tester',
        addEmails: [null],
        updateAddresses: [
          {
            address: 'Testaddress 123',
            city: 'Helsinki',
            addressType: 'OTHER',
            postalCode: '00100',
            primary: true,
            id: 'id',
          },
        ],
        updatePhones: [
          {
            phone: '0501234567',
            primary: true,
            phoneType: 'OTHER',
            id: 'id',
          },
        ],
        youthProfile: {
          birthDate: '2000-01-01',
          languageAtHome: 'FINNISH',
          schoolClass: '1S',
          schoolName: 'Smooth School',
          approverPhone: '0501234567',
          approverEmail: 'gee@guardian.com',
          approverLastName: 'Guardian',
          approverFirstName: 'Gee',
          photoUsageApproved: false,
        },
      },
    },
  });
});
