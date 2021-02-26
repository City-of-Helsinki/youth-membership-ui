import React, { ReactElement } from 'react';

import { MembershipStatus } from '../../graphql/generatedTypes';
import toastNotification from '../../common/helpers/toastNotification/toastNotification';
import MembershipInformationPage from '../membership/information/MembershipInformationPage';
import useMembershipStatus from '../membership/useMembershipStatus';
import SentYouthProfilePage from '../youthProfile/sent/SentYouthProfilePage';

type MembershipStatusProps = {
  status: MembershipStatus;
  pending: ReactElement;
  active: ReactElement;
};

function MemberShipStatusResolver({
  status,
  pending,
  active,
}: MembershipStatusProps) {
  if (status === MembershipStatus.PENDING) {
    return pending;
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
      active={<MembershipInformationPage />}
    />
  );
}

export default LandingPage;
