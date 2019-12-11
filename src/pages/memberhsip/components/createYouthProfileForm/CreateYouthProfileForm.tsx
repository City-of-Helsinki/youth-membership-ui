import React from 'react';
import { useTranslation } from 'react-i18next';
import { TextInput } from 'hds-react';
import { Formik, Form, Field } from 'formik';
import { differenceInYears, isValid, parse } from 'date-fns';
import * as Yup from 'yup';

import styles from './CreateYouthProfileForm.module.css';

const schema = Yup.object().shape({
  firstName: Yup.string()
    .min(2, 'Too Short!')
    .max(255, 'Too Long!')
    .required('Required'),
  lastName: Yup.string()
    .min(2, 'Too Short!')
    .max(255, 'Too Long!')
    .required('Required'),
  phone: Yup.string()
    .min(6, 'validation.phoneMin')
    .required('Required'),
  street: Yup.string()
    .min(2, 'Too Short!')
    .max(255, 'Too Long!')
    .required('Required'),
  postcode: Yup.string()
    .min(5, 'Too Short!')
    .max(5, 'Too Long!')
    .required('Required'),
  city: Yup.string()
    .min(2, 'Too Short!')
    .max(255, 'Too Long!')
    .required('Required'),
  birthDay: Yup.number().required('Required!'),
  birthMonth: Yup.number().required('Required!'),
  birthYear: Yup.number().required('Required'),
  guardianFirstName: Yup.string()
    .min(2, 'Too Short!')
    .max(255, 'Too Long!')
    .required('Required'),
  guardianLastName: Yup.string()
    .min(2, 'Too Short!')
    .max(255, 'Too Long!')
    .required('Required'),
  guardianPhone: Yup.string()
    .min(6, 'validation.phoneMin')
    .required('Required'),
  guardianEmail: Yup.string().required('Required'),
  terms: Yup.boolean().oneOf([true], 'validation.required'),
});

export type FormValues = {
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
};

type Props = {
  profile: FormValues;
  onValues: (values: FormValues) => void;
  isSubmitting: boolean;
};

