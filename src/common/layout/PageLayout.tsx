import React, { ReactNode } from 'react';
import classNames from 'classnames';

import Header from '../header/Header';
import HostingBox from '../hostingBox/HostingBox';
import Footer from '../footer/Footer';
import styles from './PageLayout.module.css';

type Props = {
  children: ReactNode;
  background: 'youth' | 'adult';
};

function PageLayout(props: Props) {
  return (
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
  );
}

export default PageLayout;
