import React, { ReactNode } from 'react';

import HostingBox from '../hostingBox/HostingBox';
import PageContent from './PageContent';
import styles from './pageContentWithHostingBox.module.css';

interface Props {
  children: ReactNode;
  title?: string;
  isReady?: boolean;
}

function PageContentWithHostingBox({ children, ...rest }: Props) {
  return (
    <PageContent {...rest}>
      <HostingBox className={styles.hostingBox}>{children}</HostingBox>
    </PageContent>
  );
}

export default PageContentWithHostingBox;
