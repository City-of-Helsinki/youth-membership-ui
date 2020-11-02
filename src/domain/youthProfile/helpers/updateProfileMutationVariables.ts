import { MembershipDetails, PhoneType } from '../../../graphql/generatedTypes';
import { Values as FormValues } from '../form/YouthProfileForm';
import { getAddress } from './createProfileMutationVariables';
import { getEditYouthProfile } from './youthProfileGetters';

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
          profile?.myYouthProfile?.profile?.primaryPhone?.id
            ? {
                phone: formValues.phone,
                phoneType: PhoneType.OTHER,
                id: profile?.myYouthProfile.profile.primaryPhone.id,
              }
            : null,
        ],
        youthProfile: getEditYouthProfile(formValues, profile),
      },
    },
  };
};

export { getEditMutationVariables };
