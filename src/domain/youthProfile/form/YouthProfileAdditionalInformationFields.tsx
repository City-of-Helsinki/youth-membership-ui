import React from 'react';
import { useTranslation } from 'react-i18next';
import { RadioButton } from 'hds-react';
import { Field } from 'formik';

import Stack from '../../../common/components/stack/Stack';
import Text from '../../../common/components/text/Text';
import ageConstants from '../constants/ageConstants';
import TextInput from './FormikTextInput';
import styles from './youthProfileForm.module.css';

type Props = {
  userAge: number;
};

function YouthProfileForm({ userAge }: Props) {
  const { t } = useTranslation();

  return (
    <Stack space="m">
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
      <div
        className={
          userAge < ageConstants.PHOTO_PERMISSION_MIN
            ? styles.hidePhotoUsageApproved
            : styles.formInputColumn
        }
      >
        <Text variant="h3">{t('registration.photoUsageApproved')}</Text>
        <Text variant="info">{t('registration.photoUsageApprovedText')}</Text>
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
    </Stack>
  );
}

export default YouthProfileForm;
