import React, { ReactNode } from 'react';

import styles from './pageSection.module.css';

interface Props {
  children: ReactNode;
}

function YouthProfileFormSection(props: Props) {
  return <div className={styles.pageSection} {...props} />;
}

export default YouthProfileFormSection;
