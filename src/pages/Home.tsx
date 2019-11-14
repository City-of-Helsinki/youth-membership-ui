import React from 'react';
import { RouteChildrenProps } from 'react-router';
import { useTranslation } from 'react-i18next';

import authenticate from '../oidc/authenticate';
import PageLayout from '../common/layout/PageLayout';
import styles from './Home.module.css';

type Props = RouteChildrenProps & {};

function Home(props: Props) {
  const { t } = useTranslation();
  return (
    <PageLayout background="youth">
      <div className={styles.hostingBox}>
        <h1>{t('home.title')}</h1>
        <p>
          Tähän lisätietoja, miksi kannattaa hankkia jässäri, miten toimii jne.
        </p>
        <button className={styles.button} type="button">
          Hanki jäsenyys
        </button>
        <p>
          <span onClick={authenticate} role="button">
            Mikäli sinulla on jo jäsenyys, kirjaudu sisään >
          </span>
        </p>
      </div>
    </PageLayout>
  );
}

export default Home;
