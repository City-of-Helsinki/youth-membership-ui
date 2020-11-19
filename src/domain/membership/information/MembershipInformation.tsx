import React from 'react';
import { useTranslation } from 'react-i18next';
import { QRCode } from 'react-qrcode-logo';
import { Button } from 'hds-react';

import { MembershipInformation as MembershipInformationTypes } from '../../../graphql/generatedTypes';
import LinkButton from '../../../common/components/linkButton/LinkButton';
import convertDateToLocale from '../../../common/helpers/convertDateToLocale';
import getFullName from '../helpers/getFullName';
import styles from './membershipInformation.module.css';

const feedbackFormLink =
  // eslint-disable-next-line max-len
  'https://docs.google.com/forms/d/e/1FAIpQLSdqw2Lq3qooEeRdgr0sV0-Wv-4XcV7IZVzq1HuWoLRa2M7tEg/viewform?usp=pp_url&entry.1982410290=Nuorten+j%C3%A4senkortti';

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
            // eslint-disable-next-line max-len
            value={`${process.env.REACT_APP_ADMIN_URL}youthProfiles/${membershipInformationTypes.youthProfile?.profile.id}/show`}
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
          <LinkButton
            className={styles.button}
            path={feedbackFormLink}
            component="a"
            buttonText={t('feedback.giveFeedback.label')}
            variant="secondary"
          />
        </React.Fragment>
      )}
    </div>
  );
}

export default MembershipInformation;
