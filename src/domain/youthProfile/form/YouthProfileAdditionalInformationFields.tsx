import React from 'react';
import { useTranslation } from 'react-i18next';
import { RadioButton } from 'hds-react';
import { Field } from 'formik';

import ageConstants from '../constants/ageConstants';
import TextInput from './FormikTextInput';
import styles from './youthProfileForm.module.css';

type Props = {
  userAge: number;
};

function YouthProfileForm({ userAge }: Props) {
  const { t } = useTranslation();
  const languages = ['FINNISH', 'SWEDISH', 'ENGLISH'];

  return (
    <>
      <div className={styles.formRow}>
        <TextInput
          className={styles.formInput}
          id="schoolName"
          name="schoolName"
          labelText={t('registration.schoolName')}
        />
        <TextInput
          className={styles.formInput}
          id="schoolClass"
          name="schoolClass"
          labelText={t('registration.schoolClass')}
        />
      </div>
      <p className={styles.radioLabel}>{t('registration.languageAtHome')}</p>
      <ul className={styles.list}>
        {languages.map(language => (
          <li className={styles.languageRadioBtnRow} key={language}>
            <Field
              as={RadioButton}
              name="languageAtHome"
              id={language}
              type="radio"
              value={language}
              labelText={t(`LANGUAGE_OPTIONS.${language}`)}
            />
          </li>
        ))}
      </ul>
      <div
        className={
          userAge < ageConstants.PHOTO_PERMISSION_MIN
            ? styles.hidePhotoUsageApproved
            : styles.formInputColumn
        }
      >
        <p className={styles.radioLabel}>
          {t('registration.photoUsageApproved')}
        </p>
        <p>{t('registration.photoUsageApprovedText')}</p>
        <div className={styles.resRow}>
          <ul className={styles.list}>
            <li className={styles.radioButtonRow}>
              <Field
                as={RadioButton}
                id="photoUsageApprovedYes"
                name="photoUsageApproved"
                type="radio"
                value={'true'}
                labelText={t('registration.photoUsageApprovedYes')}
              />
            </li>
            <li className={styles.radioButtonRow}>
              <Field
                as={RadioButton}
                id="photoUsageApprovedNo"
                name="photoUsageApproved"
                type="radio"
                value={'false'}
                labelText={t('registration.photoUsageApprovedNo')}
              />
            </li>
          </ul>
        </div>
      </div>
    </>
  );
}

export default YouthProfileForm;
