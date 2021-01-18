import React from 'react';

import AppPageTitleRoute from './AppPageTitleRoute';
import { RouteProps } from 'react-router';

type Props = RouteProps & {
  pageTitle: string;
};

const AppNonProfileRoute = (props: Props) => {
  return <AppPageTitleRoute {...props} />;
};

export default AppNonProfileRoute;
