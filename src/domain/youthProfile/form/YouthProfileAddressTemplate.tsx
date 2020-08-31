import React, { ReactNode } from 'react';

import YouthProfileFormGrid from './YouthProfileFormGrid';
import styles from './youthProfileAddressTemplate.module.css';

type Props = {
  address: ReactNode;
  postalCode: ReactNode;
  city: ReactNode;
};

function YouthProfileAddressTemplate({ address, postalCode, city }: Props) {
  return (
    <YouthProfileFormGrid verticalSpace="small">
      {address}
      <div className={styles.addressRowContainer}>
        {postalCode}
        {city}
      </div>
    </YouthProfileFormGrid>
  );
}

export default YouthProfileAddressTemplate;
