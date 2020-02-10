import React from 'react';
import { useTranslation } from 'react-i18next';

import authenticate from '../../authenticate';
import PageLayout from '../../../common/layout/PageLayout';
import styles from './Login.module.css';
import BirthdateForm from '../birthdateForm/BirthdateForm';


type Props = {};

function Login(props: Props) {
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
    //const cookie = getCookie('birthday');
    //console.log('cookie', cookie);
    //document.cookie = `birthday=${BD}`;
    //authenticate();
    // IF younger than 13 redirect to new info page (set cookie here as well)?
    // IF older that 13 -> set cookie -> authenticate
  };

  return (
    <PageLayout background="youth">
      <div className={styles.hostingBox}>
        <h1>{t('login.title')}</h1>
        <p className={styles.helpText}>{t('login.helpText')}</p>

        <BirthdateForm checkBirthdate={checkBirthDate} />

        <p>
          <span role="button">
            {t('login.linkForMembersText')}
            <span className={styles.linkArrow}> ></span>
          </span>
        </p>
      </div>
    </PageLayout>
  );
}

export default Login;
