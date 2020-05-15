import React from 'react';
import { useTranslation } from 'react-i18next';
import { Field, Form, Formik } from 'formik';
import { Link } from 'react-router-dom';
import * as Yup from 'yup';
import { differenceInYears } from 'date-fns';
import { Button, Checkbox, TextInput } from 'hds-react';

import convertDateToLocale from '../../helpers/convertDateToLocale';
import ageConstants from '../../constants/ageConstants';
import styles from './ApproveYouthProfileForm.module.css';
import LabeledValue from '../../../../common/labeledValue/LabeledValue';

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
  photoUsageApproved: string;
  languageAtHome: string;
};

type Props = {
  profile: FormValues;
  isSubmitting: boolean;
  onValues: (values: FormValues) => void;
};

function ApproveYouthProfileForm(props: Props) {
  const { t } = useTranslation();

  const age = differenceInYears(new Date(), new Date(props.profile.birthDate));
  const birthDate = convertDateToLocale(props.profile.birthDate);

  return (
    <Formik
      initialValues={{
        ...props.profile,
        terms: false,
      }}
      onSubmit={values => {
        props.onValues(values);
      }}
      validationSchema={schema}
      enableReinitialize={true}
    >
      {props => (
        <div className={styles.content}>
          <span className={styles.formTitleText}>
            <h2>{t('approval.title')}</h2>
            <p>
              {props.values.firstName} {t('approval.formExplanationText_1')}{' '}
              {props.values.firstName} {t('approval.formExplanationText_2')}
            </p>
          </span>
          <h3>{t('approval.basicInfo')}</h3>
          <div className={styles.formData}>
            <LabeledValue
              label={t('approval.name')}
              value={`${props.values.firstName} ${props.values.lastName}`}
            />
            <LabeledValue
              label={t('approval.address')}
              value={props.values.address}
            />
            <LabeledValue
              label={t('approval.profile')}
              value={props.values.email}
            />
            <LabeledValue
              label={t('approval.phone')}
              value={props.values.phone}
            />
            <LabeledValue label={t('approval.birthDate')} value={birthDate} />
          </div>
          <h3>{t('approval.addInfo')}</h3>
          <div className={styles.formData}>
            <LabeledValue
              label={t('approval.schoolInfo')}
              value={`${props.values.schoolName}, ${props.values.schoolClass}`}
            />
            <LabeledValue
              label={t('approval.languagesAtHome')}
              value={t(`LANGUAGE_OPTIONS.${props.values.languageAtHome}`)}
            />
          </div>
          {age < ageConstants.PHOTO_PERMISSION_MIN && (
            <React.Fragment>
              <h3>{t('approval.approverAcceptance')}</h3>
              <h4>{t('approval.photoUsageApproved')}</h4>
              <p>{t('approval.photoUsageApprovedText')}</p>
            </React.Fragment>
          )}
          <Form>
            {age < ageConstants.PHOTO_PERMISSION_MIN && (
              <div className={styles.formFields}>
                <ul className={styles.list}>
                  <li className={styles.radioButtonRow}>
                    <label>
                      <Field
                        id="photoUsageApprovedYes"
                        name="photoUsageApproved"
                        type="radio"
                        value="true"
                      />
                      <span className={styles.listLabel}>
                        {t('approval.photoUsageApprovedYes')}
                      </span>
                    </label>
                  </li>
                  <li className={styles.radioButtonRow}>
                    <label>
                      <Field
                        id="pphotoUsageApprovedNo"
                        name="photoUsageApproved"
                        type="radio"
                        value="false"
                      />
                      <span className={styles.listLabel}>
                        {t('approval.photoUsageApprovedNo')}
                      </span>
                    </label>
                  </li>
                </ul>
              </div>
            )}
            <h3>{t('approval.approverInfo')}</h3>
            <p>{t('approval.approverInfoText')}</p>

            <div className={styles.formFields}>
              <Field
                className={styles.formField}
                as={TextInput}
                id="approverFirstName"
                name="approverFirstName"
                invalid={props.submitCount && props.errors.approverFirstName}
                helperText={
                  props.submitCount && props.errors.approverFirstName
                    ? t(props.errors.approverFirstName)
                    : ''
                }
                labelText={t('approval.approverFirstName')}
              />
              <Field
                className={styles.formField}
                as={TextInput}
                id="approverLastName"
                name="approverLastName"
                invalid={props.submitCount && props.errors.approverLastName}
                helperText={
                  props.submitCount && props.errors.approverLastName
                    ? t(props.errors.approverLastName)
                    : ''
                }
                labelText={t('approval.approverLastName')}
              />
              <Field
                className={styles.formField}
                as={TextInput}
                id="approverEmail"
                name="approverEmail"
                type="email"
                invalid={props.submitCount && props.errors.phone}
                helperText={
                  props.submitCount && props.errors.phone
                    ? t(props.errors.phone)
                    : ''
                }
                labelText={t('approval.approverEmail')}
              />
              <Field
                className={styles.formField}
                as={TextInput}
                id="approverPhone"
                name="approverPhone"
                type="tel"
                invalid={props.submitCount && props.errors.phone}
                helperText={
                  props.submitCount && props.errors.phone
                    ? t(props.errors.phone)
                    : ''
                }
                labelText={t('approval.phone')}
              />
            </div>
            <ul className={styles.terms}>
              <Field
                name="terms"
                type="checkbox"
                as={Checkbox}
                labelText={
                  <span className={styles.listLabel}>
                    {t('approval.approveTermsText_1')}{' '}
                    <Link
                      to="/terms-of-service"
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      {t('approval.approveTermsText_link')}
                    </Link>
                    {t('approval.approveTermsText_2')}
                  </span>
                }
              />
            </ul>
            <div className={styles.buttonAlign}>
              <Button
                className={styles.button}
                type="submit"
                disabled={props.isSubmitting || Boolean(!props.values.terms)}
              >
                {t('approval.approveButton')}
              </Button>
            </div>
          </Form>
        </div>
      )}
    </Formik>
  );
}

export default ApproveYouthProfileForm;
