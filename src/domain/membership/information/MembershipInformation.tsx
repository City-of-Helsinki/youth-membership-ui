import React from 'react';
import { useTranslation } from 'react-i18next';
import { QRCode } from 'react-qrcode-logo';
import { Button } from 'hds-react';

import {
  MembershipInformation_myYouthProfile,
  MembershipInformation_myYouthProfile_profile,
  MembershipStatus,
} from '../../../graphql/generatedTypes';
import LinkButton from '../../../common/components/linkButton/LinkButton';
import convertDateToLocale from '../../../common/helpers/convertDateToLocale';
import MembershipPageLayout from '../MembershipPageLayout';
import Membership from '../MembershipUtility';

type MembershipExpiryTitleProps = {
  membershipExpirationDate: string;
  memberShipStatus: MembershipStatus;
  membershipRenewable: boolean;
};

function MembershipExpiryTitle({
  membershipExpirationDate,
  memberShipStatus,
  membershipRenewable,
}: MembershipExpiryTitleProps) {
  const { t } = useTranslation();

  const isRenewable = membershipRenewable;
  const isExpired = Membership.getIsExpired(memberShipStatus);
  const isActive = Membership.getIsActive(memberShipStatus);
  const isRenewing = Membership.getIsRenewing(memberShipStatus);
  const isPending = Membership.getIsPending(memberShipStatus);

  if (isExpired) {
    return <>{t('membershipInformation.status.title.membershipExpired')}</>;
  }

  if (isRenewable && isActive) {
    return (
      <>
        {t('membershipInformation.status.title.renewable', {
          date: membershipExpirationDate,
        })}
      </>
    );
  }

  if (isRenewing) {
    return (
      <>
        {t('membershipInformation.status.title.renewing', {
          date: membershipExpirationDate,
        })}
      </>
    );
  }

  if (isPending) {
    return <>{t('membershipInformation.status.title.pending')}</>;
  }

  // Membership is active
  return (
    <>
      {t('membershipInformation.validUntil', {
        date: membershipExpirationDate,
      })}
    </>
  );
}

type MembershipExpiryDescriptionProps = {
  membershipRenewable: boolean;
  memberShipStatus: MembershipStatus;
  birthday: string;
  approverEmail: string;
};

function MembershipExpiryDescription({
  membershipRenewable,
  memberShipStatus,
  birthday,
  approverEmail,
}: MembershipExpiryDescriptionProps) {
  const { t } = useTranslation();

  const isRenewable = membershipRenewable;
  const isExpired = Membership.getIsExpired(memberShipStatus);
  const isActive = Membership.getIsActive(memberShipStatus);
  const isRenewing = Membership.getIsRenewing(memberShipStatus);
  const isPending = Membership.getIsPending(memberShipStatus);
  const isUnderage = Membership.getIsUnderage(birthday);

  if (isRenewable && isActive && isUnderage) {
    return <>{t('membershipInformation.status.description.renewable')}</>;
  }

  if (isRenewing && isUnderage) {
    return (
      <>
        {t('membershipInformation.status.description.renewing', {
          email: approverEmail,
        })}
      </>
    );
  }

  if (isPending && isUnderage) {
    return (
      <>
        {t('membershipInformation.status.description.pending', {
          email: approverEmail,
        })}
      </>
    );
  }

  if (isExpired && isUnderage) {
    return <>{t('membershipInformation.status.description.expired')}</>;
  }

  return <></>;
}

type AdminLinkQrCodeProps = {
  membershipStatus: MembershipStatus;
  profileId: string;
};

function AdminLinkQrCode({
  membershipStatus,
  profileId,
}: AdminLinkQrCodeProps) {
  const adminUrl = Membership.getAdminUrl(profileId);
  const isVisible =
    Membership.getIsActive(membershipStatus) ||
    Membership.getIsRenewing(membershipStatus);

  if (!isVisible || !adminUrl) {
    return null;
  }

  return <QRCode size={175} value={adminUrl} />;
}

type RenewButtonProps = {
  onRenewMembership: () => void;
  label: string;
};

function RenewButton({ onRenewMembership, label }: RenewButtonProps) {
  return (
    <Button type="button" onClick={onRenewMembership} data-cy="renew">
      {label}
    </Button>
  );
}

