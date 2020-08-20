import React from 'react';
import { useTranslation } from 'react-i18next';
import countries from 'i18n-iso-countries';

// eslint-disable-next-line max-len
import {
  MembershipDetails,
  MembershipDetails_youthProfile_profile_addresses_edges_node as Address,
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
      {membershipDetailsData?.youthProfile && (
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
                ...addresses.map(address => getAdditionalAddresses(address)),
              ]}
              email={
                membershipDetailsData.youthProfile.profile.primaryEmail
                  ?.email || null
              }
              phone={
                membershipDetailsData.youthProfile.profile.primaryPhone
                  ?.phone || null
              }
              birthDate={formatDate(
                membershipDetailsData.youthProfile.birthDate
              )}
              language={t(
                `LANGUAGE_OPTIONS.${membershipDetailsData?.youthProfile?.profile?.language}`
              )}
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
                  `LANGUAGE_OPTIONS.${membershipDetailsData.youthProfile.languageAtHome}`
                )}
                noMargin
              />
              <LabeledValue
                label={t('registration.photoUsageApproved')}
                value={
                  membershipDetailsData?.youthProfile?.photoUsageApproved
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
                value={`${membershipDetailsData.youthProfile.approverFirstName} ${membershipDetailsData.youthProfile.approverLastName}`}
              />
              <LabeledValue
                label={t('youthProfile.approverEmail')}
                value={membershipDetailsData.youthProfile.approverEmail}
              />
              <LabeledValue
                label={t('youthProfile.approverPhone')}
                value={membershipDetailsData.youthProfile.approverPhone}
              />
            </div>
            {getAdditionalContactPersons(
              membershipDetailsData.youthProfile
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
