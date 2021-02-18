import React from 'react';
import { loader } from 'graphql.macro';
import { useQuery } from '@apollo/client';
import * as Sentry from '@sentry/browser';

import { MembershipDetails as MembershipDetailsData } from '../../../graphql/generatedTypes';
import PageContent from '../../../common/components/layout/PageContent';
import toastNotification from '../../../common/helpers/toastNotification/toastNotification';
import MembershipDetails from './MembershipDetails';

const MEMBERSHIP_DETAILS = loader('../graphql/MembershipDetails.graphql');

function MembershipDetailsPage() {
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
        toastNotification();
      },
      fetchPolicy: 'network-only',
    }
  );

  return (
    <PageContent isReady={!loading} title="membershipDetails.title">
      {data && <MembershipDetails membershipDetailsData={data} />}
    </PageContent>
  );
}

export default MembershipDetailsPage;
