import React, { ReactNode } from 'react';
import { Helmet } from 'react-helmet-async';
import { useTranslation } from 'react-i18next';

type Props = {
  children?: ReactNode;
};

function PageWrapper(props: Props) {
  const { t } = useTranslation();

  return (
    <>
      <Helmet>
        <meta name="description" content={t('meta.description')} />
        <meta property="og:description" content={t('meta.description')} />
      </Helmet>
      {props.children}
    </>
  );
}

export default PageWrapper;
