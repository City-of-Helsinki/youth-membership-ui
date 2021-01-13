import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { differenceInYears } from 'date-fns';
import { connect, useSelector } from 'react-redux';
import { useMatomo } from '@datapunt/matomo-tracker-react';
import { Button } from 'hds-react';

import LinkButton from '../../../../common/components/linkButton/LinkButton';
import { AuthState, resetError, isAuthenticatedSelector } from '../../redux';
import { RootState } from '../../../../redux/rootReducer';
import authenticate from '../../authenticate';
import PageContentWithHostingBox from '../../../../common/components/layout/PageContentWithHostingBox';
import styles from './Login.module.css';
import BirthdateForm from '../birthdateForm/BirthdateForm';
import NotificationComponent from '../../../../common/components/notification/NotificationComponent';
import authConstants from '../../constants/authConstants';
import ageConstants from '../../../youthProfile/constants/ageConstants';
import PageWrapper from '../../../../common/components/wrapper/PageWrapper';

type Props = {
  resetError: () => void;
  auth: AuthState;
};

function Login(props: Props) {
  const [showManualRegistration, setShowManualRegistration] = useState(false);
  const { t } = useTranslation();
  const { trackEvent } = useMatomo();

  const redirectBasedOnAge = (birthDate: string) => {
    const age = differenceInYears(new Date(), new Date(birthDate));

    if (age < ageConstants.REGISTRATION_AGE_DIGITALLY_MIN) {
      setShowManualRegistration(true);
    } else {
      document.cookie = `birthDate=${birthDate}`;
      trackEvent({ category: 'action', action: 'Log in' });
      authenticate();
    }
  };

  const isAuthenticated = useSelector(isAuthenticatedSelector);

  return (
    <PageWrapper>
      <PageContentWithHostingBox title={'login.pageTitle'}>
        <div className={styles.hostingBox}>
          <h1 className={styles.title}>{t('login.title')}</h1>

          {!showManualRegistration && (
            <React.Fragment>
              <p className={styles.helpText}>{t('login.helpText')}</p>
              <BirthdateForm redirectBasedOnAge={redirectBasedOnAge} />

              {!isAuthenticated && (
                <div className={styles.loginContainer}>
                  <span className={styles.linkForMembers}>
                    {t('login.linkForMembersText')}
                  </span>
                  <Button
                    onClick={authenticate}
                    variant="supplementary"
                    className={styles.button}
                    iconRight={null}
                  >
                    {t('nav.signin')}
                  </Button>
                </div>
              )}
            </React.Fragment>
          )}

          {showManualRegistration && (
            <div className={styles.loginContainer}>
              <p className={styles.helpText}>{t('login.helpTextUnderAge')}</p>
              <LinkButton
                className={styles.linkButtons}
                path={t('login.registrationForm')}
                component="a"
                buttonText={t('login.registrationFormText')}
                variant="primary"
                target="_blank"
                rel="noopener noreferrer"
              />
              <LinkButton
                className={styles.linkButtons}
                path={authConstants.URLS.YOUTH_CENTERS}
                component="a"
                buttonText={t('login.findNearestService')}
                variant="primary"
              />

              <Button
                test-id="goBack"
                onClick={() => setShowManualRegistration(false)}
                className={styles.linkButtons}
                variant="secondary"
              >
                {t('login.return')}
              </Button>
            </div>
          )}
        </div>

        <NotificationComponent
          show={Boolean(props.auth.error)}
          onClose={() => props.resetError()}
        />
      </PageContentWithHostingBox>
    </PageWrapper>
  );
}

const mapStateToProps = (state: RootState) => {
  return {
    auth: state.auth,
  };
};

export default connect(mapStateToProps, { resetError })(Login);
