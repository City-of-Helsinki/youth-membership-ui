import React, { ReactNode } from 'react';

import styles from './youthProfileFormGrid.module.css';

type Props = {
  children: ReactNode;
  verticalSpace?: 'default' | 'small';
};

function YouthProfileFormGrid({ children, verticalSpace = 'default' }: Props) {
  return (
    <div
      className={[styles.formGrid, styles[`vertical-${verticalSpace}`]]
        .filter(item => item)
        .join(' ')}
    >
      {children}
    </div>
  );
}

export default YouthProfileFormGrid;
