import React from 'react';
import { useTranslation } from 'react-i18next';
import { TextInput } from 'hds-react';
import { Formik, Form, Field } from 'formik';
import { Link } from 'react-router-dom';
import { differenceInYears, format, isValid, parse } from 'date-fns';
import * as Yup from 'yup';

import styles from './CreateYouthProfileForm.module.css';
import Button from '../../../../common/button/Button';

const schema = Yup.object().shape({
  firstName: Yup.string()
    .min(2, 'validation.tooShort')
    .max(255, 'validation.tooLong')
    .required('validation.required'),
  lastName: Yup.string()
    .min(2, 'validation.tooShort')
    .max(255, 'validation.tooLong')
    .required('validation.required'),
  phone: Yup.string()
    .min(6, 'validation.phoneMin')
    .required('validation.required'),
  address: Yup.string()
    .min(2, 'validation.tooShort')
    .max(255, 'validation.tooLong')
    .required('validation.required'),
  postalCode: Yup.string()
    .min(5, 'validation.tooShort')
    .max(5, 'validation.tooLong')
    .required('validation.required'),
  city: Yup.string()
    .min(2, 'validation.tooShort')
    .max(255, 'validation.tooLong')
    .required('validation.required'),
  birthDay: Yup.number().required('validation.required'),
  birthMonth: Yup.number().required('validation.required'),
  birthYear: Yup.number().required('validation.required'),
  approverFirstName: Yup.string()
    .min(2, 'validation.tooShort')
    .max(255, 'validation.tooLong')
    .required('validation.required'),
  approverLastName: Yup.string()
    .min(2, 'validation.tooShort')
    .max(255, 'validation.tooLong')
    .required('validation.required'),
  approverPhone: Yup.string()
    .min(6, 'validation.phoneMin')
    .required('validation.required'),
  approverEmail: Yup.string()
    .required('validation.required')
    .email('validation.email'),
  photoUsageApproved: Yup.boolean().required('validation.required'),
  terms: Yup.boolean().oneOf([true], 'validation.required'),
});

export type FormValues = {
  firstName: string;
  lastName: string;
  address: string;
  postalCode: string;
  city: string;
  email: string;
  phone: string;
  birthDate: string;
  schoolName: string;
  schoolClass: string;
  approverFirstName: string;
  approverLastName: string;
  approverPhone: string;
  approverEmail: string;
  //TODO: Waiting to be fixed in backend
  // photoUsageApproved: boolean;
  //languageAtHome: string;
};

type Props = {
  profile: FormValues;
  onValues: (values: FormValues) => void;
  isSubmitting: boolean;
};

