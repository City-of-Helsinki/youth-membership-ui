import React, { useState } from 'react';
import classNames from 'classnames';
import { useTranslation } from 'react-i18next';
import { useSelector } from 'react-redux';

import { ReactComponent as HamburgerMenu } from '../svg/HamburgerMenu.svg';
import { ReactComponent as Close } from '../svg/Close.svg';
import styles from './FullscreenNavigation.module.css';
import authenticate from '../../auth/authenticate';
import logout from '../../auth/logout';
import LanguageSwitcher from '../../i18n/languageSwitcher/LanguageSwitcher';
import { isAuthenticatedSelector } from '../../auth/redux';

type Props = {
  className?: string;
};

function FullscreenNavigation(props: Props) {
  const { t } = useTranslation();
  const [isNavOpen, setIsNavOpen] = useState(false);

  const isAuthenticated = useSelector(isAuthenticatedSelector);

  return (
    <div className={classNames(props.className)}>
      {!isNavOpen && (
        <HamburgerMenu
          className={styles.navigationToggle}
          onClick={() => setIsNavOpen(true)}
        />
      )}
      <div className={isNavOpen ? styles.nav : styles.hidden}>
        <div className={styles.navControls}>
          <Close
            className={classNames(styles.navigationToggle, styles.closeNav)}
            onClick={() => setIsNavOpen(false)}
          />
        </div>
        <div className={styles.navItems}>
          {isAuthenticated && (
            <span role="button" className={styles.navLink} onClick={logout}>
              {t('nav.signout')}
            </span>
          )}
          {!isAuthenticated && (
            <span
              role="button"
              className={styles.navLink}
              onClick={() => {
                setIsNavOpen(false);
                authenticate();
              }}
            >
              {t('nav.signin')}
            </span>
          )}
          <LanguageSwitcher
            className={styles.languageSwitcher}
            onLanguageChanged={() => setIsNavOpen(false)}
          />
        </div>
      </div>
    </div>
  );
}

export default FullscreenNavigation;
