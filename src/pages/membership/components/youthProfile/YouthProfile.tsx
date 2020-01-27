import React, { useEffect, useState } from 'react';
import { useQuery } from '@apollo/react-hooks';
import { useTranslation } from 'react-i18next';
import { useHistory, Switch, Route } from 'react-router';
import { loader } from 'graphql.macro';

import isMembershipValid from '../../helpers/isMembershipValid';
import getAuthenticatedUser from '../../../../auth/getAuthenticatedUser';
import PageLayout from '../../../../common/layout/PageLayout';
import CreateYouthProfile from '../createYouthProfile/CreateYouthProfile';
import MembershipInformation from '../membershipInformation/MembershipInformation';
import SentYouthProfile from '../sentYouthProfile/SentYouthProfile';
import MembershipDetails from '../membershipDetails/MembershipDetails';
import Loading from '../../../../common/loading/Loading';
import styles from './YouthProfile.module.css';
import { HasYouthProfile } from '../../../../graphql/generatedTypes';

const HAS_YOUTH_PROFILE = loader('../../graphql/HasYouthProfile.graphql');

type Props = {};

function YouthProfile(props: Props) {
  const { t } = useTranslation();
  const history = useHistory();
  const { data, loading } = useQuery<HasYouthProfile>(HAS_YOUTH_PROFILE);
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

  const approved = isMembershipValid(
    data?.myProfile?.youthProfile?.expiration,
    data?.myProfile?.youthProfile?.approvedTime
  );
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
              {approved ? (
                <MembershipInformation
                  expires={data?.myProfile?.youthProfile?.expiration}
                />
              ) : (
                <SentYouthProfile />
              )}
            </Route>
            <Route path="/membership-details" exact>
              <MembershipDetails />
            </Route>
          </Switch>
        ) : (
          <CreateYouthProfile tunnistamoUser={tunnistamoUser} />
        )}
      </Loading>
    </PageLayout>
  );
}

export default YouthProfile;
