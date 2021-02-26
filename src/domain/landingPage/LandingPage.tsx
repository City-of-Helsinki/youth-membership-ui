import React from 'react';

import { MembershipStatus } from '../../graphql/generatedTypes';
import toastNotification from '../../common/helpers/toastNotification/toastNotification';
import MembershipInformationPage from '../membership/information/MembershipInformationPage';
import useMembershipStatus from '../membership/useMembershipStatus';
import SentYouthProfilePage from '../youthProfile/sent/SentYouthProfilePage';

function LandingPage() {
  const [membershipStatus, loading] = useMembershipStatus({
    onError: () => {
      toastNotification();
    },
  });

  if (loading) {
    return null;
  }

  return (
    <>
      {membershipStatus === MembershipStatus.PENDING && (
        <SentYouthProfilePage />
      )}
      {membershipStatus !== MembershipStatus.PENDING && (
        <MembershipInformationPage />
      )}
    </>
  );
}

export default LandingPage;
