import React from 'react';
import Koros from 'hds-react/lib/components/koros/Koros';
import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';

import HelsinkiLogo from '../helsinkiLogo/HelsinkiLogo';
import tosConstants from '../../pages/tos/constants/tosConstants';
import styles from './Footer.module.css';

function Footer() {
  const { t, i18n } = useTranslation();
  const selectedLanguage =
    (i18n.languages && i18n.languages[0].toUpperCase()) || 'FI';
  const link = Object(tosConstants.REGISTER_DESCRIPTION)[selectedLanguage];
  const year = new Date().getFullYear();
  return (
    <React.Fragment>
      <Koros className={styles.koros} />
      <footer className={styles.footer}>
        <div className={styles.content}>
          <HelsinkiLogo className={styles.logo} />
          <hr />
          <div className={styles.textContainer}>
            <span>
              &copy; {t('footer.copyright', { year })} &bull;{' '}
              {t('footer.reserveRights')} &bull;{' '}
              <a href={link} className={styles.links}>
                {t('footer.privacy')}
              </a>{' '}
              | 
              <Link to="/accessibility" className={styles.links}>
                {t('footer.accessibility')}
              </Link>{' '}
              | 
              <Link to="/terms-of-service" className={styles.links}>
                {t('footer.terms')}
              </Link>
            </span>
            <a
              href={t('footer.feedbackLink')}
              target="_blank"
              rel="noopener noreferrer"
              className={styles.feedback}
            >
              {t('footer.feedback')}
            </a>
          </div>
        </div>
      </footer>
    </React.Fragment>
  );
}

export default Footer;
