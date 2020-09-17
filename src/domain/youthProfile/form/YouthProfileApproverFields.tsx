import React from 'react';
import { useTranslation } from 'react-i18next';

import ArrayFieldTemplate from '../../../common/components/arrayFieldTemplate/ArrayFieldTemplate';
import Stack from '../../../common/components/stack/Stack';
import YouthProfileFormGrid from './YouthProfileFormGrid';
import TextInput from './FormikTextInput';

type Props = {
  isApproverFieldsRequired?: boolean;
  additionalGuardianHelperText: string;
};

function YouthProfileApproverFields({
  isApproverFieldsRequired = true,
  additionalGuardianHelperText,
}: Props) {
  const { t } = useTranslation();

  // For now when using .when() in validation we can't use
  // schema.describe().fields[name].tests to determine if field is required or not.
  // Validation rules returned from .when() won't be added there.
  // For this reason determining asterisk usage must
  // be done with this function
  const labelRequired = (translationPath: string) => {
    if (isApproverFieldsRequired) {
      return t(translationPath) + ' *';
    }

    return t(translationPath);
  };

  return (
    <Stack space="xl">
      <YouthProfileFormGrid>
        <TextInput
          id="approverFirstName"
          name="approverFirstName"
          labelText={labelRequired('registration.firstName')}
        />
        <TextInput
          id="approverLastName"
          name="approverLastName"
          labelText={labelRequired('registration.lastName')}
        />
        <TextInput
          id="approverEmail"
          name="approverEmail"
          type="email"
          labelText={labelRequired('registration.email')}
        />
        <TextInput
          id="approverPhone"
          name="approverPhone"
          type="tel"
          labelText={labelRequired('registration.phoneNumber')}
        />
      </YouthProfileFormGrid>
      <ArrayFieldTemplate
        name="additionalContactPersons"
        additionalGuardianHelperText={additionalGuardianHelperText}
        renderField={(value, index, arrayPath) => (
          <YouthProfileFormGrid>
            <TextInput
              id={`${arrayPath}.firstName`}
              name={`${arrayPath}.firstName`}
              labelText={t('registration.firstName') + ' *'}
            />
            <TextInput
              id={`${arrayPath}.lastName`}
              name={`${arrayPath}.lastName`}
              labelText={t('registration.lastName') + ' *'}
            />
            <TextInput
              id={`${arrayPath}.email`}
              name={`${arrayPath}.email`}
              type="email"
              labelText={t('registration.email') + ' *'}
            />
            <TextInput
              id={`${arrayPath}.phone`}
              name={`${arrayPath}.phone`}
              type="tel"
              labelText={t('registration.phoneNumber') + ' *'}
            />
          </YouthProfileFormGrid>
        )}
        addItemLabel={t('registration.addGuardian')}
        onPushItem={push =>
          push({
            email: '',
            firstName: '',
            lastName: '',
            phone: '',
          })
        }
      />
    </Stack>
  );
}

export default YouthProfileApproverFields;
