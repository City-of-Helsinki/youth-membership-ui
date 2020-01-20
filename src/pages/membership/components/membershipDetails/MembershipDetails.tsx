import React from 'react';
import { loader } from 'graphql.macro';
import { useQuery } from '@apollo/react-hooks';
import { useTranslation } from 'react-i18next';

import styles from './MembershipDetails.module.css';
import { MembershipDetails as MembershipDetailsData } from '../../../../graphql/generatedTypes';
import LabeledValue from '../../../../common/labeledValue/LabeledValue';
const MEMBERSHIP_DETAILS = loader('../../graphql/MembershipDetails.graphql');

type Props = {};

function RegistrationInformation(props: Props) {
  const { t } = useTranslation();
  const { data } = useQuery<MembershipDetailsData>(MEMBERSHIP_DETAILS);
  return (
    <div className={styles.membershipDetails}>
      {data?.youthProfile && (
        <>
          <h1>{t('membershipDetails.title')}</h1>
          <p>{t('membershipDetails.text')}</p>
          <h2>{t('membershipDetails.profileInformation')}</h2>
          <LabeledValue label={t('profile.name')} value={''} />
          <LabeledValue label={t('profile.address')} value={''} />
        </>
      )}
    </div>
  );
}

export default RegistrationInformation;
