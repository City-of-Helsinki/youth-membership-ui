import React from 'react';
import { useTranslation } from 'react-i18next';
import countries from 'i18n-iso-countries';

// eslint-disable-next-line max-len
import {
  MembershipDetails,
  MembershipDetails_myYouthProfile_profile_addresses_edges_node as Address,
} from '../../../graphql/generatedTypes';
import LinkButton from '../../../common/components/linkButton/LinkButton';
import LabeledValue from '../../../common/components/labeledValue/LabeledValue';
import PageSection from '../../../common/components/layout/PageSection';
import Text from '../../../common/components/text/Text';
import Stack from '../../../common/components/stack/Stack';
import BasicInformationGrid from '../../../common/components/basicInformationGrid/BasicInformationGrid';
import InfoGrid from '../../../common/components/infoGrid/InfoGrid';
import formatDate from '../../../common/helpers/formatDate';
import getLanguageCode from '../../../common/helpers/getLanguageCode';
import getAdditionalContactPersons from '../../youthProfile/helpers/getAdditionalContactPersons';
import getFullName from '../helpers/getFullName';
import getAddress from '../helpers/getAddress';
import getSchool from '../helpers/getSchool';
import getAddressesFromNode from '../helpers/getAddressesFromNode';
import styles from './membershipDetails.module.css';

type Props = {
  membershipDetailsData: MembershipDetails;
};

function RegistrationInformation({ membershipDetailsData }: Props) {
  const { t, i18n } = useTranslation();

  const getAdditionalAddresses = (address: Address) => {
    const country = countries.getName(
      address.countryCode || 'FI',
      getLanguageCode(i18n.languages[0])
    );
    return [address.address, address.postalCode, address.city, country]
      .filter(addressPart => addressPart)
      .join(', ');
  };
  const addresses = getAddressesFromNode('membership', membershipDetailsData);

  return (
    <PageSection>
      {membershipDetailsData?.myYouthProfile && (
        <Stack space="xl">
          <div>
            <Text variant="h1">{t('membershipDetails.title')}</Text>
            <Text variant="info">{t('membershipDetails.text')}</Text>
          </div>
          <div>
            <Text variant="h2">
              {t('membershipDetails.profileInformation')}
            </Text>
            <BasicInformationGrid
              name={getFullName(membershipDetailsData)}
              addresses={[
                getAddress(membershipDetailsData, i18n.languages[0]),
                ...addresses.map((address: Address) =>
                  getAdditionalAddresses(address)
                ),
              ]}
              email={
                membershipDetailsData?.myYouthProfile?.profile?.primaryEmail
                  ?.email || null
              }
              phone={
                membershipDetailsData?.myYouthProfile?.profile?.primaryPhone
                  ?.phone || null
              }
              birthDate={formatDate(
                membershipDetailsData.myYouthProfile.birthDate
              )}
              language={
                membershipDetailsData?.myYouthProfile?.profile?.language || null
              }
            />
          </div>
          <div>
            <Text variant="h2">
              {t('membershipDetails.additionalInformation')}
            </Text>
            <InfoGrid>
              <LabeledValue
                label={t('youthProfile.school')}
                value={getSchool(membershipDetailsData)}
                noMargin
              />
              <LabeledValue
                label={t('youthProfile.homeLanguages')}
                value={t(
                  `LANGUAGE_OPTIONS.${membershipDetailsData.myYouthProfile.languageAtHome}`
                )}
                noMargin
              />
              <LabeledValue
                label={t('registration.photoUsageApproved')}
                value={
                  membershipDetailsData?.myYouthProfile?.photoUsageApproved
                    ? t('approval.photoUsageApprovedYes')
                    : t('approval.photoUsageApprovedNo')
                }
                noMargin
              />
            </InfoGrid>
          </div>
          <div>
            <Text variant="h2">{t('youthProfile.approverInfo')}</Text>
            <div className={[styles.fieldsGroup, styles.three].join(' ')}>
              <LabeledValue
                label={t('youthProfile.approverName')}
                // eslint-disable-next-line max-len
                value={`${membershipDetailsData.myYouthProfile.approverFirstName} ${membershipDetailsData.myYouthProfile.approverLastName}`}
              />
              <LabeledValue
                label={t('youthProfile.approverEmail')}
                value={membershipDetailsData.myYouthProfile.approverEmail}
              />
              <LabeledValue
                label={t('youthProfile.approverPhone')}
                value={membershipDetailsData.myYouthProfile.approverPhone}
              />
            </div>
            {getAdditionalContactPersons(
              membershipDetailsData.myYouthProfile
            ).map(additionalContact => (
              <div
                key={Object.values(additionalContact).join('')}
                className={[styles.fieldsGroup, styles.three].join(' ')}
              >
                <LabeledValue
                  label={t('youthProfile.approverName')}
                  value={`${additionalContact.firstName} ${additionalContact.lastName}`}
                />
                <LabeledValue
                  label={t('youthProfile.approverEmail')}
                  value={additionalContact.email}
                />
                <LabeledValue
                  label={t('youthProfile.approverPhone')}
                  value={additionalContact.phone}
                />
              </div>
            ))}
          </div>
        </Stack>
      )}
      <LinkButton
        className={styles.button}
        path="/"
        component="Link"
        buttonText={t('membershipDetails.returnToFront')}
        variant="secondary"
      />
      <LinkButton
        className={styles.button}
        path="/edit"
        component="Link"
        buttonText={t('membershipDetails.edit')}
        variant="secondary"
      />
    </PageSection>
  );
}

export default RegistrationInformation;
