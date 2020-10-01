import React, { PropsWithChildren } from 'react';
import { Helmet } from 'react-helmet-async';
import { useTranslation } from 'react-i18next';

type Props = PropsWithChildren<{}>;

function PageWrapper(props: Props) {
  const { t } = useTranslation();
  return (
    <>
      <Helmet>
        <title>{t('appName')}</title>
        <meta name="description" content={t('meta.description')} />
        <meta property="og:title" content={t('appName')} />
        <meta property="og:description" content={t('meta.description')} />
      </Helmet>
      {props.children}
    </>
  );
}

export default PageWrapper;
