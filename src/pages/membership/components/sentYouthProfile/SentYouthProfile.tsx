import React from 'react';
import { useQuery } from '@apollo/react-hooks';
import { loader } from 'graphql.macro';
import { useTranslation } from 'react-i18next';
import { Link } from 'react-router-dom';

import Button from '../../../../common/button/Button';
import styles from './SentYouthProfile.module.css';
import { ApproverEmail } from '../../../../graphql/generatedTypes';

const APPROVER_EMAIL = loader('../../graphql/ApproverEmail.graphql');

type Props = {};

function ViewYouthProfile(props: Props) {
  const { data } = useQuery<ApproverEmail>(APPROVER_EMAIL);
  const { t } = useTranslation();
  return (
    <div className={styles.hostingBox}>
      <h2>{t('confirmSendingProfile.title')}</h2>
      <p className={styles.helpText}>
        {t('confirmSendingProfile.helpText')}{' '}
        {data?.youthProfile?.approverEmail}.
      </p>
      <Button type="button">{t('confirmSendingProfile.buttonText')}</Button>
      <p>
        <Link to="/membership-details">
          {t('confirmSendingProfile.linkToShowSentData')}
          <span className={styles.linkArrow}> ></span>
        </Link>
      </p>
    </div>
  );
}

export default ViewYouthProfile;