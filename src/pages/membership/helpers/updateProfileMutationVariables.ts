import { FormValues } from '../components/youthProfileForm/YouthProfileForm';
import {
  AddressType,
  MembershipDetails,
  PhoneType,
} from '../../../graphql/generatedTypes';
import { getYouthProfile } from './createProfileMutationVariables';

const getEditMutationVariables = (
  formValues: FormValues,
  profile?: MembershipDetails
) => {
  return {
    input: {
      profile: {
        firstName: formValues.firstName,
        lastName: formValues.lastName,
        language: formValues.profileLanguage,
        updateAddresses: [
          profile?.youthProfile?.profile?.primaryAddress?.id
            ? {
                address: formValues.address,
                city: formValues.city,
                postalCode: formValues.postalCode,
                countryCode: formValues.countryCode,
                id: profile.youthProfile.profile.primaryAddress.id,
                addressType: AddressType.OTHER,
              }
            : null,
        ],
        updatePhones: [
          profile?.youthProfile?.profile?.primaryPhone?.id
            ? {
                phone: formValues.phone,
                phoneType: PhoneType.OTHER,
                id: profile.youthProfile.profile.primaryPhone.id,
              }
            : null,
        ],
        youthProfile: getYouthProfile(formValues),
      },
    },
  };
};

export { getEditMutationVariables };
