import React, { ReactElement } from 'react';
import { useTranslation } from 'react-i18next';

import LinkButton from '../../common/components/linkButton/LinkButton';
import Text from '../../common/components/text/Text';
import Stack from '../../common/components/stack/Stack';
import styles from './membershipPageLayout.module.css';

type Props = {
  profileFullName: string;
  membershipNumber: string;
  membershipExpiryTitle: string;
  membershipExpiryDescription?: string;
  qrCode?: ReactElement;
  mainActionButton?: ReactElement;
  secondaryActionButton?: ReactElement;
};

function MembershipPageLayout({
  profileFullName,
  membershipNumber,
  qrCode,
  membershipExpiryTitle,
  membershipExpiryDescription,
  mainActionButton,
  secondaryActionButton,
}: Props) {
  const { t } = useTranslation();

  return (
    <div className={styles.container}>
      <Text variant="h1">{profileFullName}</Text>
      <Text variant="h2" className={styles.membershipNumber}>
        {t('membershipInformation.title', {
          number: membershipNumber,
        })}
      </Text>
      {qrCode && qrCode}
      <p className={styles.membershipExpiryTitle}>{membershipExpiryTitle}</p>
      {membershipExpiryDescription && (
        <p className={styles.membershipExpiryDescription}>
          {membershipExpiryDescription}
        </p>
      )}
      <Stack space="m">
        {mainActionButton && mainActionButton}
        {secondaryActionButton && secondaryActionButton}
        <LinkButton
          path={t('feedback.giveFeedback.link')}
          component="a"
          buttonText={t('feedback.giveFeedback.label')}
          variant="secondary"
        />
      </Stack>
    </div>
  );
}

export default MembershipPageLayout;
