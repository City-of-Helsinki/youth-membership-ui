import React from 'react';
import { useTranslation } from 'react-i18next';
import IconArrowLeft from 'hds-react/lib/icons/IconArrowLeft';
import { useHistory } from 'react-router';

import Header from '../../../../common/header/Header';
import Footer from '../../../../common/footer/Footer';
import styles from './TermsOfService.module.css';

function TermsOfService() {
  const { t } = useTranslation();
  const history = useHistory();

  const handleGoBack = () => {
    window.close();
    history.goBack();
  };

  return (
    <div className={styles.footer}>
      <Header />
      <div className={styles.container}>
        <div className={styles.back}>
          <button type="button" onClick={handleGoBack}>
            <IconArrowLeft className={styles.icon} />
          </button>
        </div>
        <div className={styles.content}>
          <h1>{t('tos.title')}</h1>
          <span className={styles.updated}>{t('tos.updated')}</span>

          <h2>{t('tos.title1')}</h2>
          <p>{t('tos.message1')}</p>

          <h2>{t('tos.title2')}</h2>
          <p>{t('tos.message1')}</p>

          <h2>{t('tos.title3')}</h2>
          <p>{t('tos.message1')}</p>

          <h2>{t('tos.title4')}</h2>
          <p>{t('tos.message1')}</p>

          <h2>{t('tos.title5')}</h2>
          <p>{t('tos.message1')}</p>

          <h2>{t('tos.title6')}</h2>
          <p>{t('tos.message1')}</p>

          <h2>{t('tos.title7')}</h2>
          <p>{t('tos.message1')}</p>

          <h2>{t('tos.title8')}</h2>
          <p>{t('tos.message1')}</p>
        </div>
      </div>
      <Footer />
    </div>
  );
}

export default TermsOfService;
