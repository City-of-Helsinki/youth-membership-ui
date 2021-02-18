import React from 'react';
import { Helmet } from 'react-helmet-async';
import { Route, RouteProps } from 'react-router';
import { useTranslation } from 'react-i18next';

type Props = RouteProps & {
  pageTitle: string;
};

const AppPageTitleRoute = ({ pageTitle, ...rest }: Props) => {
  const { t } = useTranslation();

  return (
    <>
      <Helmet>
        <title>{t(pageTitle)}</title>
        <meta property="og:title" content={t(pageTitle)} />
      </Helmet>
      <Route {...rest} />
    </>
  );
};

export default AppPageTitleRoute;
