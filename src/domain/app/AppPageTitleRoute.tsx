import React from 'react';
import { Helmet } from 'react-helmet-async';
import { Route, RouteProps } from 'react-router';
import { useTranslation } from 'react-i18next';

type Props = RouteProps & {
  pageTitle: string;
};

const AppPageTitleRoute = (props: Props) => {
  const { t } = useTranslation();

  return (
    <>
      <Helmet>
        <title>{t(props.pageTitle)}</title>
        <meta property="og:title" content={t(props.pageTitle)} />
      </Helmet>
      <Route {...props} />
    </>
  );
};

export default AppPageTitleRoute;
