import React, { ReactNode } from 'react';

import styles from './infoGrid.module.css';

type Props = {
  className?: string;
  children: ReactNode;
};

function InfoGridRow({ className, ...rest }: Props) {
  return (
    <div
      {...rest}
      className={[styles.gridRow, className].filter(item => item).join(' ')}
    />
  );
}

export default InfoGridRow;
