import React from 'react';
import { useTranslation } from 'react-i18next';
import { Helmet } from 'react-helmet-async';

function AppMeta() {
  const { i18n } = useTranslation();

  return (
    <Helmet>
      <html lang={i18n.languages[0]} />
    </Helmet>
  );
}

export default AppMeta;
