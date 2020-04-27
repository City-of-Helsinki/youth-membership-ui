import React, { ReactNode, useEffect } from 'react';
import classNames from 'classnames';
import { HelmetProvider, Helmet } from 'react-helmet-async';
import { useTranslation } from 'react-i18next';
import { useMatomo } from '@datapunt/matomo-tracker-react';

import Header from '../header/Header';
import HostingBox from '../hostingBox/HostingBox';
import Footer from '../footer/Footer';
import styles from './PageLayout.module.css';

type Props = {
  children: ReactNode;
  title?: string;
  background: 'youth' | 'adult';
};

function PageLayout({ children, title = 'appName', background }: Props) {
  const { t, i18n } = useTranslation();
  const { trackPageView } = useMatomo();

  const pageTitle =
    title !== 'appName' ? `${t(title)} - ${t('appName')}` : t('appName');

  useEffect(() => {
    trackPageView({
      documentTitle: pageTitle,
      href: window.location.href,
    });
  });

  return (
    <HelmetProvider>
      <Helmet>
        <html lang={i18n.languages[0]} />
        <title>{t('appName')}</title>
        <meta name="description" content={t('login.helpText')} />
        <meta property="og:title" content={t('appName')} />
        <meta property="og:description" content={t('login.helpText')} />
      </Helmet>
      <div
        className={classNames(
          styles.background,
          background === 'youth'
            ? styles.youthBackground
            : styles.adultBackground
        )}
      >
        <Header />
        <HostingBox className={styles.hostingBox}>{children}</HostingBox>
        <Footer />
      </div>
    </HelmetProvider>
  );
}

export default PageLayout;
