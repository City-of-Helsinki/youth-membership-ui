import React from 'react';

import PageLayout from '../../../common/components/layout/PageLayout';
import MembershipInformation from './MembershipInformation';

function MembershipInformationPage() {
  return (
    <PageLayout title="membershipDetails.title">
      <MembershipInformation />
    </PageLayout>
  );
}

export default MembershipInformationPage;
