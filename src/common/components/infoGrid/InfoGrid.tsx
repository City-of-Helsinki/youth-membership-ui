import React, { ReactNode } from 'react';

import styles from './infoGrid.module.css';

type Props = {
  className?: string;
  children: ReactNode;
};

function InfoGrid({ className, ...rest }: Props) {
  return (
    <div
      {...rest}
      className={[styles.grid, className].filter(item => item).join(' ')}
    />
  );
}

export default InfoGrid;
