import React from 'react';

import styles from './HostingBox.module.css';

type Props = {};

function HostingBox(props: Props) {
  return (
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
  );
}

export default HostingBox;
