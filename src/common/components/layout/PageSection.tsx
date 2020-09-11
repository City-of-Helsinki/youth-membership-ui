import React, { ReactNode } from 'react';

import styles from './pageSection.module.css';

interface Props {
  children: ReactNode;
  className?: string;
}

function YouthProfileFormSection({
  className: additionalClassName,
  ...rest
}: Props) {
  const className = [styles.pageSection, additionalClassName]
    .filter(item => item)
    .join(' ');

  return <div className={className} {...rest} />;
}

export default YouthProfileFormSection;
