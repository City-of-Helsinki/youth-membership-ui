import React from 'react';
import { Form, Formik, FormikProps } from 'formik';
import { Button } from 'hds-react';
import * as yup from 'yup';
import { useTranslation } from 'react-i18next';
import { format, differenceInYears } from 'date-fns';

import ageConstants from '../../../pages/membership/constants/ageConstants';
import DateInput from '../../../common/dateInput/DateInput';
import styles from './BirthdateForm.module.css';

const INVALID_BIRTHDAY_ERROR = 'registration.birthdayInvalid';
const AGE_RESTRICTION_ERROR = 'registration.ageRestriction';

const schema = yup.object().shape({
  birthDate: yup
    .date()
    .required(INVALID_BIRTHDAY_ERROR)
    .test('age-is-appropriate', AGE_RESTRICTION_ERROR, value => {
      const age = differenceInYears(new Date(), new Date(value));
      const isNotOverMaxAge = age <= ageConstants.REGISTRATION_AGE_MAX;
      const isNotUnderMinAge = age >= ageConstants.REGISTRATION_AGE_MIN;

      return isNotOverMaxAge && isNotUnderMinAge;
    }),
});

type Props = {
  redirectBasedOnAge: (birthDate: string) => void;
};

function BirthdateForm(props: Props) {
  const { t } = useTranslation();

  const getError = (
    props: FormikProps<{ birthDate: string }>,
    fieldName: string
  ) => {
    const { submitCount, errors } = props;
    const isSubmitted = submitCount > 0;
    // eslint-disable-next-line @typescript-eslint/ban-ts-ignore
    // @ts-ignore
    const isError = Boolean(errors[fieldName]);

    if (isSubmitted && isError) {
      // eslint-disable-next-line @typescript-eslint/ban-ts-ignore
      // @ts-ignore
      return t(errors[fieldName]);
    }
  };

  return (
    <Formik
      initialValues={{
        birthDate: '',
      }}
      onSubmit={values => {
        const birthDate = format(new Date(values.birthDate), 'yyyy-MM-dd');

        props.redirectBasedOnAge(birthDate);
      }}
      validationSchema={schema}
    >
      {props => (
        <Form className={styles.birthdayForm}>
          <DateInput
            value={
              props.values.birthDate ? new Date(props.values.birthDate) : null
            }
            onChange={date => {
              props.setFieldValue('birthDate', date.toJSON());
            }}
            error={getError(props, 'birthDate')}
            label={t('registration.birthdayHelper')}
            dateInputLabel={'date'}
            monthInputLabel="month"
            yearInputLabel="year"
            // Sets name in a way which allows auto-fill to set these
            // values in case they are available. This makes the form
            // more accessible.
            dateInputName="bday-day"
            monthInputName="bday-month"
            yearInputName="bday-year"
          />
          <div className={styles.buttonRow}>
            <Button type="submit" className={styles.button}>
              {t('login.buttonText')}
            </Button>
          </div>
        </Form>
      )}
    </Formik>
  );
}

export default BirthdateForm;
