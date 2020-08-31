import React from 'react';
import { useTranslation } from 'react-i18next';
import { Field, Form, Formik } from 'formik';
import * as Yup from 'yup';
import { differenceInYears } from 'date-fns';
import { Button, TextInput, RadioButton } from 'hds-react';

import convertDateToLocale from '../../../common/helpers/convertDateToLocale';
import LabeledValue from '../../../common/components/labeledValue/LabeledValue';
import Text from '../../../common/components/text/Text';
import Stack from '../../../common/components/stack/Stack';
import TermsField from '../../../common/components/termsField/TermsField';
import BasicInformationGrid from '../../../common/components/basicInformationGrid/BasicInformationGrid';
import InfoGrid from '../../../common/components/infoGrid/InfoGrid';
import ageConstants from '../constants/ageConstants';
import styles from './approveYouthProfileForm.module.css';

const schema = Yup.object().shape({
  approverFirstName: Yup.string().max(255, 'validation.maxLength'),
  approverLastName: Yup.string().max(255, 'validation.maxLength'),
  approverEmail: Yup.string().max(255, 'validation.maxLength'),
  phone: Yup.string()
    .min(6, 'validation.phoneMin')
    .max(255, 'validation.maxLength'),
  terms: Yup.boolean().oneOf([true], 'validation.required'),
});

export type FormValues = {
  firstName: string;
  lastName: string;
  address: string;
  addresses: string[];
  email: string;
  phone: string;
  language: string;
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
  onSubmit: (values: FormValues) => Promise<unknown>;
};

function ApproveYouthProfileForm(props: Props) {
  const { t } = useTranslation();

  const age = differenceInYears(new Date(), new Date(props.profile.birthDate));
  const birthDate = convertDateToLocale(props.profile.birthDate);
  const schoolInfo = [props.profile.schoolName, props.profile.schoolClass]
    .filter(value => value)
    .join(', ');

  return (
    <Formik
      initialValues={{
        ...props.profile,
        terms: false,
      }}
      onSubmit={({ terms, ...values }) => props.onSubmit(values)}
      validationSchema={schema}
      enableReinitialize={true}
    >
      {props => (
        <Stack space="xl">
          <div>
            <Text variant="h2">{t('approval.title')}</Text>
            <Text variant="info">
              {props.values.firstName} {t('approval.formExplanationText_1')}{' '}
              {props.values.firstName} {t('approval.formExplanationText_2')}
            </Text>
          </div>
          <div>
            <Text variant="h3">{t('approval.basicInfo')}</Text>
            <BasicInformationGrid
              name={`${props.values.firstName} ${props.values.lastName}`}
              addresses={[props.values.address, ...props.values.addresses]}
              email={props.values.email}
              phone={props.values.phone}
              birthDate={birthDate}
              language={props.values.language}
            />
          </div>
          <div>
            <Text variant="h3">{t('approval.addInfo')}</Text>
            <InfoGrid>
              <LabeledValue
                label={t('approval.schoolInfo')}
                value={schoolInfo}
                noMargin
              />
              <LabeledValue
                label={t('approval.languagesAtHome')}
                value={t(`LANGUAGE_OPTIONS.${props.values.languageAtHome}`)}
                noMargin
              />
            </InfoGrid>
          </div>
          <Form>
            <Stack space="xl">
              <div>
                {age < ageConstants.PHOTO_PERMISSION_MIN && (
                  <React.Fragment>
                    <Text variant="h3">{t('approval.approverAcceptance')}</Text>
                    <Text variant="h4">{t('approval.photoUsageApproved')}</Text>
                    <Text variant="info">
                      {t('approval.photoUsageApprovedText')}
                    </Text>
                  </React.Fragment>
                )}
                {age < ageConstants.PHOTO_PERMISSION_MIN && (
                  <div className={styles.formFields}>
                    <ul className={styles.list}>
                      <li className={styles.radioButtonRow}>
                        <Field
                          id="photoUsageApprovedYes"
                          name="photoUsageApproved"
                          as={RadioButton}
                          labelText={t('approval.photoUsageApprovedYes')}
                          value="true"
                          checked={props.values.photoUsageApproved === 'true'}
                        />
                      </li>
                      <li className={styles.radioButtonRow}>
                        <Field
                          id="photoUsageApprovedNo"
                          name="photoUsageApproved"
                          as={RadioButton}
                          labelText={t('approval.photoUsageApprovedNo')}
                          value="false"
                          checked={props.values.photoUsageApproved === 'false'}
                        />
                      </li>
                    </ul>
                  </div>
                )}
              </div>
              <div>
                <Text variant="h3">{t('approval.approverInfo')}</Text>
                <Text variant="info">{t('approval.approverInfoText')}</Text>
                <div className={styles.formFields}>
                  <Field
                    className={styles.formField}
                    as={TextInput}
                    id="approverFirstName"
                    name="approverFirstName"
                    invalid={
                      props.submitCount && props.errors.approverFirstName
                    }
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
              </div>
              <TermsField id="terms" name="terms" />
              <Button className={styles.button} type="submit">
                {t('approval.approveButton')}
              </Button>
            </Stack>
          </Form>
        </Stack>
      )}
    </Formik>
  );
}

export default ApproveYouthProfileForm;
