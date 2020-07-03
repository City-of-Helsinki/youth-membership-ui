import React from 'react';
import { useTranslation } from 'react-i18next';
import { QRCode } from 'react-qrcode-logo';
import { Button } from 'hds-react';

import { MembershipInformation as MembershipInformationTypes } from '../../../graphql/generatedTypes';
import LinkButton from '../../../common/components/linkButton/LinkButton';
import getFullName from '../helpers/getFullName';
import convertDateToLocale from '../../../common/helpers/convertDateToLocale';
import styles from './membershipInformation.module.css';

interface Props {
  onRenewMembership: () => void;
  membershipInformationTypes: MembershipInformationTypes;
}

function MembershipInformation({
  onRenewMembership,
  membershipInformationTypes,
}: Props) {
  const { t } = useTranslation();

  const validUntil = convertDateToLocale(
    membershipInformationTypes?.youthProfile?.expiration
  );

  return (
    <div className={styles.container}>
      {membershipInformationTypes && (
        <React.Fragment>
          <h1>{getFullName(membershipInformationTypes)}</h1>
          <h3>
            {t('membershipInformation.title', {
              number:
                membershipInformationTypes?.youthProfile?.membershipNumber,
            })}
          </h3>
          <p className={styles.validUntil}>
            {t('membershipInformation.validUntil', { date: validUntil })}
          </p>
          <QRCode
            size={175}
            value="https://profiili-api.test.kuva.hel.ninja/admin/"
          />
           
          {membershipInformationTypes?.youthProfile?.renewable && (
            <Button
              type="button"
              onClick={onRenewMembership}
              className={styles.button}
              data-cy="renew"
            >
              {t('membershipInformation.renew')}
            </Button>
          )}
          <LinkButton
            className={styles.button}
            path="/membership-details"
            component="Link"
            buttonText={t('membershipInformation.showProfileInformation')}
            variant="secondary"
          />
        </React.Fragment>
      )}
    </div>
  );
}

export default MembershipInformation;
