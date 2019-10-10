import React from 'react';
import { RouteProps } from 'react-router';

import PageLayout from '../common/layout/PageLayout';

type Props = RouteProps & {};

function Home(props: Props) {
  return <PageLayout>Home</PageLayout>;
}

export default Home;
