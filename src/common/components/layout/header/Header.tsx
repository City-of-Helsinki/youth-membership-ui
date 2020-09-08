import React from 'react';
import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';

import styles from './Header.module.css';
import LanguageSwitcher from '../../../../i18n/languageSwitcher/LanguageSwitcher';
import FullscreenNavigation from '../../fullscreenNavigation/FullscreenNavigation';
import HelsinkiLogo from '../../helsinkiLogo/HelsinkiLogo';
import UserDropdown from './userDropdown/UserDropdown';

// Approver variant is shown for approver view. The approver should not
// be shown the user menu, nor should the header contain links for
// navigating into te front page.
export type HeaderVariant = 'default' | 'approver';

type Props = {
  variant?: HeaderVariant;
};

function Header({ variant = 'default' }: Props) {
  const { t } = useTranslation();
  const isDefaultVariant = variant === 'default';
  const isApproverVariant = variant === 'approver';

  return (
    <header className={styles.header}>
      <div className={styles.content}>
        <HelsinkiLogo
          className={styles.logo}
          isLinkToFrontPage={isDefaultVariant}
        />
        {isDefaultVariant && (
          <Link to="/" className={styles.appName}>
            {t('appName')}
          </Link>
        )}
        {isApproverVariant && (
          <span className={styles.appName}>{t('appName')}</span>
        )}
        <section className={styles.end}>
          <FullscreenNavigation className={styles.mobileNav} />
          <div className={styles.desktopNav}>
            <LanguageSwitcher />
            {isDefaultVariant && <UserDropdown />}
          </div>
        </section>
      </div>
    </header>
  );
}

export default Header;
