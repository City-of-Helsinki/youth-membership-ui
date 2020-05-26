import React from 'react';
import { useTranslation } from 'react-i18next';
import { useHistory } from 'react-router';
import classNames from 'classnames';

import styles from './HelsinkiLogo.module.css';

type Props = {
  className?: string;
};
function HelsinkiLogo({ className }: Props) {
  const { t, i18n } = useTranslation();
  const history = useHistory();

  const navigateToHomePage = () => history.push('/');

  if (i18n.languages[0] === 'sv')
    return (
      <span
        role="button"
        onClick={navigateToHomePage}
        className={classNames(styles.logoSv, className)}
        aria-label={t('helsinkiLogo')}
      />
    );
  return (
    <span
      role="button"
      onClick={navigateToHomePage}
      className={classNames(styles.logoFi, className)}
      aria-label={t('helsinkiLogo')}
    />
  );
}

export default HelsinkiLogo;