function CreateYouthProfileForm(props: Props) {
  const { t } = useTranslation();
  const languages = ['Suomi', 'Svenska', 'English', 'Other'];

  const isBirhthdayTyped = (year: string, month: string, day: string) => {
    if (year === '' || month === '' || day === '') {
      return false;
    }
    return true;
  };

  const validateDate = (year: string, month: string, day: string) => {
    if (isBirhthdayTyped(year, month, day)) {
      return isValid(
        parse(day + '/' + month + '/' + year, 'dd/MM/yyyy', new Date())
      );
    }
    return true;
  };

  const getYearDiff = (year: number, month: number, day: number) => {
    if (year >= 1900 && month && day) {
      return differenceInYears(new Date(), new Date(year, month, day));
    } else return 0;
  };

  const validateAge = (year: string, month: string, day: string) => {
    if (isBirhthdayTyped(year, month, day) && Number(year) > 999) {
      const age = getYearDiff(Number(year), Number(month), Number(day));
      if (age < 8 || age > 29) {
        return false;
      }
    }
    return true;
  };

  const isButtonEnabled = (year: string, month: string, day: string) => {
    if (isBirhthdayTyped(year, month, day)) {
      if (validateDate(year, month, day) && Number(year) > 1900) {
        return validateAge(year, month, day);
      }
    }
    return false;
  };

  return (
    <Formik
      initialValues={{
        ...props.profile,
        street: '',
        postcode: '',
        city: '',
        birthDay: '',
        birthMonth: '',
        birthYear: '',
        phone: '',
        school: '',
        class: '',
        language: '',
        otherLanguages: '',
        photoPermit: '',
        guardianFirstName: '',
        guardianLastName: '',
        guardianEmail: '',
        guardianPhone: '',
        terms: false,
      }}
      initialErrors={{
        terms: 'validation.required',
      }}
      onSubmit={values => {
        props.onValues({
          firstName: values.firstName,
          lastName: values.lastName,
          email: props.profile.email,
          phone: values.phone,
        });
      }}
      validationSchema={schema}
    >
      {props => (
        <div>
          <h1>{t('registration.title')}</h1>
          <p>{t('registration.membershipInfoText')}</p>
          <h2>{t('registration.basicInfo')}</h2>
          <Form>
            <div className={styles.formRow}>
              <Field
                className={styles.formInput}
                as={TextInput}
                id="firstName"
                name="firstName"
                invalid={props.submitCount && props.errors.firstName}
                invalidText={
                  props.submitCount &&
                  props.errors.firstName &&
                  t(props.errors.firstName)
                }
                labelText={t('registration.firstName')}
              />
              <Field
                className={styles.formInput}
                as={TextInput}
                id="lastName"
                name="lastName"
                invalid={props.submitCount && props.errors.lastName}
                invalidText={
                  props.submitCount &&
                  props.errors.lastName &&
                  t(props.errors.lastName)
                }
                labelText={t('registration.lastName')}
              />
            </div>
            <div className={styles.formRow}>
              <Field
                className={styles.formInput}
                as={TextInput}
                id="street"
                name="street"
                invalid={props.submitCount && props.errors.street}
                invalidText={
                  props.submitCount &&
                  props.errors.street &&
                  t(props.errors.street)
                }
                labelText={t('registration.street')}
              />
              <Field
                className={styles.formInputShort}
                as={TextInput}
                id="postcode"
                name="postcode"
                invalid={props.submitCount && props.errors.postcode}
                invalidText={
                  props.submitCount &&
                  props.errors.postcode &&
                  t(props.errors.postcode)
                }
                labelText={t('registration.postcode')}
              />
              <Field
                className={styles.formInputShort}
                as={TextInput}
                id="city"
                name="city"
                invalid={props.submitCount && props.errors.city}
                invalidText={
                  props.submitCount && props.errors.city && t(props.errors.city)
                }
                labelText={t('registration.city')}
              />
            </div>
            <div className={styles.formRow}>
              <Field
                className={styles.childBirthDayInput}
                as={TextInput}
                id="birthDay"
                name="birthDay"
                type="number"
                invalid={props.submitCount && props.errors.birthDay}
                invalidText={
                  props.submitCount &&
                  props.errors.birthDay &&
                  t(props.errors.birthDay)
                }
                labelText={t('registration.childBirthDay')}
              />
              <span className={styles.birthdayMiddleDot}>&#8901;</span>
              <Field
                className={styles.childBirthInput}
                as={TextInput}
                id="birthMonth"
                name="birthMonth"
                hideLabel={true}
                type="number"
                invalid={props.submitCount && props.errors.birthMonth}
                invalidText={
                  props.submitCount &&
                  props.errors.birthMonth &&
                  t(props.errors.birthMonth)
                }
                labelText={t('registration.childBirthMonth')}
              />
              <span className={styles.birthdayMiddleDot}>&#8901;</span>
              <Field
                className={styles.childBirthInput}
                as={TextInput}
                id="birthYear"
                name="birthYear"
                hideLabel={true}
                type="number"
                invalid={props.submitCount && props.errors.birthYear}
                invalidText={
                  props.submitCount &&
                  props.errors.birthYear &&
                  t(props.errors.birthYear)
                }
                labelText={t('registration.childBirthYear')}
              />
            </div>
            {!validateDate(
              props.values.birthYear,
              props.values.birthMonth,
              props.values.birthDay
            ) ? (
              <div className={styles.birhtdayErrorMessage}>
                {t('registration.birthdayInvalid')}
              </div>
            ) : !validateAge(
                props.values.birthYear,
                props.values.birthMonth,
                props.values.birthDay
              ) ? (
              <div className={styles.birhtdayErrorMessage}>
                {t('registration.ageRestriction')}
              </div>
            ) : (
              ''
            )}
            <div className={styles.formRow}>
              <span className={styles.email}>
                <label className={styles.emailTitle}>
                  {t('registration.email')}
                </label>
                <span className={styles.email}>{props.values.email}</span>
              </span>
              <Field
                className={styles.formInput}
                as={TextInput}
                id="phone"
                name="phone"
                invalid={props.submitCount && props.errors.phone}
                invalidText={
                  props.submitCount &&
                  props.errors.phone &&
                  t(props.errors.phone)
                }
                labelText={t('registration.phoneNumber')}
              />
            </div>
            <h2>{t('registration.addInfo')}</h2>
            <div className={styles.formRow}>
              <Field
                className={styles.formInput}
                as={TextInput}
                id="school"
                name="school"
                labelText={t('registration.school')}
              />
              <Field
                className={styles.formInput}
                as={TextInput}
                id="class"
                name="class"
                labelText={t('registration.class')}
              />
            </div>
            <h3>{t('registration.homeLanguages')}</h3>
            <ul className={styles.list}>
              {languages.map(language => (
                <li className={styles.checkBoxRow} key={language}>
                  <label>
                    <Field name="language" type="checkbox" value={language} />
                    <span className={styles.listLabel}>{language}</span>
                  </label>
                </li>
              ))}
            </ul>
            <div className={styles.formRow}>
              <Field
                className={styles.formInput}
                as={TextInput}
                id="otherLanguages"
                name="otherLanguages"
                type={props.values.language.includes('Other') ? '' : 'hidden'}
              />
            </div>
            <div
              className={
                getYearDiff(
                  Number(props.values.birthYear),
                  Number(props.values.birthMonth),
                  Number(props.values.birthDay)
                ) > 14
                  ? ''
                  : styles.hidePhotoPermit
              }
            >
              <h3>{t('registration.photoPermit')}</h3>
              <p>{t('registration.photoPermitText')}</p>
              <div className={styles.formRow}>
                <ul className={styles.list}>
                  <li className={styles.radioButtonRow}>
                    <label>
                      <Field
                        id="photoPermitYes"
                        name="photoPermit"
                        type="radio"
                        value="Yes"
                      />
                      <span className={styles.listLabel}>
                        {t('registration.photoPermitYes')}
                      </span>
                    </label>
                  </li>
                  <li className={styles.radioButtonRow}>
                    <label>
                      <Field
                        id="photoPermitNo"
                        name="photoPermit"
                        type="radio"
                        value="No"
                      />
                      <span className={styles.listLabel}>
                        {t('registration.photoPermitNo')}
                      </span>
                    </label>
                  </li>
                </ul>
              </div>
            </div>
            <h2>{t('registration.guardianInfo')}</h2>
            <p>{t('registration.acceptanceInfo')}</p>
            <div className={styles.formRow}>
              <Field
                className={styles.formInput}
                as={TextInput}
                id="guardianFirstName"
                name="guardianFirstName"
                invalid={props.submitCount && props.errors.guardianFirstName}
                invalidText={
                  props.submitCount &&
                  props.errors.guardianFirstName &&
                  t(props.errors.guardianFirstName)
                }
                labelText={t('registration.firstName')}
              />
              <Field
                className={styles.formInput}
                as={TextInput}
                id="guardianLastName"
                name="guardianLastName"
                invalid={props.submitCount && props.errors.guardianLastName}
                invalidText={
                  props.submitCount &&
                  props.errors.guardianLastName &&
                  t(props.errors.guardianLastName)
                }
                labelText={t('registration.lastName')}
              />
            </div>
            <div className={styles.formRow}>
              <Field
                className={styles.formInput}
                as={TextInput}
                id="guardianEmail"
                name="guardianEmail"
                invalid={props.submitCount && props.errors.guardianEmail}
                invalidText={
                  props.submitCount &&
                  props.errors.guardianEmail &&
                  t(props.errors.guardianEmail)
                }
                labelText={t('registration.email')}
              />
              <Field
                className={styles.formInput}
                as={TextInput}
                id="guardianPhone"
                name="guardianPhone"
                invalid={props.submitCount && props.errors.guardianPhone}
                invalidText={
                  props.submitCount &&
                  props.errors.guardianPhone &&
                  t(props.errors.guardianPhone)
                }
                labelText={t('registration.phoneNumber')}
              />
            </div>
            <h2>{t('registration.confirmSend')}</h2>
            <p>{t('registration.processInfoText')}</p>
            <ul className={styles.acceptTermsCheckBox}>
              <Field name="terms" type="checkbox" />
              <span className={styles.listLabel}>
                {t('registration.acceptTermsText_1')}
                <a href="/#">{t('registration.acceptTermsText_link')}</a>
                {t('registration.acceptTermsText_2')}
              </span>
            </ul>
            <button
              disabled={
                !props.values.terms ||
                !isButtonEnabled(
                  props.values.birthYear,
                  props.values.birthMonth,
                  props.values.birthDay
                )
              }
              type="submit"
            >
              {t('registration.sendButton')}
            </button>
          </Form>
        </div>
      )}
    </Formik>
  );
}

export default CreateYouthProfileForm;
