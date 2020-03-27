import React, { useState } from 'react';
import { useQuery, useMutation } from '@apollo/react-hooks';
import { loader } from 'graphql.macro';
import { Link } from 'react-router-dom';
import { IconAngleRight } from 'hds-react';
import { useTranslation } from 'react-i18next';
import { QRCode } from 'react-qrcode-logo';
import * as Sentry from '@sentry/browser';

import Button from '../../../../common/button/Button';
import NotificationComponent from '../../../../common/notification/NotificationComponent';
import {
  RenewMyYouthProfile as RenewMyYouthProfileData,
  RenewMyYouthProfileVariables,
  MembershipInformation as MembershipInformationTypes,
} from '../../../../graphql/generatedTypes';
import styles from './MembershipInformation.module.css';
import getFullName from '../../helpers/getFullName';
import convertDateToLocale from '../../helpers/convertDateToLocale';

const MEMBERSHIP_INFORMATION = loader(
  '../../graphql/MembershipInformation.graphql'
);
const RENEW_MEMBERSHIP = loader('../../graphql/RenewMyYouthProfile.graphql');

type Props = {};

function MembershipInformation(props: Props) {
  const [showNotification, setShowNotification] = useState(false);
  const [successNotification, setSuccessNotification] = useState(false);
  const { t } = useTranslation();

  const { data, loading } = useQuery<MembershipInformationTypes>(
    MEMBERSHIP_INFORMATION,
    {
      onError: (error: Error) => {
        Sentry.captureException(error);
        setShowNotification(true);
      },
    }
  );
  const [renewMembership] = useMutation<
    RenewMyYouthProfileData,
    RenewMyYouthProfileVariables
  >(RENEW_MEMBERSHIP, { refetchQueries: ['MembershipInformation'] });

  const validUntil = convertDateToLocale(data?.youthProfile?.expiration);

  const handleRenewMembership = () => {
    const variables: RenewMyYouthProfileVariables = {
      input: {},
    };

    renewMembership({ variables })
      .then(result => setSuccessNotification(!!result.data))
      .catch((error: Error) => {
        Sentry.captureException(error);
        setShowNotification(true);
      });
  };

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
            value="https://profiili-api.test.kuva.hel.ninja/admin/"
          />
           
          {data?.youthProfile?.renewable && (
            <Button
              type="button"
              onClick={handleRenewMembership}
              className={styles.renew}
            >
              {t('membershipInformation.renew')}
            </Button>
          )}
          <Link to="/membership-details" className={styles.detailsLink}>
            {t('membershipInformation.showProfileInformation')}
            <IconAngleRight className={styles.icon} />
          </Link>
          <NotificationComponent
            show={showNotification}
            onClose={() => setShowNotification(false)}
          />
          <NotificationComponent
            show={successNotification}
            onClose={() => setSuccessNotification(false)}
            type="success"
            labelText={t('membershipInformation.renewSuccessTitle')}
          >
            {t('membershipInformation.renewSuccessMessage')}
          </NotificationComponent>
        </React.Fragment>
      )}
    </div>
  );
}

export default MembershipInformation;
