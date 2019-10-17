import React from 'react';
import { RouteProps } from 'react-router';

import PageLayout from '../common/layout/PageLayout';
import styles from './Home.module.css';

type Props = RouteProps & {};

function Home(props: Props) {
  return (
    <PageLayout>
      <div className={styles.hostingBox}>
        <h1>Hanki Nuta-jäsenyys!</h1>
        <p>
          Tähän lisätietoja, miksi kannattaa hankkia jässäri, miten toimii jne.
        </p>
        <button className={styles.button} type="button">
          Hanki jäsenyys
        </button>
        <p>
          <a href="#">Mikäli sinulla on jo jäsenyys, kirjaudu sisään ></a>
        </p>
      </div>
    </PageLayout>
  );
}

export default Home;
