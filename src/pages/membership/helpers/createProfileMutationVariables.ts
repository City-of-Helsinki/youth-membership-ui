import { format, differenceInYears } from 'date-fns';

import ageConstants from '../constants/ageConstants';
import {
  AddressType,
  EmailType,
  PhoneType,
  PrefillRegistartion,
  YouthProfileFields,
} from '../../../graphql/generatedTypes';
import { FormValues } from '../components/createYouthProfileForm/CreateYouthProfileForm';

const getYouthProfile = (formValues: FormValues) => {
  const age = differenceInYears(new Date(), new Date(formValues.birthDate));

  const variables: YouthProfileFields = {
    birthDate: format(new Date(formValues.birthDate), 'yyyy-MM-dd'),
    schoolName: formValues.schoolName,
    schoolClass: formValues.schoolClass,
    approverFirstName: formValues.approverFirstName,
    approverLastName: formValues.approverLastName,
    approverPhone: formValues.approverPhone,
    approverEmail: formValues.approverEmail,
    languageAtHome: formValues.languageAtHome,
  };

  return age > ageConstants.PHOTO_PERMISSION_MIN
    ? {
        ...variables,
        photoUsageApproved: formValues.photoUsageApproved === 'true',
      }
    : variables;
};

const getAddress = (formValues: FormValues, profile?: PrefillRegistartion) => {
  const addAddress = {
    addAddresses: [
      {
        address: formValues.address,
        postalCode: formValues.postalCode,
        city: formValues.city,
        addressType: AddressType.OTHER,
        primary: true,
      },
    ],
  };

  const updateAddress = {
    updateAddresses: [
      {
        address: formValues.address,
        postalCode: formValues.postalCode,
        city: formValues.city,
        addressType: AddressType.OTHER,
        primary: true,
        id: profile?.myProfile?.primaryAddress?.id,
      },
    ],
  };
  return profile?.myProfile?.primaryAddress ? updateAddress : addAddress;
};

const getPhone = (formValues: FormValues, profile?: PrefillRegistartion) => {
  const addPhone = {
    addPhones: [
      {
        phone: formValues.phone,
        phoneType: PhoneType.OTHER,
        primary: true,
      },
    ],
  };

  const updatePhone = {
    updatePhones: [
      {
        phone: formValues.phone,
        phoneType: PhoneType.OTHER,
        primary: true,
        id: profile?.myProfile?.primaryPhone?.id,
      },
    ],
  };

  return profile?.myProfile?.primaryPhone ? updatePhone : addPhone;
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
        ...getAddress(formValues, profile),
        ...getPhone(formValues, profile),
        ...getEmail(formValues, profile),
        youthProfile: getYouthProfile(formValues),
      },
    },
  };
};

export {
  getYouthProfile,
  getPhone,
  getAddress,
  getEmail,
  getMutationVariables,
};