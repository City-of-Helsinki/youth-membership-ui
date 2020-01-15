import React from 'react';
import { Koros } from 'hds-react';
import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';

import tosConstants from '../../pages/memberhsip/constants/tosConstants';
import { ReactComponent as HelsinkiLogo } from '../svg/HelsinkiLogo.svg';
import styles from './Footer.module.css';

function Footer() {
  const { t, i18n } = useTranslation();
  const link = Object(tosConstants.REGISTER_DESCRIPTION)[
    i18n.language.toUpperCase()
  ];
  return (
    <React.Fragment>
      <Koros className={styles.koros} />
      <footer className={styles.footer}>
        <div className={styles.content}>
          <HelsinkiLogo className={styles.logo} />
          <hr />
          <div className={styles.textContainer}>
            <span>
              &copy; {t('footer.copyright')} &bull; {t('footer.reserveRights')}{' '}
              &bull;{' '}
              <a href={link} className={styles.links}>
                {t('footer.privacy')}
              </a>{' '}
              | 
              <Link to="/#" className={styles.links}>
                {t('footer.accessibility')}
              </Link>{' '}
              | 
              <Link to="/terms-of-service" className={styles.links}>
                {t('footer.terms')}
              </Link>
            </span>
            <Link to="/#" className={styles.feedback}>
              {t('footer.feedback')}
            </Link>
          </div>
        </div>
      </footer>
    </React.Fragment>
  );
}

export default Footer;
