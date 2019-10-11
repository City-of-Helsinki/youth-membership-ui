import React from 'react';
import { RouteChildrenProps } from 'react-router';

import userManager from '../oidc/userManager';
import PageLayout from '../common/layout/PageLayout';

type Props = RouteChildrenProps & {};

function Home(props: Props) {
  return (
    <PageLayout>
      <button onClick={() => userManager.signinRedirect()}>
        Authenticate using tunnistamo
      </button>
    </PageLayout>
  );
}

export default Home;
