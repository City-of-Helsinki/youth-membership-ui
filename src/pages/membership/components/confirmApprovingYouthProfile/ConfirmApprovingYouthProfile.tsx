import React from 'react';
import { useTranslation } from 'react-i18next';

import styles from './ConfirmApprovingYouthProfile.module.css';

function ConfirmApprovingYouthProfile() {
  const { t } = useTranslation();

  return (
    <div className={styles.container}>
      <h1>{t('approval.approvedTitle')}</h1>
      <p>{t('approval.approvedMessage')}</p>
    </div>
  );
}
export default ConfirmApprovingYouthProfile;
