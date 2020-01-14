import React from 'react';
import { useQuery } from '@apollo/react-hooks';
import { loader } from 'graphql.macro';
import { useTranslation } from 'react-i18next';

import { MyProfileQuery } from '../../graphql/__generated__/MyProfileQuery';
import Button from '../../../../common/button/Button';
import styles from './ConfirmSendingYouthProfile.module.css';

const MY_PROFILE = loader('../../graphql/MyProfileQuery.graphql');

type Props = {};

function ViewYouthProfile(props: Props) {
  const { data } = useQuery<MyProfileQuery>(MY_PROFILE);
  const { t } = useTranslation();
  return (
    <div className={styles.hostingBox}>
      <h2>{t('confirmSendingProfile.title')}</h2>
      <p className={styles.helpText}>
        {t('confirmSendingProfile.helpText')}{' '}
        {data?.myProfile?.youthProfile?.approverEmail}.
      </p>
      <Button type="button">{t('confirmSendingProfile.buttonText')}</Button>
      <p>
        {t('confirmSendingProfile.linkToShowSentData')}
        <span className={styles.linkArrow}> ></span>
      </p>
    </div>
  );
}

export default ViewYouthProfile;
