import React, { useState } from 'react';
import { loader } from 'graphql.macro';
import { useQuery } from '@apollo/react-hooks';
import * as Sentry from '@sentry/browser';

import { MembershipDetails as MembershipDetailsData } from '../../../graphql/generatedTypes';
import PageContentWithHostingBox from '../../../common/components/layout/PageContentWithHostingBox';
import NotificationComponent from '../../../common/components/notification/NotificationComponent';
import MembershipDetails from './MembershipDetails';

const MEMBERSHIP_DETAILS = loader('../graphql/MembershipDetails.graphql');

function MembershipDetailsPage() {
  const [showNotification, setShowNotification] = useState(false);
  const { data, loading } = useQuery<MembershipDetailsData>(
    MEMBERSHIP_DETAILS,
    {
      onError: (error: Error) => {
        Sentry.captureException(error);
        setShowNotification(true);
      },
      fetchPolicy: 'network-only',
    }
  );

  return (
    <PageContentWithHostingBox
      isReady={!loading}
      title="membershipInformation.pageTitle"
    >
      {data && <MembershipDetails membershipDetailsData={data} />}
      <NotificationComponent
        show={showNotification}
        onClose={() => setShowNotification(false)}
      />
    </PageContentWithHostingBox>
  );
}

export default MembershipDetailsPage;
