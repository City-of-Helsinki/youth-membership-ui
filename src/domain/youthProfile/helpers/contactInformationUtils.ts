import { isEqual } from 'lodash';

import {
  PrefillRegistartion,
  MembershipDetails,
  AddressType,
  EmailType,
  PhoneType,
} from '../../../graphql/generatedTypes';
import getAddressesFromNode from '../../membership/helpers/getAddressesFromNode';
import { Values as FormValues } from '../form/YouthProfileForm';

export const getPrimaryAddress = (
  profileType: 'prefill' | 'membership',
  profile?: PrefillRegistartion | MembershipDetails
) => {
  switch (profileType) {
    case 'membership':
      return (profile as MembershipDetails).myYouthProfile?.profile
        ?.primaryAddress;
    case 'prefill':
      return (profile as PrefillRegistartion).myProfile?.primaryAddress;
    default:
      return { id: '' };
  }
};

export const getAddress = (
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

export const getPhone = (
  formValues: FormValues,
  profile?: PrefillRegistartion
) => {
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

export const getEmail = (
  formValues: FormValues,
  profile?: PrefillRegistartion
) => {
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
