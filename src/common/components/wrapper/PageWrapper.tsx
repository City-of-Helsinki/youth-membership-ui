import React, { PropsWithChildren } from 'react';
import { Helmet } from 'react-helmet-async';
import { useTranslation } from 'react-i18next';
import { useLocation } from 'react-router';
import { useSelector } from 'react-redux';

import { isAuthenticatedSelector } from '../../../domain/auth/redux';

type Props = PropsWithChildren<{}>;

function PageWrapper(props: Props) {
  const { t } = useTranslation();
  const { pathname } = useLocation();
  const user = useSelector(isAuthenticatedSelector);

  const getPageTitle = () => {
    switch (pathname) {
      case '/':
        if (user) return 'membershipInformation.pageTitle';
        else return 'login.pageTitle';
      case '/create':
        return 'registration.pageTitle';
      case '/membership-details':
        return 'membershipDetails.title';
      case '/edit':
        return 'edit.pageTitle';
      default:
        return 'appName';
    }
  };

  return (
    <>
      <Helmet>
        <title>{t(getPageTitle())}</title>
        <meta name="description" content={t('meta.description')} />
        <meta property="og:title" content={t(getPageTitle())} />
        <meta property="og:description" content={t('meta.description')} />
      </Helmet>
      {props.children}
    </>
  );
}

export default PageWrapper;
