import React, { useState } from 'react';

import MembershipInformationPage from '../membership/information/MembershipInformationPage';
import useIsMembershipPending from '../membership/useIsMembershipPending';
import SentYouthProfilePage from '../youthProfile/sent/SentYouthProfilePage';
import NotificationComponent from '../../common/components/notification/NotificationComponent';

function LandingPage() {
  const [showNotification, setShowNotification] = useState(false);
  const [isMembershipPending, loading] = useIsMembershipPending({
    onError: () => {
      setShowNotification(true);
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
      <NotificationComponent
        show={showNotification}
        onClose={() => setShowNotification(false)}
      />
    </>
  );
}

export default LandingPage;
