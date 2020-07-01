import React from 'react';
import { Koros } from 'hds-react';
import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';

import HelsinkiLogo from '../../helsinkiLogo/HelsinkiLogo';
import styles from './Footer.module.css';

function Footer() {
  const { t } = useTranslation();
  const year = new Date().getFullYear();
  return (
    <div className={styles.wrapper}>
      <Koros className={styles.koros} />
      <footer className={styles.footer}>
        <div className={styles.content}>
          <HelsinkiLogo className={styles.logo} />
          <hr />
          <div className={styles.textContainer}>
            <span>
              &copy; {t('footer.copyright', { year })} &bull;{' '}
              {t('footer.reserveRights')} &bull;{' '}
              <a href={t('registry.descriptionLink')} className={styles.links}>
                {t('footer.privacy')}
              </a>{' '}
              | 
              <Link to="/accessibility" className={styles.links}>
                {t('footer.accessibility')}
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
    </div>
  );
}

export default Footer;
