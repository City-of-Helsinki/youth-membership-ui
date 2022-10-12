import {
  AddressType,
  EmailType,
  PhoneType,
  PrefillRegistartion,
  MembershipDetails,
} from '../../../graphql/generatedTypes';
import { Values as FormValues } from '../form/YouthProfileForm';

const getAddress = (
  formValues: FormValues,
  profileType: 'prefill' | 'membership',
  profile?: PrefillRegistartion | MembershipDetails
) => {
  const addAddresses = formValues.addresses
    .filter(addresss => !addresss.id)
    .map(address => ({
      address: address.address,
      postalCode: address.postalCode,
      city: address.city,
      countryCode: address.countryCode,
      primary: address.primary,
      addressType: address.addressType || AddressType.OTHER,
    }));
  return {
    addAddresses,
  };
};

const getPhone = (formValues: FormValues, profile?: PrefillRegistartion) => {
  if (profile?.myProfile?.primaryPhone?.id) {
    return {
      updatePhones: [
        {
          phone: formValues.phone,
          phoneType: PhoneType.OTHER,
          primary: true,
          id: profile?.myProfile?.primaryPhone?.id,
        },
      ],
    };
  }

  return {
    addPhones: [
      {
        phone: formValues.phone,
        phoneType: PhoneType.OTHER,
        primary: true,
      },
    ],
  };
};

const getEmail = (formValues: FormValues, profile?: PrefillRegistartion) => {
  return {
    addEmails: [
      !profile?.myProfile?.primaryEmail
        ? {
            email: formValues.email,
            primary: true,
            emailType: EmailType.OTHER,
          }
        : null,
    ],
  };
};

const getMutationVariables = (
  formValues: FormValues,
  profile?: PrefillRegistartion
) => {
  return {
    input: {
      profile: {
        firstName: formValues.firstName,
        lastName: formValues.lastName,
        language: formValues.profileLanguage,
        ...getAddress(formValues, 'prefill', profile),
        ...getPhone(formValues, profile),
        ...getEmail(formValues, profile),
      },
    },
  };
};

export { getPhone, getAddress, getEmail, getMutationVariables };
