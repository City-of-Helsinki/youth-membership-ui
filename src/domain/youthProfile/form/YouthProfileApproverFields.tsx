import React from 'react';
import { Button, IconPlusCircle } from 'hds-react';
import { useTranslation } from 'react-i18next';
import { FieldArray, FieldArrayRenderProps, FormikProps } from 'formik';

import { FormValues } from './YouthProfileForm';
import TextInput from './FormikTextInput';
import styles from './youthProfileForm.module.css';

interface Props {
  approverLabelText: (name: string) => string;
  formikProps: FormikProps<FormValues>;
}

function YouthProfileApproverFields({ approverLabelText, formikProps }: Props) {
  const { t } = useTranslation();

  return (
    <>
      <div className={styles.formRow}>
        <TextInput
          className={styles.formInput}
          id="approverFirstName"
          name="approverFirstName"
          labelText={approverLabelText('firstName')}
        />
        <TextInput
          className={styles.formInput}
          id="approverLastName"
          name="approverLastName"
          labelText={approverLabelText('lastName')}
        />
      </div>
      <div className={styles.formRow}>
        <TextInput
          className={styles.formInput}
          id="approverEmail"
          name="approverEmail"
          type="email"
          labelText={approverLabelText('email')}
        />
        <TextInput
          className={styles.formInput}
          id="approverPhone"
          name="approverPhone"
          type="tel"
          labelText={approverLabelText('phoneNumber')}
        />
      </div>
      <FieldArray
        name="additionalContactPersons"
        render={(arrayHelpers: FieldArrayRenderProps) => (
          <>
            {formikProps.values.additionalContactPersons.map(
              (_: unknown, index: number) => (
                <div key={index} className={styles.additionalContactGroup}>
                  <div className={styles.formRow}>
                    <TextInput
                      className={styles.formInput}
                      id={`additionalContactPersons.${index}.firstName`}
                      name={`additionalContactPersons.${index}.firstName`}
                      labelText={approverLabelText('firstName')}
                    />
                    <TextInput
                      className={styles.formInput}
                      id={`additionalContactPersons.${index}.lastName`}
                      name={`additionalContactPersons.${index}.lastName`}
                      labelText={approverLabelText('lastName')}
                    />
                  </div>
                  <div className={styles.formRow}>
                    <TextInput
                      className={styles.formInput}
                      id={`additionalContactPersons.${index}.email`}
                      name={`additionalContactPersons.${index}.email`}
                      type="email"
                      labelText={approverLabelText('email')}
                    />
                    <TextInput
                      className={styles.formInput}
                      id={`additionalContactPersons.${index}.phone`}
                      name={`additionalContactPersons.${index}.phone`}
                      type="tel"
                      labelText={approverLabelText('phoneNumber')}
                    />
                  </div>
                  <button
                    type="button"
                    className={styles.additionalActionButton}
                    onClick={() => arrayHelpers.remove(index)}
                  >
                    {t('registration.remove')}
                  </button>
                </div>
              )
            )}

            <Button
              type="button"
              iconLeft={<IconPlusCircle />}
              variant="supplementary"
              className={styles.alignButton}
              onClick={() => {
                arrayHelpers.push({
                  email: '',
                  firstName: '',
                  lastName: '',
                  phone: '',
                });
              }}
            >
              {t('registration.addGuardian')}
            </Button>
          </>
        )}
      />
    </>
  );
}

export default YouthProfileApproverFields;
