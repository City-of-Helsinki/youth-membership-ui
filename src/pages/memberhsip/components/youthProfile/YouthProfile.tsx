import React, { useEffect, useState } from 'react';
import { useLazyQuery } from '@apollo/react-hooks';
import { useTranslation } from 'react-i18next';
import { useHistory, RouteComponentProps } from 'react-router';
import { loader } from 'graphql.macro';

import getAuthenticatedUser from '../../../../auth/getAuthenticatedUser';
import PageLayout from '../../../../common/layout/PageLayout';
import CreateYouthProfile from '../createYouthProfile/CreateYouthProfile';
import ViewYouthProfile from '../viewYouthProfile/ViewYouthProfile';
import Loading from '../../../../common/loading/Loading';
import styles from './YouthProfile.module.css';

const PROFILE_EXISTS = loader('../../graphql/profileExistsQuery.graphql');

type Props = RouteComponentProps & {};

function YouthProfile(props: Props) {
  const { t } = useTranslation();
  const history = useHistory();
  const [checkProfileExists, { data, loading }] = useLazyQuery(PROFILE_EXISTS, {
    fetchPolicy: 'no-cache',
  });
  const [isCheckingAuthState, setIsCheckingAuthState] = useState(true);
  const [tunnistamoUser, setTunnistamoUser] = useState();

  useEffect(() => {
    getAuthenticatedUser()
      .then(user => {
        checkProfileExists();
        setTunnistamoUser(user);
        setIsCheckingAuthState(false);
      })
      .catch(() => history.push('/'));
  }, [checkProfileExists, history]);

  const isLoadingAnything = Boolean(isCheckingAuthState || loading);
  const isProfileFound = data && data.myProfile;

  return (
    <PageLayout background="youth">
      <Loading
        loadingClassName={styles.loading}
        isLoading={isLoadingAnything}
        loadingText={t('profile.loading')}
      >
        {isProfileFound ? (
          <ViewYouthProfile />
        ) : (
          <CreateYouthProfile
            tunnistamoUser={tunnistamoUser}
            onProfileCreated={() => checkProfileExists()}
          />
        )}
      </Loading>
    </PageLayout>
  );
}

export default YouthProfile;
