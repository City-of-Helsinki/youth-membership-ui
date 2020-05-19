import React from 'react';
import { useTranslation, Trans } from 'react-i18next';
import { TextInput, Button, Checkbox, RadioButton } from 'hds-react';
import { Formik, Form, Field } from 'formik';
import { Link } from 'react-router-dom';
import { differenceInYears, format } from 'date-fns';
import * as Yup from 'yup';
import countries from 'i18n-iso-countries';

import Select from '../../../../common/select/Select';
import ageConstants from '../../constants/ageConstants';
import { Language, YouthLanguage } from '../../../../graphql/generatedTypes';
import styles from './YouthProfileForm.module.css';

const isConsentRequired = (birthDate: string, schema: Yup.StringSchema) => {
  const userAge = differenceInYears(new Date(), new Date(birthDate));
  return userAge < ageConstants.ADULT
    ? schema.required('validation.required')
    : schema;
};

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
  schoolName: Yup.string().max(128, 'validation.tooLong'),
  schoolClass: Yup.string().max(10, 'validation.tooLong'),
  approverFirstName: Yup.string()
    .min(2, 'validation.tooShort')
    .max(255, 'validation.tooLong')
    .when(['birthDate'], (birthDate: string, schema: Yup.StringSchema) =>
      isConsentRequired(birthDate, schema)
    ),
  approverLastName: Yup.string()
    .min(2, 'validation.tooShort')
    .max(255, 'validation.tooLong')
    .when(['birthDate'], (birthDate: string, schema: Yup.StringSchema) =>
      isConsentRequired(birthDate, schema)
    ),
  approverPhone: Yup.string()
    .min(6, 'validation.phoneMin')
    .when(['birthDate'], (birthDate: string, schema: Yup.StringSchema) =>
      isConsentRequired(birthDate, schema)
    ),
  approverEmail: Yup.string()
    .email('validation.email')
    .when(['birthDate'], (birthDate: string, schema: Yup.StringSchema) =>
      isConsentRequired(birthDate, schema)
    ),
  photoUsageApproved: Yup.string().required('validation.required'),
  terms: Yup.boolean().oneOf([true], 'validation.required'),
});

export type FormValues = {
  firstName: string;
  lastName: string;
  address: string;
  postalCode: string;
  city: string;
  countryCode: string;
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
  isEditing?: boolean;
};

