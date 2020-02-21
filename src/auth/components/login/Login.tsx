import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { differenceInYears } from 'date-fns';
import { connect } from 'react-redux';

import { AuthState, resetError } from '../../redux';
import { RootState } from '../../../redux/rootReducer';
import authenticate from '../../authenticate';
import PageLayout from '../../../common/layout/PageLayout';
import styles from './Login.module.css';
import BirthdateForm from '../birthdateForm/BirthdateForm';
import NotificationComponent from '../../../common/notification/NotificationComponent';

type Props = {
  resetError: () => void;
  auth: AuthState;
};

function Login(props: Props) {
  const [showManualRegistration, setShowManualRegistration] = useState(false);
  const { t } = useTranslation();

  const redirectBasedOnAge = (birthDate: string) => {
    const age = differenceInYears(new Date(), new Date(birthDate));

    if (age < 13) {
      setShowManualRegistration(true);
    } else {
      document.cookie = `birthDate=${birthDate}`;
      authenticate();
    }
  };

  return (
    <PageLayout background="youth">
      <div className={styles.hostingBox}>
        <h1>{t('login.title')}</h1>

        {!showManualRegistration && (
          <React.Fragment>
            <p className={styles.helpText}>{t('login.helpText')}</p>
            <BirthdateForm redirectBasedOnAge={redirectBasedOnAge} />
            <p>
              <span role="button" className={styles.loginHelpText} onClick={authenticate}>
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

      <NotificationComponent
        show={Boolean(props.auth.error)}
        onClose={() => props.resetError()}
      />
    </PageLayout>
  );
}

const mapStateToProps = (state: RootState) => {
  return {
    auth: state.auth,
  };
};

export default connect(mapStateToProps, { resetError })(Login);
