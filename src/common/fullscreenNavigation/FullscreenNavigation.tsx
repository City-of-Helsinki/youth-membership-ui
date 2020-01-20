import React, { useState } from 'react';
import classNames from 'classnames';
import { useTranslation } from 'react-i18next';
import { NavLink, useHistory } from 'react-router-dom';

import { ReactComponent as HamburgerMenu } from '../svg/HamburgerMenu.svg';
import { ReactComponent as Close } from '../svg/Close.svg';
import styles from './FullscreenNavigation.module.css';
import userManager from '../../auth/userManager';
import LanguageSwitcher from '../../i18n/languageSwitcher/LanguageSwitcher';

type Props = {
  className?: string;
};

function FullscreenNavigation(props: Props) {
  const { t } = useTranslation();
  const history = useHistory();
  const [isNavOpen, setIsNavOpen] = useState(false);
  const signout = () => {
    userManager.removeUser().then(() => {
      setIsNavOpen(false);
      history.push('/login');
    });
  };
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
          <span role="button" className={styles.navLink} onClick={signout}>
            {t('nav.signout')}
          </span>
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
