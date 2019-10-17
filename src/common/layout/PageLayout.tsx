import React, { ReactNode } from 'react';

import Header from '../header/Header';
import HostingBox from '../hostingBox/HostingBox';
import styles from './PageLayout.module.css';

type Props = {
  children: ReactNode;
};

function PageLayout(props: Props) {
  return (
    <div>
      <Header />
      <HostingBox className={styles.hostingBox}>{props.children}</HostingBox>
    </div>
  );
}

export default PageLayout;
