import React, { useState } from 'react';
import { Form, Formik, FormikProps } from 'formik';
import { Button } from 'hds-react';
import * as yup from 'yup';
import { useTranslation } from 'react-i18next';
import { format, differenceInYears } from 'date-fns';

import ageConstants from '../../../youthProfile/constants/ageConstants';
import DateInput from '../../../../common/components/dateInput/DateInput';
import styles from './BirthdateForm.module.css';

const INVALID_DATE_ERROR = 'registration.dateInvalid';
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
  // Most of the validation is done with a yup schema, but the existence
  // of the inputted date is handled by the DateInput itself. As long as
  // the date is invalid, the DateInput won't communicate it forward.

  // This means that if the user inputs and invalid date (31.02.2020),
  // the DateInput component will communicate that there is an invalid
  // date error, while yup will communicate that there is a date does
  // not exist error.

  // Yup's error is checked later so it will override the error
  // DateInput sets. Better UX would be to show the error about the
  // invalid date. This is why we have a separate error state for for
  // invalid date error. By using it, we are able to have more control
  // over what error is shown when. I consider this sort of a hack
  // because it's not very encapsulated. But for this case where we only
  // have a single DateInput, it should be fine.
  const [isDateInvalidError, setIsDateInvalid] = useState(false);
  const { t } = useTranslation();

  const getDateError = (
    props: FormikProps<{ birthDate: string }>,
    fieldName = 'birthDate'
  ) => {
    const { errors, touched } = props;
    // eslint-disable-next-line @typescript-eslint/ban-ts-ignore
    // @ts-ignore
    const isTouched = touched[fieldName];
    // eslint-disable-next-line @typescript-eslint/ban-ts-ignore
    // @ts-ignore
    const isYupError = Boolean(errors[fieldName]);

    if (isTouched && isDateInvalidError) {
      return t(INVALID_DATE_ERROR);
    }

    if (isTouched && isYupError) {
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
              // If the date is passed on it should be valid so we can
              // clear the error.
              setIsDateInvalid(false);
            }}
            onError={error => {
              if (error.name === 'dateDoesNotExist') {
                setIsDateInvalid(true);
              }
            }}
            onBlur={() => {
              props.setFieldTouched('birthDate', true);
            }}
            error={getDateError(props)}
            label={t('registration.birthdayHelper')}
            dateInputLabel={t('registration.date')}
            monthInputLabel={t('registration.month')}
            yearInputLabel={t('registration.year')}
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
