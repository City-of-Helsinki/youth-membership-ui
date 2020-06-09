import React, { useEffect, useState } from 'react';
import { useQuery } from '@apollo/react-hooks';
import { useTranslation } from 'react-i18next';
import { Redirect, Route, Switch, useHistory, useLocation } from 'react-router';
import { loader } from 'graphql.macro';
import * as Sentry from '@sentry/browser';

import getAuthenticatedUser from '../../../../auth/getAuthenticatedUser';
import PageLayout from '../../../../common/layout/PageLayout';
import NotificationComponent from '../../../../common/notification/NotificationComponent';
import CreateYouthProfile from '../createYouthProfile/CreateYouthProfile';
import MembershipInformation from '../membershipInformation/MembershipInformation';
import SentYouthProfile from '../sentYouthProfile/SentYouthProfile';
import MembershipDetails from '../membershipDetails/MembershipDetails';
import Loading from '../../../../common/loading/Loading';
import styles from './YouthProfile.module.css';
import {
  HasYouthProfile,
  MembershipStatus,
} from '../../../../graphql/generatedTypes';
import getCookie from '../../helpers/getCookie';
import EditYouthProfile from '../editYouthProfile/EditYouthProfile';

const HAS_YOUTH_PROFILE = loader('../../graphql/HasYouthProfile.graphql');

type Props = {};

function YouthProfile(props: Props) {
  const { t } = useTranslation();
  const history = useHistory();
  const location = useLocation();
  const { data, loading } = useQuery<HasYouthProfile>(HAS_YOUTH_PROFILE, {
    onError: (error: Error) => {
      Sentry.captureException(error);
      setShowNotification(true);
    },
  });
  const [showNotification, setShowNotification] = useState(false);
  const [isCheckingAuthState, setIsCheckingAuthState] = useState(true);
  const [tunnistamoUser, setTunnistamoUser] = useState();

  useEffect(() => {
    getAuthenticatedUser()
      .then(user => {
        setTunnistamoUser(user);
        setIsCheckingAuthState(false);
      })
      .catch(() => history.push('/login'));
  }, [history]);

  const isLoadingAnything = Boolean(isCheckingAuthState || loading);
  const isYouthProfileFound = Boolean(data?.myProfile?.youthProfile);

  const isMembershipPending =
    data?.myProfile?.youthProfile?.membershipStatus ===
    MembershipStatus.PENDING;

  const birthDate = getCookie('birthDate');

  const getPageTitle = () => {
    const pathname = location.pathname.substr(1);
    if (pathname.length === 0) {
      return isMembershipPending
        ? 'confirmSendingProfile.pageTitle'
        : 'membershipInformation.pageTitle';
    }

    switch (pathname) {
      case 'membership-details':
        return 'membershipDetails.title';
      case 'edit':
        return 'edit.title';
      default:
        return 'appName';
    }
  };

  return (
    <PageLayout title={getPageTitle()}>
      <Loading
        loadingClassName={styles.loading}
        isLoading={isLoadingAnything}
        loadingText={t('profile.loading')}
      >
        {isYouthProfileFound ? (
          <Switch>
            <Route path="/" exact>
              {isMembershipPending ? (
                <SentYouthProfile />
              ) : (
                <MembershipInformation />
              )}
            </Route>
            <Route path="/membership-details" exact>
              <MembershipDetails />
            </Route>
            <Route path="/edit" exact>
              <EditYouthProfile />
            </Route>
          </Switch>
        ) : !birthDate ? (
          <Redirect to="/login" />
        ) : (
          <CreateYouthProfile tunnistamoUser={tunnistamoUser} />
        )}
      </Loading>
      <NotificationComponent
        show={showNotification}
        onClose={() => setShowNotification(false)}
      />
    </PageLayout>
  );
}

export default YouthProfile;
