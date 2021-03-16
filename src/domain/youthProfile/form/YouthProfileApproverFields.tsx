import React from 'react';
import { useTranslation } from 'react-i18next';

import styles from './YouthProfileApproverFields.module.css';
import ArrayFieldTemplate from '../../../common/components/arrayFieldTemplate/ArrayFieldTemplate';
import Stack from '../../../common/components/stack/Stack';
import YouthProfileFormGrid from './YouthProfileFormGrid';
import FormGroupDescription from './FormGroupDescription';
import TextInput from './FormikTextInput';
import Select from './FormikSelect';

type Props = {
  isApproverFieldsRequired?: boolean;
  additionalContactPersonHelperText: string;
  viewer?: 'youth' | 'approver';
};

function YouthProfileApproverFields({
  isApproverFieldsRequired = true,
  additionalContactPersonHelperText,
  viewer = 'youth',
}: Props) {
  const { t } = useTranslation();

  const languages = [
    'FINNISH',
    'SWEDISH',
    'ENGLISH',
    'FRENCH',
    'RUSSIAN',
    'SOMALI',
    'ARABIC',
    'ESTONIAN',
  ];

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

  const getAutoComplete = (value: string): string | undefined => {
    const isViewedByApprover = viewer === 'approver';

    if (isViewedByApprover) {
      return value;
    }
  };

  return (
    <Stack space="xl">
      <YouthProfileFormGrid>
        <TextInput
          id="approverFirstName"
          name="approverFirstName"
          labelText={labelRequired('registration.firstName')}
          autoComplete={getAutoComplete('given-name')}
        />
        <TextInput
          id="approverLastName"
          name="approverLastName"
          labelText={labelRequired('registration.lastName')}
          autoComplete={getAutoComplete('family-name')}
        />
        <TextInput
          id="approverEmail"
          name="approverEmail"
          type="email"
          labelText={labelRequired('registration.email')}
          autoComplete={getAutoComplete('email')}
        />
        <TextInput
          id="approverPhone"
          name="approverPhone"
          type="tel"
          labelText={labelRequired('registration.phoneNumber')}
          autoComplete={getAutoComplete('tel')}
        />
        <Select
          className={styles.formInput}
          name="languageAtHome"
          label={labelRequired('registration.languageAtHome')}
          options={languages.map(language => ({
            label: t(`LANGUAGE_OPTIONS.${language}`),
            value: language,
          }))}
        />
      </YouthProfileFormGrid>
      <FormGroupDescription
        name="additionalContactPersons"
        description={additionalContactPersonHelperText}
        className={styles.additionalApproverDescription}
      />
      <ArrayFieldTemplate
        name="additionalContactPersons"
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