function CreateYouthProfileForm(props: Props) {
  const { t } = useTranslation();
  const languages = ['Suomi', 'Svenska', 'English'];

  const isBirhthdayTyped = (year: string, month: string, day: string) => {
    if (year === '' || month === '' || day === '') {
      return false;
    }
    return true;
  };

  const validateDate = (year: string, month: string, day: string) => {
    if (Number(year) < 0 || Number(month) < 0 || Number(day) < 0) return false;

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
    if (Number(year) > 1900) {
      return validateAge(year, month, day);
    }
    return false;
  };

  return (
    <Formik
      initialValues={{
        ...props.profile,
        address: '',
        postalCode: '',
        city: '',
        birthDay: '',
        birthMonth: '',
        birthYear: '',
        phone: '',
        schoolName: '',
        schoolClass: '',
        language: '',
        photoUsageApproved: false,
        approverFirstName: '',
        approverLastName: '',
        approverEmail: '',
        approverPhone: '',
        terms: false,
      }}
      initialErrors={{
        terms: 'validation.required',
      }}
      onSubmit={values => {
        props.onValues({
          firstName: values.firstName,
          lastName: values.lastName,
          address: values.address,
          postalCode: values.postalCode,
          city: values.city,
          email: props.profile.email,
          phone: values.phone,
          birthDate: format(
            new Date(
              `${values.birthYear}-${values.birthMonth}-${values.birthDay}`
            ),
            'yyy-MM-dd'
          ),
          schoolName: values.schoolName,
          schoolClass: values.schoolClass,
          approverFirstName: values.approverFirstName,
          approverLastName: values.approverLastName,
          approverPhone: values.approverPhone,
          approverEmail: values.approverEmail,
          //TODO: Waiting to be fixed in backend
          //photoUsageApproved: true,
          //languageAtHome: values.languageAtHome,
        });
      }}
      validationSchema={schema}
    >
      {props => (
        <div>
          <span className={styles.formTitleText}>
            <h2>{t('registration.title')}</h2>
            <p>{t('registration.membershipInfoText')}</p>
          </span>
          <h3>{t('registration.basicInfo')}</h3>
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
                labelText={t('registration.firstName') + ' *'}
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
                labelText={t('registration.lastName') + ' *'}
              />
            </div>
            <div className={styles.formRow}>
              <Field
                className={styles.formInput}
                as={TextInput}
                id="address"
                name="address"
                invalid={props.submitCount && props.errors.address}
                invalidText={
                  props.submitCount &&
                  props.errors.address &&
                  t(props.errors.address)
                }
                labelText={t('registration.address') + ' *'}
              />
              <Field
                className={styles.formInputShort}
                as={TextInput}
                id="postalCode"
                name="postalCode"
                invalid={props.submitCount && props.errors.postalCode}
                invalidText={
                  props.submitCount &&
                  props.errors.postalCode &&
                  t(props.errors.postalCode)
                }
                labelText={t('registration.postalCode') + ' *'}
              />
              <Field
                className={styles.formInputRes}
                as={TextInput}
                id="city"
                name="city"
                invalid={props.submitCount && props.errors.city}
                invalidText={
                  props.submitCount && props.errors.city && t(props.errors.city)
                }
                labelText={t('registration.city') + ' *'}
              />
            </div>
            <div className={styles.birthDayContainer}>
              <h6>{t('registration.birthDay')}</h6>
              <div className={styles.resRow}>
                <Field
                  className={styles.childBirthInput}
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
                />
              </div>
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
                <div>{props.values.email}</div>
              </span>
              <Field
                className={styles.formInput}
                as={TextInput}
                id="phone"
                name="phone"
                type="tel"
                invalid={props.submitCount && props.errors.phone}
                invalidText={
                  props.submitCount &&
                  props.errors.phone &&
                  t(props.errors.phone)
                }
                labelText={t('registration.phoneNumber') + ' *'}
              />
            </div>
            <h3>{t('registration.addInfo')}</h3>
            <div className={styles.formRow}>
              <Field
                className={styles.formInput}
                as={TextInput}
                id="schoolName"
                name="schoolName"
                labelText={t('registration.schoolName')}
              />
              <Field
                className={styles.formInput}
                as={TextInput}
                id="schoolClass"
                name="schoolClass"
                labelText={t('registration.schoolClass')}
              />
            </div>
            <h4>{t('registration.languageAtHome')}</h4>
            <ul className={styles.list}>
              {languages.map(language => (
                <li className={styles.languageRadioBtnRow} key={language}>
                  <label>
                    <Field
                      name="languageAtHome"
                      type="radio"
                      value={language}
                    />
                    <span className={styles.listLabel}>{language}</span>
                  </label>
                </li>
              ))}
            </ul>
            <div
              className={
                getYearDiff(
                  Number(props.values.birthYear),
                  Number(props.values.birthMonth),
                  Number(props.values.birthDay)
                ) > 14
                  ? ''
                  : styles.hidePhotoUsageApproved
              }
            >
              <h4>{t('registration.photoUsageApproved')}</h4>
              <p>{t('registration.photoUsageApprovedText')}</p>
              <div className={styles.resRow}>
                <ul className={styles.list}>
                  <li className={styles.radioButtonRow}>
                    <label>
                      <Field
                        id="photoUsageApprovedYes"
                        name="photoUsageApproved"
                        type="radio"
                        value={true}
                      />
                      <span className={styles.listLabel}>
                        {t('registration.photoUsageApprovedYes')}
                      </span>
                    </label>
                  </li>
                  <li className={styles.radioButtonRow}>
                    <label>
                      <Field
                        id="pphotoUsageApprovedNo"
                        name="photoUsageApproved"
                        type="radio"
                        value={false}
                      />
                      <span className={styles.listLabel}>
                        {t('registration.photoUsageApprovedNo')}
                      </span>
                    </label>
                  </li>
                </ul>
              </div>
            </div>
            <h3>{t('registration.approver')}</h3>
            <p>{t('registration.approverInfoText')}</p>
            <div className={styles.formRow}>
              <Field
                className={styles.formInput}
                as={TextInput}
                id="approverFirstName"
                name="approverFirstName"
                invalid={props.submitCount && props.errors.approverFirstName}
                invalidText={
                  props.submitCount &&
                  props.errors.approverFirstName &&
                  t(props.errors.approverFirstName)
                }
                labelText={t('registration.firstName') + ' *'}
              />
              <Field
                className={styles.formInput}
                as={TextInput}
                id="approverLastName"
                name="approverLastName"
                invalid={props.submitCount && props.errors.approverLastName}
                invalidText={
                  props.submitCount &&
                  props.errors.approverLastName &&
                  t(props.errors.approverLastName)
                }
                labelText={t('registration.lastName') + ' *'}
              />
            </div>
            <div className={styles.formRow}>
              <Field
                className={styles.formInput}
                as={TextInput}
                id="approverEmail"
                name="approverEmail"
                type="email"
                invalid={props.submitCount && props.errors.approverEmail}
                invalidText={
                  props.submitCount &&
                  props.errors.approverEmail &&
                  t(props.errors.approverEmail)
                }
                labelText={t('registration.email') + ' *'}
              />
              <Field
                className={styles.formInput}
                as={TextInput}
                id="approverPhone"
                name="approverPhone"
                type="tel"
                invalid={props.submitCount && props.errors.approverPhone}
                invalidText={
                  props.submitCount &&
                  props.errors.approverPhone &&
                  t(props.errors.approverPhone)
                }
                labelText={t('registration.phoneNumber') + ' *'}
              />
            </div>
            <h3>{t('registration.confirmSend')}</h3>
            <p>{t('registration.processInfoText')}</p>
            <ul className={styles.terms}>
              <Field name="terms" type="checkbox" />
              <span className={styles.listLabel}>
                {t('registration.approveTermsText_1')}
                <Link to="/terms-of-service">
                  {t('registration.approveTermsText_link')}
                </Link>
                {t('registration.approveTermsText_2') + ' *'}
              </span>
            </ul>
            <div className={styles.buttonAlign}>
              <Button
                type="submit"
                disabled={Boolean(
                  !props.values.terms ||
                    !isButtonEnabled(
                      props.values.birthYear,
                      props.values.birthMonth,
                      props.values.birthDay
                    )
                )}
              >
                {t('registration.sendButton')}
              </Button>
            </div>
          </Form>
        </div>
      )}
    </Formik>
  );
}

export default CreateYouthProfileForm;
