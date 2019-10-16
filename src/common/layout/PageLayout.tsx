import React, { ReactNode } from 'react';

import Header from '../header/Header';
import HostingBox from '../hostingBox/HostingBox';

type Props = {
  children: ReactNode;
};

function PageLayout(props: Props) {
  return (
    <div>
      <Header />
      <HostingBox />
    </div>
  );
}

export default PageLayout;
