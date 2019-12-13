import React from 'react';
import { RouteChildrenProps } from 'react-router';
import { useTranslation } from 'react-i18next';

import authenticate from '../auth/authenticate';
import PageLayout from '../common/layout/PageLayout';
import styles from './Home.module.css';

type Props = RouteChildrenProps & {};

function Home(props: Props) {
  const { t } = useTranslation();
  return (
    <PageLayout background="youth">
      <div className={styles.hostingBox}>
        <h2>{t('home.title')}</h2>
        <p className={styles.helpText}>{t('home.helpText')}</p>
        <button type="button">{t('home.buttonText')}</button>
        <p>
          <span onClick={authenticate} role="button">
            {t('home.linkForMembersText')}
            <span className={styles.linkArrow}> ></span>
          </span>
        </p>
      </div>
    </PageLayout>
  );
}

export default Home;
