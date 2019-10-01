import React, {ReactNode} from 'react';

import Header from '../header/Header';

type Props = {
  children: ReactNode;
};

function PageLayout(props: Props) {
  return (
    <>
      <Header/>
      {props.children}
    </>
  );
};

export default PageLayout;
