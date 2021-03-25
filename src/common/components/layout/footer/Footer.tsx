import React from 'react';
import { Footer as HDSFooter } from 'hds-react';
import { useTranslation } from 'react-i18next';

import Link from '../../../reactRouterWithLanguageSupport/Link';
import ExternalLink from '../../externalLink/ExternalLink';
import styles from './Footer.module.css';

function Footer() {
  const { t } = useTranslation();

  return (
    <HDSFooter className={styles.footer}>
      <HDSFooter.Base
        copyrightHolder={t('footer.copyright')}
        copyrightText={t('footer.reserveRights')}
      >
        <HDSFooter.Item as={ExternalLink} href={t('registry.descriptionLink')}>
          {t('footer.privacy')}
        </HDSFooter.Item>
        <HDSFooter.Item
          as={Link}
          to="/accessibility"
          label={t('footer.accessibility')}
          className={styles.centerHack}
        />
        <HDSFooter.Item as={ExternalLink} href={t('footer.feedbackLink')}>
          {t('footer.feedback')}
        </HDSFooter.Item>
      </HDSFooter.Base>
    </HDSFooter>
  );
}

export default Footer;
