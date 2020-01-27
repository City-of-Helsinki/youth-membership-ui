import React, { useState } from 'react';
import { useQuery } from '@apollo/react-hooks';
import { loader } from 'graphql.macro';
import { Link } from 'react-router-dom';
import { MembershipDetails } from '../../../../graphql/generatedTypes';
import { IconAngleRight } from 'hds-react';
import { useTranslation } from 'react-i18next';

import styles from './MembershipInformation.module.css';
import getFullName from '../../helpers/getFullName';
import convertDateToLocale from '../../helpers/convertDateToLocale';
import NotificationComponent from '../../../../common/notification/NotificationComponent';

const MEMBERSHIP_DETAILS = loader('../../graphql/MembershipDetails.graphql');

type Props = {
  expires: string;
};

function MembershipInformation(props: Props) {
  const { data, loading } = useQuery<MembershipDetails>(MEMBERSHIP_DETAILS);
  const [error, setError] = useState(true);
  const { t } = useTranslation();
  const validUntil = convertDateToLocale(props.expires);

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

          <p>{t('membershipInformation.validUntil', { date: validUntil })}</p>

          <Link to="/membership-details" className={styles.detailsLink}>
            {t('membershipInformation.showProfileInformation')}
            <IconAngleRight className={styles.icon} />
          </Link>

          <NotificationComponent show={error} type="error" labelText="Testi">
            <p>Testii</p>
          </NotificationComponent>
        </React.Fragment>
      )}
    </div>
  );
}

export default MembershipInformation;
