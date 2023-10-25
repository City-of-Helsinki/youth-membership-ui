import React from 'react';
import { useTranslation } from 'react-i18next';
import { useSelector } from 'react-redux';
import { Button } from 'hds-react';

import { isAuthenticatedSelector } from '../../redux';
import authenticate from '../../authenticate';
import PageContentWithHostingBox from '../../../../common/components/layout/PageContentWithHostingBox';
import styles from './Login.module.css';
import PageWrapper from '../../../../common/components/wrapper/PageWrapper';

function Login() {
  const { t } = useTranslation();

  const isAuthenticated = useSelector(isAuthenticatedSelector);

  return (
    <PageWrapper>
      <PageContentWithHostingBox title={'login.pageTitle'}>
        <p className={styles.title}>{t('login.title')}</p>
        <React.Fragment>
          {!isAuthenticated && (
            <div className={styles.loginContainer}>
              <Button
                onClick={() => authenticate()}
                variant="supplementary"
                className={styles.button}
                iconRight={null}
              >
                {t('nav.signin')}
              </Button>
            </div>
          )}
        </React.Fragment>
      </PageContentWithHostingBox>
    </PageWrapper>
  );
}

export default Login;
