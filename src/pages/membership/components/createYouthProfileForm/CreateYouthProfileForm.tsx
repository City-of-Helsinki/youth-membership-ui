import React from 'react';
import { useTranslation } from 'react-i18next';
import { TextInput } from 'hds-react';
import { Formik, Form, Field } from 'formik';
import { Link } from 'react-router-dom';
import { differenceInYears, format } from 'date-fns';
import * as Yup from 'yup';

import Select from '../../../../common/select/Select';
import ageConstants from '../../constants/ageConstants';
import getCookie from '../../helpers/getCookie';
import { Language, YouthLanguage } from '../../../../graphql/generatedTypes';
import styles from './CreateYouthProfileForm.module.css';
import Button from '../../../../common/button/Button';

const BD = getCookie('birthDate');
const AGE = differenceInYears(new Date(), new Date(BD));

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
  approverFirstName: Yup.string()
    .min(2, 'validation.tooShort')
    .max(255, 'validation.tooLong')
    .when([], (schema: Yup.StringSchema) => {
      return AGE < ageConstants.ADULT
        ? schema.required('validation.required')
        : schema;
    }),
  approverLastName: Yup.string()
    .min(2, 'validation.tooShort')
    .max(255, 'validation.tooLong')
    .when([], (schema: Yup.StringSchema) => {
      return AGE < ageConstants.ADULT
        ? schema.required('validation.required')
        : schema;
    }),
  approverPhone: Yup.string()
    .min(6, 'validation.phoneMin')
    .when([], (schema: Yup.StringSchema) => {
      return AGE < ageConstants.ADULT
        ? schema.required('validation.required')
        : schema;
    }),
  approverEmail: Yup.string()
    .email('validation.email')
    .when([], (schema: Yup.StringSchema) => {
      return AGE < ageConstants.ADULT
        ? schema.required('validation.required')
        : schema;
    }),
  photoUsageApproved: Yup.string().required('validation.required'),
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
  profileLanguage: Language;
  languageAtHome: YouthLanguage;
  photoUsageApproved: string;
};

type Props = {
  profile: FormValues;
  onValues: (values: FormValues) => void;
  isSubmitting: boolean;
};

function CreateYouthProfileForm(props: Props) {
  const { t } = useTranslation();
  const languages = ['FINNISH', 'SWEDISH', 'ENGLISH'];

  // For now when using .when() in validation we can't use
  // schema.describe().fields[name].tests to determine if field is required or not.
  // Validation rules returned from .when() won't be added there.
  // For this reason determining asterisk usage must
  // be done with this function
  const approverLabelText = (name: string) => {
    if (AGE < ageConstants.ADULT) return t(`registration.${name}`) + ' *';
    return t(`registration.${name}`);
  };

  return (
    <Formik
      initialValues={{
        ...props.profile,
        birthDate: format(new Date(props.profile.birthDate), 'dd.MM.yyyy'),
        terms: false,
      }}
      initialErrors={{
        terms: 'validation.required',
      }}
      onSubmit={(values: FormValues) =>
        props.onValues({ ...values, birthDate: props.profile.birthDate })
      }
      validationSchema={schema}
    >
      {props => (
        <div className={styles.formWrapper}>
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
              <div className={styles.formInputRow}>
                <Field
                  className={styles.formInputPostal}
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
                  className={styles.formInputCity}
                  as={TextInput}
                  id="city"
                  name="city"
                  invalid={props.submitCount && props.errors.city}
                  invalidText={
                    props.submitCount &&
                    props.errors.city &&
                    t(props.errors.city)
                  }
                  labelText={t('registration.city') + ' *'}
                />
              </div>
            </div>
            <div className={styles.formRow}>
              <Field
                as={TextInput}
                id="birthDate"
                name="birthDate"
                readOnly
                labelText={t('registration.childBirthDay')}
                className={styles.formInput}
              />
              <Field
                as={Select}
                setFieldValue={props.setFieldValue}
                id="profileLanguage"
                name="profileLanguage"
                type="select"
                options={[
                  { value: 'FINNISH', label: t('LANGUAGE_OPTIONS.FINNISH') },
                  { value: 'ENGLISH', label: t('LANGUAGE_OPTIONS.ENGLISH') },
                  { value: 'SWEDISH', label: t('LANGUAGE_OPTIONS.SWEDISH') },
                ]}
                className={styles.formInput}
                labelText={t('registration.profileLanguage')}
              />
            </div>
            <div className={styles.formRow}>
              <Field
                as={TextInput}
                id="email"
                name="email"
                type="text"
                labelText={t('registration.email')}
                className={styles.formInput}
                readOnly
              />
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
                    <span className={styles.listLabel}>
                      {t(`LANGUAGE_OPTIONS.${language}`)}
                    </span>
                  </label>
                </li>
              ))}
            </ul>
            <div
              className={
                AGE < ageConstants.PHOTO_PERMISSION_MIN
                  ? styles.hidePhotoUsageApproved
                  : ''
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
                        value={'true'}
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
                        value={'false'}
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
            {AGE < ageConstants.ADULT && (
              <p>{t('registration.approverInfoText')}</p>
            )}
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
                labelText={approverLabelText('firstName')}
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
                labelText={approverLabelText('lastName')}
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
                labelText={approverLabelText('email')}
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
                labelText={approverLabelText('phoneNumber')}
              />
            </div>
            <h3>{t('registration.confirmSend')}</h3>
            {AGE < ageConstants.ADULT && (
              <p>{t('registration.processInfoText')}</p>
            )}
            <ul className={styles.terms}>
              <Field name="terms" type="checkbox" />
              <span className={styles.listLabel}>
                {t('registration.approveTermsText_1')}
                <Link
                  to="/terms-of-service"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  {t('registration.approveTermsText_link')}
                </Link>
                {t('registration.approveTermsText_2') + ' *'}
              </span>
            </ul>
            <div className={styles.buttonAlign}>
              <Button type="submit" disabled={Boolean(!props.values.terms)}>
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
