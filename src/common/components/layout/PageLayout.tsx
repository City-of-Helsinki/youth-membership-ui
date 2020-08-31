import React, { ReactNode } from 'react';

import Header from './header/Header';
import Footer from './footer/Footer';
import PageWrapper from '../wrapper/PageWrapper';
import styles from './PageLayout.module.css';

type Props = {
  children: ReactNode;
};

function PageLayout({ children }: Props) {
  return (
    <PageWrapper>
      <div className={styles.layout}>
        <div className={styles.background} />
        <Header />
        {children}
        <Footer />
      </div>
    </PageWrapper>
  );
}

export default PageLayout;
