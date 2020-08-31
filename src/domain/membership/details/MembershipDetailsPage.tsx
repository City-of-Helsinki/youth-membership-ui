import React, { useState } from 'react';
import { loader } from 'graphql.macro';
import { useQuery } from '@apollo/react-hooks';
import * as Sentry from '@sentry/browser';

import { MembershipDetails as MembershipDetailsData } from '../../../graphql/generatedTypes';
import PageContent from '../../../common/components/layout/PageContent';
import NotificationComponent from '../../../common/components/notification/NotificationComponent';
import MembershipDetails from './MembershipDetails';

const MEMBERSHIP_DETAILS = loader('../graphql/MembershipDetails.graphql');

function MembershipDetailsPage() {
  const [showNotification, setShowNotification] = useState(false);
  const { data, loading } = useQuery<MembershipDetailsData>(
    MEMBERSHIP_DETAILS,
    {
      onError: (error: Error) => {
        // Without this console log, errors will fail when the CI env
        // variable is set to true. I was not able to understand the
        // underlying cause.
        // eslint-disable-next-line no-console
        console.log(error);
        Sentry.captureException(error);
        setShowNotification(true);
      },
      fetchPolicy: 'network-only',
    }
  );

  return (
    <PageContent isReady={!loading} title="membershipInformation.pageTitle">
      {data && <MembershipDetails membershipDetailsData={data} />}
      <NotificationComponent
        show={showNotification}
        onClose={() => setShowNotification(false)}
      />
    </PageContent>
  );
}

export default MembershipDetailsPage;
