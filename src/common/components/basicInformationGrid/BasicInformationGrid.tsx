import React from 'react';
import { useTranslation } from 'react-i18next';

import InfoGrid from '../infoGrid/InfoGrid';
import InfoGridRow from '../infoGrid/InfoGridRow';
import LabeledValue from '../labeledValue/LabeledValue';

function getAddressNumber(index: number): string {
  if (index > 0) {
    return ` ${index + 1}`;
  }

  return '';
}

type Props = {
  name: string;
  addresses: string[];
  email: string | null;
  phone: string | null;
  birthDate: string;
  language?: string;
};

function BasicInformationGrid({
  name,
  addresses,
  email,
  phone,
  birthDate,
  language,
}: Props) {
  const { t } = useTranslation();

  return (
    <InfoGrid>
      <LabeledValue label={t('profile.name')} value={name} noMargin />
      <LabeledValue
        label={t('youthProfile.birthdate')}
        value={birthDate}
        noMargin
      />
      <LabeledValue label={t('profile.email')} value={email} noMargin />
      <LabeledValue label={t('profile.phone')} value={phone} noMargin />
      <LabeledValue
        label={t('registration.profileLanguage')}
        value={language}
        noMargin
      />
      <InfoGridRow>
        {addresses.map((address, index) => (
          <LabeledValue
            key={address}
            label={`${t('profile.address')}${getAddressNumber(index)}`}
            value={address}
            noMargin
          />
        ))}
      </InfoGridRow>
    </InfoGrid>
  );
}

export default BasicInformationGrid;
