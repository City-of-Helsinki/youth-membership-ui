import React, { useEffect, useState } from 'react';
import { useQuery } from '@apollo/react-hooks';
import { useTranslation } from 'react-i18next';
import { Redirect, Route, Switch, useHistory } from 'react-router';
import { loader } from 'graphql.macro';

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

const HAS_YOUTH_PROFILE = loader('../../graphql/HasYouthProfile.graphql');

type Props = {};

function YouthProfile(props: Props) {
  const { t } = useTranslation();
  const history = useHistory();
  const { data, loading } = useQuery<HasYouthProfile>(HAS_YOUTH_PROFILE, {
    onError: () => setShowNotification(true),
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

  return (
    <PageLayout background="youth">
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
                <MembershipInformation
                  expirationDate={data?.myProfile?.youthProfile?.expiration}
                  status={data?.myProfile?.youthProfile?.membershipStatus}
                  renewable={data?.myProfile?.youthProfile?.renewable}
                />
              )}
            </Route>
            <Route path="/membership-details" exact>
              <MembershipDetails />
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
