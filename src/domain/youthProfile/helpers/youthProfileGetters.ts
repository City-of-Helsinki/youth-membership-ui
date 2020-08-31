import { differenceInYears, format } from 'date-fns';

import {
  PrefillRegistartion,
  YouthProfileFields,
  MembershipDetails,
  CreateAdditionalContactPersonInput,
  UpdateAdditionalContactPersonInput,
} from '../../../graphql/generatedTypes';
import { Values as FormValues } from '../form/YouthProfileForm';
import ageConstants from '../constants/ageConstants';
import prepareArrayFieldChanges from './prepareArrayFieldChanges';
import getAdditionalContactPersons from './getAdditionalContactPersons';

function handleAge(
  variables: YouthProfileFields,
  formValues: FormValues
): YouthProfileFields {
  const age = differenceInYears(new Date(), new Date(formValues.birthDate));
  const isOldEnough = age > ageConstants.PHOTO_PERMISSION_MIN;
  const photoUsageApproved = formValues.photoUsageApproved === 'true';

  return isOldEnough
    ? {
        ...variables,
        photoUsageApproved,
      }
    : variables;
}

function getCommonProfileFields(
  formValues: FormValues
): Partial<YouthProfileFields> {
  return {
    birthDate: format(new Date(formValues.birthDate), 'yyyy-MM-dd'),
    schoolName: formValues.schoolName,
    schoolClass: formValues.schoolClass,
    approverFirstName: formValues.approverFirstName,
    approverLastName: formValues.approverLastName,
    approverPhone: formValues.approverPhone,
    approverEmail: formValues.approverEmail,
    languageAtHome: formValues.languageAtHome,
  };
}

function getContactPersons(
  profile?: PrefillRegistartion | MembershipDetails
): UpdateAdditionalContactPersonInput[] {
  if (!profile || 'myProfile' in profile) {
    return [];
  }

  return getAdditionalContactPersons(profile.youthProfile);
}

export function getCreateYouthProfile(formValues: FormValues) {
  const addAdditionalContactPersons = formValues.additionalContactPersons as CreateAdditionalContactPersonInput[];

  return handleAge(
    {
      ...getCommonProfileFields(formValues),
      addAdditionalContactPersons,
    },
    formValues
  );
}

export function getEditYouthProfile(
  formValues: FormValues,
  profile?: PrefillRegistartion | MembershipDetails
) {
  const previousAdditionalContactPersons = getContactPersons(profile);
  const nextAdditionalContactPersons = formValues.additionalContactPersons;
  const { add, update, remove } = prepareArrayFieldChanges<
    CreateAdditionalContactPersonInput,
    UpdateAdditionalContactPersonInput
  >(previousAdditionalContactPersons, nextAdditionalContactPersons);

  return handleAge(
    {
      ...getCommonProfileFields(formValues),
      addAdditionalContactPersons: add,
      updateAdditionalContactPersons: update,
      removeAdditionalContactPersons: remove,
    },
    formValues
  );
}
