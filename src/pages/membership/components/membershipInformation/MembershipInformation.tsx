import React, { useState } from 'react';
import { useQuery } from '@apollo/react-hooks';
import { loader } from 'graphql.macro';
import { Link } from 'react-router-dom';
import { IconAngleRight } from 'hds-react';
import { useTranslation } from 'react-i18next';
import { QRCode } from 'react-qrcode-logo';

import NotificationComponent from '../../../../common/notification/NotificationComponent';
import { MembershipDetails } from '../../../../graphql/generatedTypes';
import styles from './MembershipInformation.module.css';
import getFullName from '../../helpers/getFullName';
import convertDateToLocale from '../../helpers/convertDateToLocale';

const MEMBERSHIP_DETAILS = loader('../../graphql/MembershipDetails.graphql');

type Props = {
  expirationDate: string;
};

function MembershipInformation(props: Props) {
  const [showNotification, setShowNotification] = useState(false);

  const { data, loading } = useQuery<MembershipDetails>(MEMBERSHIP_DETAILS, {
    onError: () => setShowNotification(true),
  });
  const { t } = useTranslation();
  const validUntil = convertDateToLocale(props.expirationDate);

  return (
    <div className={styles.container}>
      {!loading && (
        <React.Fragment>
          <h1>{getFullName(data)}</h1>
          <h3>
            {t('membershipInformation.title', {
              number: data?.youthProfile?.membershipNumber,
            })}
          </h3>

          <p className={styles.validUntil}>
            {t('membershipInformation.validUntil', { date: validUntil })}
          </p>

          <QRCode
            size={175}
            value="https://helsinkiprofile.test.kuva.hel.ninja/admin/"
          />

          <Link to="/membership-details" className={styles.detailsLink}>
            {t('membershipInformation.showProfileInformation')}
            <IconAngleRight className={styles.icon} />
          </Link>

          <NotificationComponent
            show={showNotification}
            onClose={() => setShowNotification(false)}
          />
        </React.Fragment>
      )}
    </div>
  );
}

export default MembershipInformation;
