import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { Button } from 'hds-react';
import { Form, Formik, FormikProps } from 'formik';
import { Link } from 'react-router-dom';
import { differenceInYears } from 'date-fns';

import {
  AddressType,
  Language,
  MembershipDetails_myYouthProfile_profile_addresses_edges_node as EditAddress,
  MembershipDetails_myYouthProfile_profile_primaryAddress as EditPrimaryAddress,
  PrefillRegistartion_myProfile_addresses_edges_node as CreateAddress,
  PrefillRegistartion_myProfile_primaryAddress as CreatePrimaryAddress,
  YouthLanguage,
  CreateAdditionalContactPersonInput,
  UpdateAdditionalContactPersonInput,
} from '../../../graphql/generatedTypes';
import PageSection from '../../../common/components/layout/PageSection';
import Text from '../../../common/components/text/Text';
import Stack from '../../../common/components/stack/Stack';
import TermsField from '../../../common/components/termsField/TermsField';
import ageConstants from '../constants/ageConstants';
import { youthProfileFormSchema } from '../youthProfileSchemas';
import YouthProfileBasicInformationFields from './YouthProfileBasicInformationFields';
import YouthProfileAdditionalInformationFields from './YouthProfileAdditionalInformationFields';
import YouthProfileApproverFields from './YouthProfileApproverFields';
import FormikFocusError from './FormikFocusError';
import styles from './youthProfileForm.module.css';

export type Values = {
  firstName: string;
  lastName: string;
  primaryAddress: CreatePrimaryAddress | EditPrimaryAddress;
  addresses: (CreateAddress | EditAddress)[];
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
  additionalContactPersons: (
    | CreateAdditionalContactPersonInput
    | UpdateAdditionalContactPersonInput
  )[];
};

export type FormValues = Values & {
  terms: boolean;
};

type Props = {
  profile: Values;
  onValues: (values: Values) => void;
  isSubmitting: boolean;
  isEditing?: boolean;
};

function YouthProfileForm(componentProps: Props) {
  const { t } = useTranslation();
  const [formIsSubmitted, setFormIsSubmitted] = useState<boolean>(false);

  const userAge = differenceInYears(
    new Date(),
    new Date(componentProps.profile.birthDate)
  );

  return (
    <Formik
      validateOnBlur={true}
      initialValues={{
        ...componentProps.profile,
        terms: !!componentProps.isEditing,
        primaryAddress: {
          ...componentProps.profile.primaryAddress,
          address: componentProps.profile.primaryAddress.address || '',
          postalCode: componentProps.profile.primaryAddress.postalCode || '',
          city: componentProps.profile.primaryAddress.city || '',
          countryCode:
            componentProps.profile.primaryAddress.countryCode || 'FI',
          primary: componentProps.profile.primaryAddress.primary || true,
          addressType:
            componentProps.profile.primaryAddress.addressType ||
            AddressType.OTHER,
          __typename:
            componentProps.profile.primaryAddress.__typename || 'AddressNode',
        },
      }}
      onSubmit={async (values: FormValues) => {
        if (!formIsSubmitted) {
          setFormIsSubmitted(true);
          componentProps.onValues({
            ...values,
            addresses: [...values.addresses, { ...values.primaryAddress }],
          });
        }
      }}
      validationSchema={youthProfileFormSchema}
    >
      {(props: FormikProps<FormValues>) => (
        <Form>
          <div className={styles.formWrapper}>
            <PageSection>
              <Stack space="l">
                <div className={styles.formTitleText}>
                  <Text variant="h1">{t('registration.title')}</Text>
                  <Text variant="info">
                    {t('registration.membershipInfoText')}
                  </Text>
                </div>
                <div>
                  <Text variant="h2">{t('registration.basicInfo')}</Text>
                  <YouthProfileBasicInformationFields
                    profile={componentProps.profile}
                    formikProps={props}
                  />
                </div>
              </Stack>
            </PageSection>
            <PageSection>
              <Text variant="h2">{t('registration.addInfo')}</Text>
              <YouthProfileAdditionalInformationFields userAge={userAge} />
            </PageSection>
            <PageSection>
              <Text variant="h2">{t('registration.approver')}</Text>
              <Text variant="info" data-testid="approverInfoText">
                {userAge < ageConstants.ADULT
                  ? t('registration.approverInfoText')
                  : t('registration.approverInfoOver18Text')}
              </Text>

              <YouthProfileApproverFields
                additionalContactPersonHelperText={t(
                  'registration.addGuardianText'
                )}
                isApproverFieldsRequired={userAge < ageConstants.ADULT}
              />
            </PageSection>
            <PageSection>
              {!componentProps.isEditing && (
                <React.Fragment>
                  <Text variant="h3">{t('registration.confirmSend')}</Text>
                  {userAge < ageConstants.ADULT && (
                    <Text variant="info">
                      {t('registration.processInfoText')}
                    </Text>
                  )}
                  <TermsField id="terms" name="terms" />
                </React.Fragment>
              )}

              <div
                className={componentProps.isEditing ? styles.buttonAlign : ''}
              >
                <Button type="submit" className={styles.button}>
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
            </PageSection>
          </div>
          <FormikFocusError />
        </Form>
      )}
    </Formik>
  );
}

export default YouthProfileForm;
