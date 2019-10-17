import React from 'react';
import { RouteChildrenProps } from 'react-router';

import authenticate from '../oidc/authenticate';
import PageLayout from '../common/layout/PageLayout';

type Props = RouteChildrenProps & {};

function Home(props: Props) {
  return (
    <PageLayout>
      <button onClick={authenticate}>Authenticate using tunnistamo</button>
    </PageLayout>
  );
}

export default Home;