type ResendButtonProps = {
  onResendConfirmationEmail: () => void;
};

function ResendButton({ onResendConfirmationEmail }: ResendButtonProps) {
  const { t } = useTranslation();

  return (
    <Button onClick={onResendConfirmationEmail}>
      {t('confirmSendingProfile.buttonText')}
    </Button>
  );
}

type MainActionButtonProps = {
  membershipRenewable: boolean;
  membershipStatus: MembershipStatus;
  onRenewMembership: () => void;
  onResendConfirmationEmail: () => void;
  birthday: string;
};

function MainActionButton({
  membershipRenewable,
  membershipStatus,
  onRenewMembership,
  onResendConfirmationEmail,
  birthday,
}: MainActionButtonProps) {
  const { t } = useTranslation();

  const isRenewable = membershipRenewable;
  const isPending = Membership.getIsPending(membershipStatus);
  const isRenewing = Membership.getIsRenewing(membershipStatus);
  const isUnderage = Membership.getIsUnderage(birthday);

  if (isRenewable && isUnderage) {
    return (
      <RenewButton
        onRenewMembership={onRenewMembership}
        label={t('membershipInformation.renewUnderage')}
      />
    );
  }

  if (isRenewable) {
    return (
      <RenewButton
        onRenewMembership={onRenewMembership}
        label={t('membershipInformation.renew')}
      />
    );
  }

  if (isPending || isRenewing) {
    return (
      <ResendButton onResendConfirmationEmail={onResendConfirmationEmail} />
    );
  }

  return null;
}

type SecondaryActionButtonProps = {
  membershipRenewable: boolean;
  membershipStatus: MembershipStatus;
};

function SecondaryActionButton({
  membershipRenewable,
  membershipStatus,
}: SecondaryActionButtonProps) {
  const { t } = useTranslation();

  const isRenewable = membershipRenewable;
  const isExpired = Membership.getIsExpired(membershipStatus);
  const isActive = Membership.getIsActive(membershipStatus);
  const isRenewing = Membership.getIsRenewing(membershipStatus);

  if ((isRenewable && !isExpired) || isActive || isRenewing) {
    return (
      <LinkButton
        path="/membership-details"
        component="Link"
        buttonText={t('membershipInformation.showProfileInformation')}
        variant="secondary"
      />
    );
  }

  return null;
}

type Props = {
  youthProfile: MembershipInformation_myYouthProfile;
  profile: MembershipInformation_myYouthProfile_profile;
  onRenewMembership: () => void;
  onResendConfirmationEmail: () => void;
};

function MembershipInformation({
  youthProfile,
  profile,
  onRenewMembership,
  onResendConfirmationEmail,
}: Props) {
  const membershipStatus = youthProfile.membershipStatus;
  const memberShipRenewable = youthProfile.renewable;
  const birthday = youthProfile.birthDate;
  const expirationLocaleDateString = convertDateToLocale(
    youthProfile.expiration
  );
  const profileFullName = Membership.getFullName(profile);

  return (
    <MembershipPageLayout
      profileFullName={profileFullName}
      membershipNumber={youthProfile.membershipNumber}
      qrCode={
        <AdminLinkQrCode
          membershipStatus={membershipStatus}
          profileId={profile.id}
        />
      }
      membershipExpiryTitle={
        <MembershipExpiryTitle
          membershipExpirationDate={expirationLocaleDateString}
          memberShipStatus={membershipStatus}
          membershipRenewable={memberShipRenewable}
        />
      }
      membershipExpiryDescription={
        <MembershipExpiryDescription
          memberShipStatus={membershipStatus}
          membershipRenewable={memberShipRenewable}
          birthday={birthday}
          approverEmail={youthProfile.approverEmail}
        />
      }
      mainActionButton={
        <MainActionButton
          membershipRenewable={memberShipRenewable}
          membershipStatus={membershipStatus}
          onRenewMembership={onRenewMembership}
          onResendConfirmationEmail={onResendConfirmationEmail}
          birthday={birthday}
        />
      }
      secondaryActionButton={
        <SecondaryActionButton
          membershipRenewable={memberShipRenewable}
          membershipStatus={membershipStatus}
        />
      }
    />
  );
}

export default MembershipInformation;
