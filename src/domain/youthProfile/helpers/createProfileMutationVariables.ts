import omit from 'lodash/omit';

import { PrefillRegistartion } from '../../../graphql/generatedTypes';
import { Values as FormValues } from '../form/YouthProfileForm';
import { getAddress, getEmail, getPhone } from './contactInformationUtils';

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
        // NOTE: Omit updateAddresses and removeAddresses since YM-515.
        // The fields could not be used in createProfileMutation
        // and shouldn't even be needed yet,
        // since the profile is just in creation stage
        ...omit(getAddress(formValues, 'prefill', profile), [
          'updateAddresses',
          'removeAddresses',
        ]),
        ...getPhone(formValues, profile),
        ...getEmail(formValues, profile),
      },
    },
  };
};

export { getPhone, getAddress, getEmail, getMutationVariables };
