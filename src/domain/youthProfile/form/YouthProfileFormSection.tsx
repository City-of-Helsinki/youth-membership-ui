import React, { ReactNode } from 'react';

import styles from './youthProfileFormSection.module.css';

interface Props {
  children: ReactNode;
}

function YouthProfileFormSection(props: Props) {
  return <div className={styles.youthProfileFormSection} {...props} />;
}

export default YouthProfileFormSection;
