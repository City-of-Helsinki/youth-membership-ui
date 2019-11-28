import React from 'react';
import { useTranslation } from 'react-i18next';
import { TextInput } from 'hds-react';
import { Formik, Form, Field } from 'formik';
import { differenceInYears } from 'date-fns';
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
  phone: Yup.string().min(6, 'validation.phoneMin'),
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

/**const SignupSchema = Yup.object().shape({
  street: Yup.string()
    .min(2, 'Too Short!')
    .max(255, 'Too Long!')
    .required('Required'),
  postcode: Yup.string()
    .min(5, 'Too Short!')
    .max(5, 'Too Long!')
    .required('Required'),
  city: Yup.string()
    .min(5, 'Too Short!')
    .max(255, 'Too Long!')
    .required('Required'),
  birthDay: Yup.string()
    .min(5, 'Too Short!')
    .max(255, 'Too Long!')
    .required('Required'),
  birthMonth: Yup.string()
    .min(5, 'Too Short!')
    .max(255, 'Too Long!')
    .required('Required'),
  birthYear: Yup.string().required('Required'),
  guardianFirstName: Yup.string()
    .min(2, 'Too Short!')
    .max(255, 'Too Long!')
    .required('Required'),
  guardianLastName: Yup.string()
    .min(2, 'Too Short!')
    .max(255, 'Too Long!')
    .required('Required'),
  guardianPhoneNumber: Yup.string().required('Required'),
  guardianEmail: Yup.string().required('Required'),
});*/

function CreateYouthProfileForm(props: Props) {
  const { t } = useTranslation();
  const languages = ['Suomi', 'Svenska', 'English', 'Other'];

  const getYearDiff = (year: string, month: string, day: string) => {
    if (year && Number(year) >= 1900 && month && day) {
      return differenceInYears(
        new Date(),
        new Date(Number(year), Number(month) - 1, Number(day))
      );
    } else return 0;
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
        guardianPhoneNumber: '',
        terms: false,
      }}
      validationSchema={schema}
      onSubmit={(values, actions) => {
        console.log(values);
      }}
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
                labelText={t('registration.firstName')}
              />
              <Field
                className={styles.formInput}
                as={TextInput}
                id="lastName"
                name="lastName"
                labelText={t('registration.lastName')}
              />
            </div>
            <div className={styles.formRow}>
              <Field
                className={styles.formInput}
                as={TextInput}
                id="street"
                name="street"
                labelText={t('registration.street')}
              />
              <Field
                className={styles.formInput}
                as={TextInput}
                id="postcode"
                name="postcode"
                labelText={t('registration.postcode')}
              />
              <Field
                className={styles.formInput}
                as={TextInput}
                id="city"
                name="city"
                labelText={t('registration.city')}
              />
            </div>
            <div className={styles.formRow}>
              <Field
                className={styles.childBirthDayInput}
                as={TextInput}
                id="birthDay"
                name="birthDay"
                labelText={t('registration.childBirthDay')}
                type="number"
                min={1}
                max={31}
              />
              <span className={styles.birthdayMiddleDot}>&#9679;</span>
              <Field
                className={styles.childBirthInput}
                as={TextInput}
                id="birthMonth"
                name="birthMonth"
                hideLabel={true}
                labelText={t('registration.childBirthMonth')}
                type="number"
                min={1}
                max={12}
              />
              <span className={styles.birthdayMiddleDot}>&#9679;</span>
              <Field
                className={styles.childBirthInput}
                as={TextInput}
                id="birthYear"
                name="birthYear"
                hideLabel={true}
                labelText={t('registration.childBirthYear')}
                type="number"
              />
            </div>
            <div className={styles.formRow}>
              <span className={styles.email}>
                <label className={styles.emailTitle}>
                  {t('registration.email')}
                </label>
                <span>maija.meikalainen@gmail.com</span>
              </span>
              <Field
                className={styles.formInput}
                as={TextInput}
                id="phoneNumber"
                name="phoneNumber"
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
                  props.values.birthYear,
                  props.values.birthMonth,
                  props.values.birthDay
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
                labelText={t('registration.firstName')}
              />
              <Field
                className={styles.formInput}
                as={TextInput}
                id="guardianLastName"
                name="guardianLastName"
                labelText={t('registration.lastName')}
              />
            </div>
            <div className={styles.formRow}>
              <Field
                className={styles.formInput}
                as={TextInput}
                id="guardianEmail"
                name="guardianEmail"
                labelText={t('registration.email')}
              />
              <Field
                className={styles.formInput}
                as={TextInput}
                id="guardianPhoneNumber"
                name="guardianPhoneNumber"
                labelText={t('registration.phoneNumber')}
              />
            </div>
            <h2>{t('registration.confirmSend')}</h2>
            <p>{t('registration.processInfoText')}</p>
            <ul className={styles.acceptTermsCheckBox}>
              <Field
                name="acceptTerms"
                type="checkbox"
                value="acceptanceTerms"
              />
              <span className={styles.listLabel}>
                {t('registration.acceptTermsText_1')}
                <a href="/#">{t('registration.acceptTermsText_link')}</a>
                {t('registration.acceptTermsText_2')}
              </span>
            </ul>
            <button disabled={!props.values.terms} type="submit">
              {t('registration.sendButton')}
            </button>
          </Form>
        </div>
      )}
    </Formik>
  );
}

export default CreateYouthProfileForm;
