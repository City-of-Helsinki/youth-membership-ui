import React from 'react';

import PageLayout from '../../../common/components/layout/PageLayout';
import MembershipDetails from './MembershipDetails';

function MembershipDetailsPage() {
  return (
    <PageLayout title="membershipInformation.pageTitle">
      <MembershipDetails />
    </PageLayout>
  );
}

export default MembershipDetailsPage;
