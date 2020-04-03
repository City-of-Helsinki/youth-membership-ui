import React, { useState } from 'react';
import { useTranslation, Trans } from 'react-i18next';
import { differenceInYears } from 'date-fns';
import { connect } from 'react-redux';

import { AuthState, resetError } from '../../redux';
import { RootState } from '../../../redux/rootReducer';
import authenticate from '../../authenticate';
import PageLayout from '../../../common/layout/PageLayout';
import styles from './Login.module.css';
import BirthdateForm from '../birthdateForm/BirthdateForm';
import NotificationComponent from '../../../common/notification/NotificationComponent';
import authConstants from '../../constants/authConstants';
import ageConstants from '../../../pages/membership/constants/ageConstants';

type Props = {
  resetError: () => void;
  auth: AuthState;
};

function Login(props: Props) {
  const [showManualRegistration, setShowManualRegistration] = useState(false);
  const { t } = useTranslation();

  const redirectBasedOnAge = (birthDate: string) => {
    const age = differenceInYears(new Date(), new Date(birthDate));

    if (age < ageConstants.REGISTRATION_AGE_DIGITALLY_MIN) {
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
            <button onClick={authenticate}>
              {t('login.linkForMembersText')} >
            </button>
          </React.Fragment>
        )}

        {showManualRegistration && (
          <React.Fragment>
            <p className={styles.helpText}>
              <Trans
                i18nKey="login.helpTextUnderAge"
                components={[
                  // eslint-disable-next-line jsx-a11y/anchor-has-content
                  <a
                    href={t('login.registrationForm')}
                    target="_blank"
                    rel="noopener noreferrer"
                  />,
                ]}
              />
            </p>
            <a
              className={styles.serviceLink}
              href={authConstants.URLS.YOUTH_CENTERS}
            >
              {t('login.findNearestService')}
            </a>
            <br />
            <button
              data-cy="goBack"
              onClick={() => setShowManualRegistration(false)}
            >
              {t('login.return')}
            </button>
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
