import React from 'react';

import MembershipInformationPage from '../membership/information/MembershipInformationPage';
import useIsMembershipPending from '../membership/useIsMembershipPending';
import SentYouthProfilePage from '../youthProfile/sent/SentYouthProfilePage';
import toastNotification from '../../common/helpers/toastNotification/toastNotification';

function LandingPage() {
  const [isMembershipPending, loading] = useIsMembershipPending({
    onError: () => {
      toastNotification();
    },
  });

  if (loading) {
    return null;
  }

  return (
    <>
      {isMembershipPending ? (
        <SentYouthProfilePage />
      ) : (
        <MembershipInformationPage />
      )}
    </>
  );
}

export default LandingPage;
