import React from 'react';
import { Koros } from 'hds-react';
import { Link } from 'react-router-dom';
import { ReactComponent as HelsinkiLogo } from '../svg/HelsinkiLogo.svg';
import styles from './Footer.module.css';

function Footer() {
  return (
    <React.Fragment>
      <Koros className={styles.koros} />
      <footer className={styles.footer}>
        <div className={styles.content}>
          <HelsinkiLogo className={styles.logo} />
          <hr />
          <div className={styles.textContainer}>
            <span>
              &copy; Copyright 2020 &bull; Kaikki oikeudet pidätetään &bull;{' '}
              <Link to="/#" className={styles.links}>
                Rekisteriseloste
              </Link>{' '}
              | 
              <Link to="/#" className={styles.links}>
                Saavutettavuusseloste
              </Link>{' '}
              | 
              <Link to="/#" className={styles.links}>
                Palvelunkäyttöehdot
              </Link>
            </span>
            <Link to="/#" className={styles.feedback}>
              Anna palautetta
            </Link>
          </div>
        </div>
      </footer>
    </React.Fragment>
  );
}

export default Footer;
