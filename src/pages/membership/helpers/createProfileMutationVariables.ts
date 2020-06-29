import { differenceInYears, format } from 'date-fns';
import { isEqual } from 'lodash';

import ageConstants from '../constants/ageConstants';
import {
  AddressType,
  EmailType,
  PhoneType,
  PrefillRegistartion,
  YouthProfileFields,
  MembershipDetails,
} from '../../../graphql/generatedTypes';
import { Values as FormValues } from '../components/youthProfileForm/YouthProfileForm';
import getAddressesFromNode from './getAddressesFromNode';

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

const getPrimaryAddress = (
  profileType: 'prefill' | 'membership',
  profile?: PrefillRegistartion | MembershipDetails
) => {
  switch (profileType) {
    case 'membership':
      return (profile as MembershipDetails).youthProfile?.profile
        ?.primaryAddress;
    case 'prefill':
      return (profile as PrefillRegistartion).myProfile?.primaryAddress;
    default:
      return { id: '' };
  }
};

const getAddress = (
  formValues: FormValues,
  profileType: 'prefill' | 'membership',
  profile?: PrefillRegistartion | MembershipDetails
) => {
  const profileAddresses = [
    ...getAddressesFromNode(profileType, profile),
    getPrimaryAddress(profileType, profile),
  ];

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

  const updateAddresses = formValues.addresses
    .filter(address => {
      const profileAddress = profileAddresses.find(
        value => value?.id === address.id
      );

      return address.id && !isEqual(address, profileAddress);
    })
    .map(address => ({
      id: address.id,
      address: address.address,
      postalCode: address.postalCode,
      city: address.city,
      countryCode: address.countryCode,
      primary: address.primary,
      addressType: address.addressType || AddressType.OTHER,
    }));

  const formValueIDs = formValues.addresses.map(address => address.id);

  const removeAddresses = profileAddresses
    .filter(address => address?.id && !formValueIDs.includes(address.id))
    .map(address => address?.id || null);

  return {
    addAddresses,
    updateAddresses,
    removeAddresses,
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
