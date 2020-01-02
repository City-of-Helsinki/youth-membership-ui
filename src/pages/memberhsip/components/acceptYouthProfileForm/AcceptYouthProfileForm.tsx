import React from 'react';
import { useTranslation } from 'react-i18next';
import { Field, Form, Formik } from 'formik';
import { TextInput } from 'hds-react';
import * as Yup from 'yup';

import styles from './AcceptYouthProfileForm.module.css';
import LabeledValue from '../../../../common/labeledValue/LabeledValue';
import Button from '../../../../common/button/Button';

const schema = Yup.object().shape({
  approverFirstName: Yup.string().max(255, 'validation.maxLength'),
  approverLastName: Yup.string().max(255, 'validation.maxLength'),
  approverEmail: Yup.string().max(255, 'validation.maxLength'),
  phone: Yup.string()
    .min(6, 'validation.phoneMin')
    .max(255, 'validation.maxLength'),
});

export type FormValues = {
  firstName: string;
  lastName: string;
  address: string;
  email: string;
  phone: string;
  birthDate: string;
  schoolName: string;
  schoolClass: string;
  approverFirstName: string;
  approverLastName: string;
  approverPhone: string;
  approverEmail: string;
  photoUsageApproved: boolean;
  languageAtHome: string;
};

type Props = {
  profile: FormValues;
};

function AcceptYouthProfileForm(props: Props) {
  const { t } = useTranslation();
  return (
    <Formik
      initialValues={{
        ...props.profile,
        approverFirstName: props.profile.approverFirstName,
        approverLastName: props.profile.approverLastName,
        approverEmail: props.profile.approverEmail,
        approverPhone: props.profile.approverPhone,
        terms: false,
      }}
      onSubmit={(values, actions) => {
        setTimeout(() => {
          alert(JSON.stringify(values, null, 2));
          actions.setSubmitting(false);
        }, 1000);
      }}
      validationSchema={schema}
      enableReinitialize={true}
    >
      {props => (
        <div className={styles.content}>
          <span className={styles.formTitleText}>
            <h2>{t('acceptance.title')}</h2>
            <p>
              {props.values.firstName} {t('acceptance.formExplanationText_1')}{' '}
              {props.values.firstName} {t('acceptance.formExplanationText_2')}
            </p>
          </span>
          <h3>{t('acceptance.basicInfo')}</h3>
          <div className={styles.formData}>
            <LabeledValue
              label={t('acceptance.name')}
              value={`${props.values.firstName} ${props.values.lastName}`}
            />
            <LabeledValue
              label={t('acceptance.address')}
              value={props.values.address}
            />
            <LabeledValue
              label={t('acceptance.profile')}
              value={props.values.email}
            />
            <LabeledValue
              label={t('acceptance.phone')}
              value={props.values.phone}
            />
            <LabeledValue
              label={t('acceptance.birthDate')}
              value={props.values.birthDate}
            />
          </div>
          <h3>{t('acceptance.addInfo')}</h3>
          <div className={styles.formData}>
            <LabeledValue
              label={t('acceptance.schoolInfo')}
              value={`${props.values.schoolName}, ${props.values.schoolClass}`}
            />
            <LabeledValue
              label={t('acceptance.languagesAtHome')}
              value={props.values.languageAtHome}
            />
          </div>
          <h3>{t('acceptance.approverAcceptance')}</h3>
          <h4>{t('acceptance.photoUsageApproved')}</h4>
          <p>{t('acceptance.photoUsageApprovedText')}</p>
          <Form>
            <div className={styles.formFields}>
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
                      {t('acceptance.photoUsageApprovedYes')}
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
                      {t('acceptance.photoUsageApprovedNo')}
                    </span>
                  </label>
                </li>
              </ul>
            </div>
            <h3>{t('acceptance.approverInfo')}</h3>
            <p>{t('acceptance.approverInfoText')}</p>
            <div className={styles.formFields}>
              <Field
                className={styles.formField}
                as={TextInput}
                id="approverFirstName"
                name="approverFirstName"
                invalid={props.submitCount && props.errors.approverFirstName}
                invalidText={
                  props.submitCount &&
                  props.errors.approverFirstName &&
                  t(props.errors.approverFirstName)
                }
                labelText={t('acceptance.approverFirstName')}
              />
              <Field
                className={styles.formField}
                as={TextInput}
                id="approverLastName"
                name="approverLastName"
                invalid={props.submitCount && props.errors.approverLastName}
                invalidText={
                  props.submitCount &&
                  props.errors.approverLastName &&
                  t(props.errors.approverLastName)
                }
                labelText={t('acceptance.approverLastName')}
              />
              <Field
                className={styles.formField}
                as={TextInput}
                id="approverEmail"
                name="approverEmail"
                type="email"
                invalid={props.submitCount && props.errors.phone}
                invalidText={
                  props.submitCount &&
                  props.errors.phone &&
                  t(props.errors.phone)
                }
                labelText={t('acceptance.approverEmail')}
              />
              <Field
                className={styles.formField}
                as={TextInput}
                id="approverPhone"
                name="approverPhone"
                type="tel"
                invalid={props.submitCount && props.errors.phone}
                invalidText={
                  props.submitCount &&
                  props.errors.phone &&
                  t(props.errors.phone)
                }
                labelText={t('acceptance.phone')}
              />
            </div>
            <ul className={styles.terms}>
              <Field name="terms" type="checkbox" />
              <span className={styles.listLabel}>
                {t('acceptance.acceptTermsText_1')}
                <a href="/#">{t('acceptance.acceptTermsText_link')}</a>
                {t('acceptance.acceptTermsText_2')}
              </span>
            </ul>
            <div className={styles.buttonAlign}>
              <Button type="submit" disabled={Boolean(!props.values.terms)}>
                {t('acceptance.acceptButton')}
              </Button>
            </div>
          </Form>
        </div>
      )}
    </Formik>
  );
}

export default AcceptYouthProfileForm;
