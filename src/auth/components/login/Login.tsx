import React from 'react';
import { useTranslation } from 'react-i18next';

import authenticate from '../../authenticate';
import PageLayout from '../../../common/layout/PageLayout';
import styles from './Login.module.css';
import Button from '../../../common/button/Button';

type Props = {};

function Login(props: Props) {
  const { t } = useTranslation();
  return (
    <PageLayout background="youth">
      <div className={styles.hostingBox}>
        <h2>{t('login.title')}</h2>
        <p className={styles.helpText}>{t('login.helpText')}</p>
        <Button type="button" disabled={false}>
          {t('login.buttonText')}
        </Button>
        <p>
          <span onClick={authenticate} role="button">
            {t('login.linkForMembersText')}
            <span className={styles.linkArrow}> ></span>
          </span>
        </p>
      </div>
    </PageLayout>
  );
}

export default Login;
