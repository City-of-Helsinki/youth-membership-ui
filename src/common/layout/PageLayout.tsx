import React, { ReactNode } from 'react';
import classNames from 'classnames';
import { HelmetProvider, Helmet } from 'react-helmet-async';
import { useTranslation } from 'react-i18next';

import Header from '../header/Header';
import HostingBox from '../hostingBox/HostingBox';
import Footer from '../footer/Footer';
import styles from './PageLayout.module.css';

type Props = {
  children: ReactNode;
  background: 'youth' | 'adult';
};

function PageLayout(props: Props) {
  const { t, i18n } = useTranslation();

  return (
    <HelmetProvider>
      <Helmet>
        <html lang={i18n.languages[0]} />
        <title>{t('appName')}</title>
        <meta name="description" content={t('login.helpText')} />
      </Helmet>
      <div
        className={classNames(
          styles.background,
          props.background === 'youth'
            ? styles.youthBackground
            : styles.adultBackground
        )}
      >
        <Header />
        <HostingBox className={styles.hostingBox}>{props.children}</HostingBox>
        <Footer />
      </div>
    </HelmetProvider>
  );
}

export default PageLayout;
