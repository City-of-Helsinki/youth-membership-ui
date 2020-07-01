import React from 'react';

import PageContentWithHostingBox from '../../../common/components/layout/PageContentWithHostingBox';
import SentYouthProfile from './SentYouthProfile';

function SentYouthProfilePage() {
  return (
    <PageContentWithHostingBox title="confirmSendingProfile.pageTitle">
      <SentYouthProfile />
    </PageContentWithHostingBox>
  );
}

export default SentYouthProfilePage;
