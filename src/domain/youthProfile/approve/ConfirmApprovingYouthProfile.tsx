import React from 'react';
import { useTranslation } from 'react-i18next';

import Text from '../../../common/components/text/Text';
import styles from './confirmApprovingYouthProfile.module.css';

function ConfirmApprovingYouthProfile() {
  const { t } = useTranslation();

  return (
    <div className={styles.container}>
      <Text variant="h1">{t('approval.approvedTitle')}</Text>
      <Text variant="info">{t('approval.approvedMessage')}</Text>
    </div>
  );
}
export default ConfirmApprovingYouthProfile;
