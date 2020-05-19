import React from 'react';
import { useTranslation } from 'react-i18next';
import classNames from 'classnames';

import styles from './HelsinkiLogo.module.css';

type Props = {
  className?: string;
};
function HelsinkiLogo({ className }: Props) {
  const { t, i18n } = useTranslation();

  if (i18n.languages[0] === 'sv')
    return (
      <span
        className={classNames(styles.logoSv, className)}
        aria-label={t('helsinkiLogo')}
      />
    );
  return (
    <span
      className={classNames(styles.logoFi, className)}
      aria-label={t('helsinkiLogo')}
    />
  );
}

export default HelsinkiLogo;