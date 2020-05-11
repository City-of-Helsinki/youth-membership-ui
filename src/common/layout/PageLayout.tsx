import React, { ReactNode, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { useMatomo } from '@datapunt/matomo-tracker-react';

import Header from '../header/Header';
import HostingBox from '../hostingBox/HostingBox';
import Footer from '../footer/Footer';
import styles from './PageLayout.module.css';
import PageWrapper from '../wrapper/PageWrapper';

type Props = {
  children: ReactNode;
  title?: string;
};

function PageLayout({ children, title = 'appName' }: Props) {
  const { t } = useTranslation();
  const { trackPageView } = useMatomo();

  const pageTitle =
    title !== 'appName' ? `${t(title)} - ${t('appName')}` : t('appName');

  useEffect(() => {
    trackPageView({
      documentTitle: pageTitle,
      href: window.location.href,
    });
  }, [pageTitle, trackPageView]);

  return (
    <PageWrapper>
      <div className={styles.background}>
        <Header />
        <HostingBox className={styles.hostingBox}>{children}</HostingBox>
        <Footer />
      </div>
    </PageWrapper>
  );
}

export default PageLayout;
