import { Values as FormValues } from '../components/youthProfileForm/YouthProfileForm';
import { MembershipDetails, PhoneType } from '../../../graphql/generatedTypes';
import { getYouthProfile, getAddress } from './createProfileMutationVariables';

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
        ...getAddress(formValues, 'membership', profile),
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
