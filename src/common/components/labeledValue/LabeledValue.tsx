import React from 'react';

import styles from './LabeledValue.module.css';

type Props = {
  label: string;
  value: string | null | undefined;
  noMargin?: boolean;
};

function LabeledValue({ label, value, noMargin = false }: Props) {
  const className = [styles.wrapper, noMargin ? styles.noMargin : null]
    .filter(item => item)
    .join(' ');

  return (
    <div className={className}>
      <strong className={styles.label}>{label}</strong>
      <span className={styles.value}>{value || '–'}</span>
    </div>
  );
}

export default LabeledValue;
