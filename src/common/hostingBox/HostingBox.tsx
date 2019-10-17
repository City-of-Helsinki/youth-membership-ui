import React from 'react';

import styles from './HostingBox.module.css';

type Props = {
  children: React.ReactNode;
  className: string;
};

function HostingBox(props: Props) {
  return (
    <div className={props.className}>
      <div className={styles.hostingBox}>{props.children}</div>
    </div>
  );
}

export default HostingBox;
