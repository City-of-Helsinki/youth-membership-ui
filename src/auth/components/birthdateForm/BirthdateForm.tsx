import React from 'react';
import { Field, Form, Formik } from 'formik';
import { TextInput, Button } from 'hds-react';
import * as yup from 'yup';
import { useTranslation } from 'react-i18next';
import { differenceInYears } from 'date-fns';

import ageConstants from '../../../pages/membership/constants/ageConstants';
import styles from './BirthdateForm.module.css';

const schema = yup.object().shape({
  birthDay: yup
    .number()
    .moreThan(0)
    .lessThan(32)
    .required(),
  birthMonth: yup
    .number()
    .moreThan(0)
    .lessThan(13)
    .required(),
  birthYear: yup
    .number()
    .moreThan(999)
    .required(),
  birthDate: yup
    .string()
    .when(
      ['birthYear', 'birthMonth', 'birthDay'],
      (
        birthYear: number,
        birthMonth: number,
        birthDay: number,
        schema: yup.StringSchema
      ) => {
        const age = differenceInYears(
          new Date(),
          new Date(birthYear, birthMonth - 1, birthDay)
        );
        return age < ageConstants.REGISTRATION_AGE_MIN ||
          age > ageConstants.REGISTRATION_AGE_MAX
          ? schema.required()
          : schema;
      }
    ),
});

type Props = {
  redirectBasedOnAge: (birthDate: string) => void;
};

function BirthdateForm(props: Props) {
  const { t } = useTranslation();
  return (
    <Formik
      initialValues={{
        birthDay: '',
        birthMonth: '',
        birthYear: '',
        birthDate: '',
      }}
      onSubmit={values =>
        props.redirectBasedOnAge(
          `${values.birthYear}-${values.birthMonth}-${values.birthDay}`
        )
      }
      validationSchema={schema}
    >
      {props => (
        <Form className={styles.birthdayForm}>
          <p className={styles.birthdayHelper}>
            {t('registration.birthdayHelper')}
          </p>
          <div className={styles.formRow}>
            <Field
              className={styles.birthdayInput}
              as={TextInput}
              id="birthDay"
              name="birthDay"
              type="number"
              invalid={props.submitCount && props.errors.birthDay}
            />
            <span className={styles.birthdayMiddleDot}>&#8901;</span>
            <Field
              className={styles.birthdayInput}
              as={TextInput}
              id="birthMonth"
              name="birthMonth"
              type="number"
              invalid={props.submitCount && props.errors.birthMonth}
            />
            <span className={styles.birthdayMiddleDot}>&#8901;</span>
            <Field
              className={styles.birthdayInput}
              as={TextInput}
              id="birthYear"
              name="birthYear"
              type="number"
              invalid={props.submitCount && props.errors.birthYear}
            />
          </div>
          {(props.errors.birthDay ||
            props.errors.birthMonth ||
            props.errors.birthYear) &&
            props.submitCount > 0 && (
              <p className={styles.birthdayErrorMessage}>
                {t('registration.birthdayInvalid')}
              </p>
            )}

          {props.errors.birthDate &&
            !props.errors.birthYear &&
            props.submitCount > 0 && (
              <p className={styles.birthdayErrorMessage}>
                {t('registration.ageRestriction')}
              </p>
            )}

          <div className={styles.buttonRow}>
            <Button type="submit">{t('login.buttonText')}</Button>
          </div>
        </Form>
      )}
    </Formik>
  );
}

export default BirthdateForm;
