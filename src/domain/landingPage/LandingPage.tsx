import React from 'react';
import { useQuery } from '@apollo/client';
import { loader } from 'graphql.macro';

import toastNotification from '../../common/helpers/toastNotification/toastNotification';
import MembershipInformationPage from '../membership/information/MembershipInformationPage';
import SentYouthProfilePage from '../youthProfile/sent/SentYouthProfilePage';

const APPROVED_TIME = loader('./YouthProfileApprovedTime.graphql');

function LandingPage() {
  const { data, loading } = useQuery(APPROVED_TIME, {
    onError: () => {
      toastNotification();
    },
  });

  if (loading && !data) {
    return null;
  }

  const hasBeenApproved = data.myYouthProfile.approvedTime;

  return hasBeenApproved ? (
    <MembershipInformationPage />
  ) : (
    <SentYouthProfilePage />
  );
}

export default LandingPage;