function YouthProfileForm(componentProps: Props) {
  const { t, i18n } = useTranslation();
  const languages = ['FINNISH', 'SWEDISH', 'ENGLISH'];

  const userAge = differenceInYears(
    new Date(),
    new Date(componentProps.profile.birthDate)
  );

  // For now when using .when() in validation we can't use
  // schema.describe().fields[name].tests to determine if field is required or not.
  // Validation rules returned from .when() won't be added there.
  // For this reason determining asterisk usage must
  // be done with this function
  const approverLabelText = (name: string) => {
    if (userAge < ageConstants.ADULT) return t(`registration.${name}`) + ' *';
    return t(`registration.${name}`);
  };

  const countryList = countries.getNames(i18n.languages[0]);
  const countryOptions = Object.keys(countryList).map(key => {
    return {
      value: key,
      label: countryList[key],
    };
  });

  return (
    <Formik
      initialValues={{
        ...componentProps.profile,
        terms: !!componentProps.isEditing,
      }}
      onSubmit={(values: FormValues) => componentProps.onValues(values)}
      validationSchema={schema}
    >
      {props => (
        <div className={styles.formWrapper}>
          <div className={styles.formTitleText}>
            <h1>{t('registration.title')}</h1>
            <p>{t('registration.membershipInfoText')}</p>
          </div>
          <h3>{t('registration.basicInfo')}</h3>
          <Form>
            <div className={styles.formRow}>
              <Field
                className={styles.formInput}
                as={TextInput}
                id="firstName"
                name="firstName"
                invalid={props.submitCount && props.errors.firstName}
                helperText={
                  props.submitCount && props.errors.firstName
                    ? t(props.errors.firstName)
                    : ''
                }
                labelText={t('registration.firstName') + ' *'}
              />
              <Field
                className={styles.formInput}
                as={TextInput}
                id="lastName"
                name="lastName"
                invalid={props.submitCount && props.errors.lastName}
                helperText={
                  props.submitCount && props.errors.lastName
                    ? t(props.errors.lastName)
                    : ''
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
                helperText={
                  props.submitCount && props.errors.address
                    ? t(props.errors.address)
                    : ''
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
                  helperText={
                    props.submitCount && props.errors.postalCode
                      ? t(props.errors.postalCode)
                      : ''
                  }
                  labelText={t('registration.postalCode') + ' *'}
                />
                <Field
                  className={styles.formInputCity}
                  as={TextInput}
                  id="city"
                  name="city"
                  invalid={props.submitCount && props.errors.city}
                  helperText={
                    props.submitCount && props.errors.city
                      ? t(props.errors.city)
                      : ''
                  }
                  labelText={t('registration.city') + ' *'}
                />
              </div>
            </div>
            <div className={styles.formRow}>
              <Field
                as={Select}
                setFieldValue={props.setFieldValue}
                id="countryCode"
                name="countryCode"
                type="select"
                options={countryOptions}
                className={styles.formInput}
                labelText={t('registration.country')}
              />
            </div>
            <div className={styles.formRow}>
              <Field
                as={TextInput}
                id="birthDate"
                name="birthDate"
                readOnly
                value={
                  componentProps.profile.birthDate &&
                  format(
                    new Date(componentProps.profile.birthDate),
                    'dd.MM.yyyy'
                  )
                }
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
                helperText={
                  props.submitCount && props.errors.phone
                    ? t(props.errors.phone)
                    : ''
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
                invalid={props.submitCount && props.errors.schoolName}
                helperText={
                  props.submitCount && props.errors.schoolName
                    ? t(props.errors.schoolName)
                    : ''
                }
              />
              <Field
                className={styles.formInput}
                as={TextInput}
                id="schoolClass"
                name="schoolClass"
                labelText={t('registration.schoolClass')}
                invalid={props.submitCount && props.errors.schoolClass}
                helperText={
                  props.submitCount && props.errors.schoolClass
                    ? t(props.errors.schoolClass)
                    : ''
                }
              />
            </div>
            <p className={styles.radioLabel}>
              {t('registration.languageAtHome')}
            </p>
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
            <h3>{t('registration.approver')}</h3>

            <p
              data-testid="approverInfoText"
              className={styles.approverInfoText}
            >
              {userAge < ageConstants.ADULT
                ? t('registration.approverInfoText')
                : t('registration.approverInfoOver18Text')}
            </p>

            <div className={styles.formRow}>
              <Field
                className={styles.formInput}
                as={TextInput}
                id="approverFirstName"
                name="approverFirstName"
                invalid={props.submitCount && props.errors.approverFirstName}
                helperText={
                  props.submitCount && props.errors.approverFirstName
                    ? t(props.errors.approverFirstName)
                    : ''
                }
                labelText={approverLabelText('firstName')}
              />
              <Field
                className={styles.formInput}
                as={TextInput}
                id="approverLastName"
                name="approverLastName"
                invalid={props.submitCount && props.errors.approverLastName}
                helperText={
                  props.submitCount && props.errors.approverLastName
                    ? t(props.errors.approverLastName)
                    : ''
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
                helperText={
                  props.submitCount && props.errors.approverEmail
                    ? t(props.errors.approverEmail)
                    : ''
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
                helperText={
                  props.submitCount && props.errors.approverPhone
                    ? t(props.errors.approverPhone)
                    : ''
                }
                labelText={approverLabelText('phoneNumber')}
              />
            </div>
            {!componentProps.isEditing && (
              <React.Fragment>
                <h3>{t('registration.confirmSend')}</h3>
                {userAge < ageConstants.ADULT && (
                  <p>{t('registration.processInfoText')}</p>
                )}
                <ul className={styles.terms}>
                  <Field
                    as={Checkbox}
                    name="terms"
                    type="checkbox"
                    labelText={
                      <Trans
                        i18nKey="registration.approveTerms"
                        components={[
                          // These components receive content  in the
                          // translation definition.
                          // eslint-disable-next-line jsx-a11y/anchor-has-content
                          <a
                            href={t('registry.descriptionLink')}
                            target="_blank"
                            rel="noopener noreferrer"
                          />,
                          // eslint-disable-next-line jsx-a11y/anchor-has-content
                          <a
                            href={t('privacyPolicy.descriptionLink')}
                            target="_blank"
                            rel="noopener noreferrer"
                          />,
                        ]}
                      />
                    }
                  />
                </ul>
              </React.Fragment>
            )}

            <div className={componentProps.isEditing ? styles.buttonAlign : ''}>
              <Button
                type="submit"
                disabled={
                  !componentProps.isEditing
                    ? Boolean(!props.values.terms)
                    : false
                }
                className={styles.button}
              >
                {componentProps.isEditing
                  ? t('registration.save')
                  : t('registration.sendButton')}
              </Button>

              {componentProps.isEditing && (
                <Link to="/membership-details">
                  <Button variant="secondary" className={styles.button}>
                    {t('registration.cancel')}
                  </Button>
                </Link>
              )}
            </div>
          </Form>
        </div>
      )}
    </Formik>
  );
}

export default YouthProfileForm;
