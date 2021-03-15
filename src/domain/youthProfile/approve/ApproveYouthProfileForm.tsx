import React from 'react';
import { useTranslation } from 'react-i18next';
import { Field, Form, Formik } from 'formik';
import { differenceInYears } from 'date-fns';
import { Button, RadioButton } from 'hds-react';

import {
  CreateAdditionalContactPersonInput,
  UpdateAdditionalContactPersonInput,
} from '../../../graphql/generatedTypes';
import convertDateToLocale from '../../../common/helpers/convertDateToLocale';
import LabeledValue from '../../../common/components/labeledValue/LabeledValue';
import Text from '../../../common/components/text/Text';
import Stack from '../../../common/components/stack/Stack';
import TermsField from '../../../common/components/termsField/TermsField';
import BasicInformationGrid from '../../../common/components/basicInformationGrid/BasicInformationGrid';
import InfoGrid from '../../../common/components/infoGrid/InfoGrid';
import YouthProfileApproverFields from '../../youthProfile/form/YouthProfileApproverFields';
import { approveYouthProfileFormSchema } from '../youthProfileSchemas';
import ageConstants from '../constants/ageConstants';
import styles from './approveYouthProfileForm.module.css';

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
  additionalContactPersons: (
    | CreateAdditionalContactPersonInput
    | UpdateAdditionalContactPersonInput
  )[];
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
      validationSchema={approveYouthProfileFormSchema}
      enableReinitialize={true}
    >
      {props => (
        <Stack space="xl">
          <div>
            <Text variant="h1">{t('approval.title')}</Text>
            <Text variant="info">
              {props.values.firstName} {t('approval.formExplanationText_1')}{' '}
              {props.values.firstName} {t('approval.formExplanationText_2')}
            </Text>
          </div>
          <div>
            <Text variant="h2">{t('approval.basicInfo')}</Text>
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
            <Text variant="h2">{t('approval.addInfo')}</Text>
            <InfoGrid>
              <LabeledValue
                label={t('approval.schoolInfo')}
                value={schoolInfo}
                noMargin
              />
            </InfoGrid>
          </div>
          <Form>
            <Stack space="xl">
              <div>
                {age < ageConstants.PHOTO_PERMISSION_MIN && (
                  <React.Fragment>
                    <Text variant="h2">{t('approval.approverAcceptance')}</Text>
                    <Text variant="h3">{t('approval.photoUsageApproved')}</Text>
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
                <Text variant="h2">{t('approval.approverInfo')}</Text>
                <Text variant="info">{t('approval.approverInfoText')}</Text>
                <YouthProfileApproverFields
                  additionalContactPersonHelperText={t(
                    'approval.addGuardianText'
                  )}
                  viewer="approver"
                />
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
