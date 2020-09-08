import React, { ReactNode } from 'react';

import Header, { HeaderVariant } from './header/Header';
import Footer from './footer/Footer';
import PageWrapper from '../wrapper/PageWrapper';
import styles from './PageLayout.module.css';

type Props = {
  children: ReactNode;
  variant?: HeaderVariant;
};

function PageLayout({ children, variant }: Props) {
  return (
    <PageWrapper>
      <div className={styles.layout}>
        <div className={styles.background} />
        <Header variant={variant} />
        {children}
        <Footer />
      </div>
    </PageWrapper>
  );
}

export default PageLayout;
