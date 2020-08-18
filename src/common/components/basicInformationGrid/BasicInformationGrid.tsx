import React from 'react';
import { useTranslation } from 'react-i18next';

import LabeledValue from '../labeledValue/LabeledValue';
import styles from './basicInformationGrid.module.css';

type Props = {
  name: string;
  addresses: string[];
  email: string;
  phone: string;
  birthDate: string;
};

function BasicInformationGrid({
  name,
  addresses,
  email,
  phone,
  birthDate,
}: Props) {
  const { t } = useTranslation();

  return (
    <div className={styles.formData}>
      <LabeledValue label={t('approval.name')} value={name} noMargin />
      <LabeledValue label={t('approval.profile')} value={email} noMargin />
      <LabeledValue label={t('approval.phone')} value={phone} noMargin />
      <LabeledValue
        label={t('approval.birthDate')}
        value={birthDate}
        noMargin
      />
      <div className={styles.formRow}>
        {addresses.map((address, index) => (
          <LabeledValue
            key={address}
            label={`${t('approval.address')} ${index + 1}`}
            value={address}
            noMargin
          />
        ))}
      </div>
    </div>
  );
}

export default BasicInformationGrid;
