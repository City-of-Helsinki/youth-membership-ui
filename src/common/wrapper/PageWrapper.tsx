import React, { PropsWithChildren } from 'react';
import { HelmetProvider, Helmet } from 'react-helmet-async';
import { useTranslation } from 'react-i18next';

type Props = PropsWithChildren<{}>;

function PageWrapper(props: Props) {
  const { t, i18n } = useTranslation();
  return (
    <HelmetProvider>
      <Helmet>
        <html lang={i18n.languages[0]} />
        <title>{t('appName')}</title>
        <meta name="description" content={t('login.helpText')} />
        <meta property="og:title" content={t('appName')} />
        <meta property="og:description" content={t('login.helpText')} />
      </Helmet>
      {props.children}
    </HelmetProvider>
  );
}

export default PageWrapper;
