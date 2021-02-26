import React, { ReactElement } from 'react';

import { MembershipStatus } from '../../graphql/generatedTypes';
import toastNotification from '../../common/helpers/toastNotification/toastNotification';
import MembershipInformationPage from '../membership/information/MembershipInformationPage';
import useMembershipStatus from '../membership/useMembershipStatus';
import SentYouthProfilePage from '../youthProfile/sent/SentYouthProfilePage';

type MembershipStatusProps = {
  status: MembershipStatus;
  pending: ReactElement;
  expired: ReactElement;
  renewing: ReactElement;
  active: ReactElement;
};

function MemberShipStatusResolver({
  status,
  pending,
  expired,
  renewing,
  active,
}: MembershipStatusProps) {
  if (status === MembershipStatus.PENDING) {
    return pending;
  }

  if (status === MembershipStatus.EXPIRED) {
    return expired;
  }

  if (status === MembershipStatus.RENEWING) {
    return renewing;
  }

  return active;
}

function LandingPage() {
  const [membershipStatus, loading] = useMembershipStatus({
    onError: () => {
      toastNotification();
    },
  });

  if (loading || !membershipStatus) {
    return null;
  }

  return (
    <MemberShipStatusResolver
      status={membershipStatus}
      pending={<SentYouthProfilePage />}
      expired={<SentYouthProfilePage />}
      renewing={<SentYouthProfilePage />}
      active={<MembershipInformationPage />}
    />
  );
}

export default LandingPage;
