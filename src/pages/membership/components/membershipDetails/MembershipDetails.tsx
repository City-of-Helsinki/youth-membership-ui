import React, { useState } from 'react';
import { loader } from 'graphql.macro';
import { useQuery } from '@apollo/react-hooks';
import { useTranslation } from 'react-i18next';
import { Link } from 'react-router-dom';
import * as Sentry from '@sentry/browser';
import { Button } from 'hds-react';

import styles from './MembershipDetails.module.css';
import NotificationComponent from '../../../../common/notification/NotificationComponent';
import { MembershipDetails as MembershipDetailsData } from '../../../../graphql/generatedTypes';
import LabeledValue from '../../../../common/labeledValue/LabeledValue';
import getFullName from '../../helpers/getFullName';
import getAddress from '../../helpers/getAddress';
import getSchool from '../../helpers/getSchool';
import formatDate from '../../../../common/helpers/formatDate';

const MEMBERSHIP_DETAILS = loader('../../graphql/MembershipDetails.graphql');

type Props = {};

function RegistrationInformation(props: Props) {
  const [showNotification, setShowNotification] = useState(false);
  const { t, i18n } = useTranslation();
  const { data } = useQuery<MembershipDetailsData>(MEMBERSHIP_DETAILS, {
    onError: (error: Error) => {
      Sentry.captureException(error);
      setShowNotification(true);
    },
    fetchPolicy: 'network-only',
  });

  return (
    <div className={styles.membershipDetails}>
      {data?.youthProfile && (
        <>
          <h1>{t('membershipDetails.title')}</h1>
          <p>{t('membershipDetails.text')}</p>
          <h2>{t('membershipDetails.profileInformation')}</h2>
          <div className={styles.fieldsGroup}>
            <LabeledValue label={t('profile.name')} value={getFullName(data)} />
            <LabeledValue
              label={t('profile.address')}
              value={getAddress(data, i18n.languages[0])}
            />
            <LabeledValue
              label={t('profile.email')}
              value={data.youthProfile.profile.primaryEmail?.email}
            />
            <LabeledValue
              label={t('profile.phone')}
              value={data.youthProfile.profile.primaryPhone?.phone}
            />
            <LabeledValue
              label={t('youthProfile.birthdate')}
              value={formatDate(data.youthProfile.birthDate)}
            />
            <LabeledValue
              label={t('registration.profileLanguage')}
              value={t(
                `LANGUAGE_OPTIONS.${data?.youthProfile?.profile?.language}`
              )}
            />
          </div>
          <h2>{t('membershipDetails.additionalInformation')}</h2>
          <div className={styles.fieldsGroup}>
            <LabeledValue
              label={t('youthProfile.school')}
              value={getSchool(data)}
            />
            <LabeledValue
              label={t('youthProfile.homeLanguages')}
              value={t(`LANGUAGE_OPTIONS.${data.youthProfile.languageAtHome}`)}
            />
          </div>
          {/*
          <h2>{t('membershipDetails.requiredPermissionsFromParent')}</h2>
          <strong className={styles.subHeading}>
            {t('youthProfile.photoUsage')}
          </strong>
          <p className={styles.paragraph}>
            {t('membershipDetails.photoUsageExplanation')}
          </p>
          <span className={styles.check}>{t('yes')}</span>
          */}
          <h2>{t('youthProfile.approverInfo')}</h2>
          <div className={styles.fieldsGroup}>
            <LabeledValue
              label={t('youthProfile.approverName')}
              value={`${data.youthProfile.approverFirstName} ${data.youthProfile.approverLastName}`}
            />
            <LabeledValue
              label={t('youthProfile.approverEmail')}
              value={data.youthProfile.approverEmail}
            />
            <LabeledValue
              label={t('youthProfile.approverPhone')}
              value={data.youthProfile.approverPhone}
            />
          </div>
        </>
      )}
      <Link to="/">
        <Button variant="secondary" className={styles.button}>
          {t('membershipDetails.returnToFront')}
        </Button>
      </Link>

      <Link to="/edit">
        <Button variant="secondary" className={styles.button}>
          {t('membershipDetails.edit')}
        </Button>
      </Link>

      <NotificationComponent
        show={showNotification}
        onClose={() => setShowNotification(false)}
      />
    </div>
  );
}

export default RegistrationInformation;
