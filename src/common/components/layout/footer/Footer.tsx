import React from 'react';
import { Koros } from 'hds-react';
import { useTranslation } from 'react-i18next';

import Link from '../../../reactRouterWithLanguageSupport/Link';
import ExternalLink from '../../externalLink/ExternalLink';
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
            <ExternalLink
              href={t('footer.feedbackLink')}
              className={styles.feedback}
            >
              {t('footer.feedback')}
            </ExternalLink>
          </div>
        </div>
      </footer>
    </div>
  );
}

export default Footer;
