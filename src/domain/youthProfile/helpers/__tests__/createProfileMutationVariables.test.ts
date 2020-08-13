import { Values as FormValues } from '../../form/YouthProfileForm';
import {
  AddressType,
  Language,
  PrefillRegistartion,
  YouthLanguage,
} from '../../../../graphql/generatedTypes';
import {
  getAddress,
  getEmail,
  getMutationVariables,
  getPhone,
} from '../createProfileMutationVariables';
import { getCreateYouthProfile } from '../youthProfileGetters';

const additionalContactPersons = [
  {
    firstName: 'Jorgi',
    lastName: 'Mehutz',
    phone: '000000000',
    email: 'edadsa@email.com',
  },
];
const formValues: FormValues = {
  firstName: 'Tina',
  lastName: 'Tester',
  email: 'tina@tester.fi',
  phone: '0501234567',
  photoUsageApproved: 'false',
  profileLanguage: Language.FINNISH,
  primaryAddress: {
    city: 'Helsinki',
    postalCode: '00100',
    address: 'Testaddress 123',
    countryCode: 'FI',
    id: '123',
    addressType: AddressType.OTHER,
    primary: true,
    __typename: 'AddressNode',
  },
  addresses: [
    {
      address: 'Testaddress 123',
      city: 'Helsinki',
      postalCode: '00100',
      countryCode: 'FI',
      id: '123',
      primary: true,
      addressType: AddressType.OTHER,
      __typename: 'AddressNode',
    },
    {
      primary: false,
      postalCode: '00200',
      id: '',
      countryCode: 'FI',
      city: 'Helsinki',
      address: 'Testikatu 66',
      addressType: AddressType.OTHER,
      __typename: 'AddressNode',
    },
    {
      primary: false,
      postalCode: '00200',
      id: '234',
      countryCode: 'FI',
      city: 'Helsinki',
      address: 'Testikatu 55',
      addressType: AddressType.OTHER,
      __typename: 'AddressNode',
    },
  ],
  birthDate: '2000-01-01',
  languageAtHome: YouthLanguage.FINNISH,
  approverPhone: '0501234567',
  approverEmail: 'gee@guardian.com',
  approverLastName: 'Guardian',
  approverFirstName: 'Gee',
  schoolClass: '1S',
  schoolName: 'Smooth School',
  additionalContactPersons,
};

const profileValues: PrefillRegistartion = {
  myProfile: {
    firstName: '',
    lastName: '',
    language: Language.FINNISH,
    primaryPhone: {
      phone: '0501234567',
      id: 'id',
      __typename: 'PhoneNode',
    },
    primaryAddress: {
      address: 'Testaddress 123',
      city: 'Helsinki',
      postalCode: '00100',
      countryCode: 'FI',
      id: '123',
      primary: true,
      addressType: AddressType.OTHER,
      __typename: 'AddressNode',
    },
    addresses: {
      edges: [
        {
          node: {
            primary: false,
            postalCode: '00200',
            id: '234',
            countryCode: 'FI',
            city: 'Helsinki',
            address: 'Testikatu 55',
            addressType: AddressType.OTHER,
            __typename: 'AddressNode',
          },
          __typename: 'AddressNodeEdge',
        },
      ],
      __typename: 'AddressNodeConnection',
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
    const youthVariables = getCreateYouthProfile(formValues);
    expect(youthVariables.photoUsageApproved).toEqual(false);
  });

  it('user is younger than ageConstants.PHOTO_PERMISSION_MIN', () => {
    const formVariables = { ...formValues, birthDate: '2008-01-01' };
    const youthVariables = getCreateYouthProfile(formVariables);
    expect(youthVariables.photoUsageApproved).toBeUndefined();
  });
});

describe('getAddress tests', () => {
  it('Add array is formed correctly', () => {
    const variables = getAddress(formValues, 'prefill', profileValues);

    expect(variables.addAddresses).toEqual([
      {
        address: 'Testikatu 66',
        postalCode: '00200',
        city: 'Helsinki',
        countryCode: 'FI',
        primary: false,
        addressType: 'OTHER',
      },
    ]);
  });

  it('Add array is empty', () => {
    const variables = getAddress(
      { ...formValues, addresses: [] },
      'prefill',
      profileValues
    );
    expect(variables.addAddresses).toEqual([]);
  });

  it('Update array is formed correctly', () => {
    const variables = getAddress(
      {
        ...formValues,
        addresses: [
          formValues.addresses[0],
          formValues.addresses[1],
          { ...formValues.addresses[2], address: 'Testgatan 55' },
        ],
      },
      'prefill',
      profileValues
    );
    expect(variables.updateAddresses).toEqual([
      {
        id: '234',
        address: 'Testgatan 55',
        postalCode: '00200',
        city: 'Helsinki',
        countryCode: 'FI',
        primary: false,
        addressType: 'OTHER',
      },
    ]);
  });

  it('Update array is empty', () => {
    const variables = getAddress(formValues, 'prefill', profileValues);
    //console.log(variables);
    expect(variables.updateAddresses).toEqual([]);
  });

  it('Remove array is empty', () => {
    const variables = getAddress(
      { ...formValues, addresses: [formValues.addresses[1]] },
      'prefill',
      profileValues
    );
    expect(variables.removeAddresses).toEqual(['234', '123']);
  });

  it('Remove array is empty', () => {
    const variables = getAddress(formValues, 'prefill', profileValues);
    expect(variables.removeAddresses).toEqual([]);
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
        language: Language.FINNISH,
        addEmails: [null],
        addAddresses: [
          {
            primary: false,
            postalCode: '00200',
            countryCode: 'FI',
            city: 'Helsinki',
            address: 'Testikatu 66',
            addressType: AddressType.OTHER,
          },
        ],
        updateAddresses: [],
        removeAddresses: [],
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
          addAdditionalContactPersons: additionalContactPersons,
          updateAdditionalContactPersons: [],
          removeAdditionalContactPersons: [],
        },
      },
    },
  });
});
