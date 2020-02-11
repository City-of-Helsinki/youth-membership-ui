import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { differenceInYears } from 'date-fns';

import authenticate from '../../authenticate';
import PageLayout from '../../../common/layout/PageLayout';
import styles from './Login.module.css';
import BirthdateForm from '../birthdateForm/BirthdateForm';
import Button from '../../../common/button/Button';

type Props = {};

function Login(props: Props) {
  const [showManualRegistration, setShowManualRegistration] = useState(false);
  const { t } = useTranslation();

  // TODO move to own file
  const getCookie = (cookieName: string) => {
    const name = cookieName + '=';
    const decodeCookie = decodeURIComponent(document.cookie);
    const cookieArray = decodeCookie.split(';');

    for (let i = 0; i < cookieArray.length; i++) {
      let cookie = cookieArray[i];
      while (cookie.charAt(0) === ' ') {
        cookie = cookie.substring(1);
      }
      if (cookie.indexOf(name) === 0) {
        return cookie.substring(name.length, cookie.length);
      }
    }
    return '';
  };

  const checkBirthDate = (birthDate: string) => {
    const age = differenceInYears(new Date(), new Date(birthDate));

    if (age < 13) {
      setShowManualRegistration(true);
    } else {
      document.cookie = `birthDate=${birthDate}`;
      //authenticate();
    }
  };

  return (
    <PageLayout background="youth">
      <div className={styles.hostingBox}>
        <h1>{t('login.title')}</h1>

        {!showManualRegistration && (
          <React.Fragment>
            <p className={styles.helpText}>{t('login.helpText')}</p>
            <BirthdateForm checkBirthdate={checkBirthDate} />
            <p>
              <span role="button">
                {t('login.linkForMembersText')}
                <span className={styles.linkArrow}> ></span>
              </span>
            </p>
          </React.Fragment>
        )}

        {showManualRegistration && (
          <React.Fragment>
            <p className={styles.helpText}>{t('login.helpTextUnderAge')}</p>
            <a
              className={styles.serviceLink}
              href="https://palvelukartta.hel.fi/fi/search?q=nuorisotalo"
            >
              {t('login.findNearestService')}
            </a>
          </React.Fragment>
        )}
      </div>
    </PageLayout>
  );
}

export default Login;
