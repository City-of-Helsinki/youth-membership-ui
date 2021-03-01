import React from 'react';
import { useTranslation } from 'react-i18next';
import { QRCode } from 'react-qrcode-logo';
import { Button } from 'hds-react';

import { MembershipInformation as MembershipInformationTypes } from '../../../graphql/generatedTypes';
import LinkButton from '../../../common/components/linkButton/LinkButton';
import convertDateToLocale from '../../../common/helpers/convertDateToLocale';
import getFullName from '../helpers/getFullName';
import MembershipPageLayout from '../MembershipPageLayout';
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
    membershipInformationTypes?.myYouthProfile?.expiration
  );

  if (!membershipInformationTypes?.myYouthProfile?.membershipNumber) {
    return null;
  }

  return (
    <MembershipPageLayout
      profileFullName={getFullName(membershipInformationTypes)}
      membershipNumber={
        membershipInformationTypes.myYouthProfile.membershipNumber
      }
      qrCode={
        <QRCode
          size={175}
          // eslint-disable-next-line max-len
          value={`${process.env.REACT_APP_ADMIN_URL}youthProfiles/${membershipInformationTypes.myYouthProfile?.profile?.id}/show`}
        />
      }
      membershipExpiryTitle={t('membershipInformation.validUntil', {
        date: validUntil,
      })}
      mainActionButton={
        <Button
          type="button"
          onClick={onRenewMembership}
          className={styles.button}
          data-cy="renew"
        >
          {t('membershipInformation.renew')}
        </Button>
      }
      secondaryActionButton={
        <LinkButton
          className={styles.button}
          path="/membership-details"
          component="Link"
          buttonText={t('membershipInformation.showProfileInformation')}
          variant="secondary"
        />
      }
    />
  );
}

export default MembershipInformation;
