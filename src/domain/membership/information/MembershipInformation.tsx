import React from 'react';
import { useTranslation } from 'react-i18next';
import { QRCode } from 'react-qrcode-logo';
import { Button } from 'hds-react';

import { MembershipInformation as MembershipInformationTypes } from '../../../graphql/generatedTypes';
import LinkButton from '../../../common/components/linkButton/LinkButton';
import convertDateToLocale from '../../../common/helpers/convertDateToLocale';
import MembershipPageLayout from '../MembershipPageLayout';
import Membership from '../MembershipUtility';

type Props = {
  onRenewMembership: () => void;
  membershipInformationTypes: MembershipInformationTypes;
};

function MembershipInformation({
  onRenewMembership,
  membershipInformationTypes,
}: Props) {
  const { t } = useTranslation();

  const youthProfile = membershipInformationTypes?.myYouthProfile;
  const profile = membershipInformationTypes?.myYouthProfile?.profile;

  if (!youthProfile || !profile) {
    return null;
  }

  const validUntil = convertDateToLocale(youthProfile.expiration);
  const adminUrl = Membership.getAdminUrl(profile.id);
  const profileFullName = Membership.getFullName(profile);

  return (
    <MembershipPageLayout
      profileFullName={profileFullName}
      membershipNumber={youthProfile.membershipNumber}
      qrCode={adminUrl ? <QRCode size={175} value={adminUrl} /> : undefined}
      membershipExpiryTitle={t('membershipInformation.validUntil', {
        date: validUntil,
      })}
      mainActionButton={
        <Button type="button" onClick={onRenewMembership} data-cy="renew">
          {t('membershipInformation.renew')}
        </Button>
      }
      secondaryActionButton={
        <LinkButton
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
