import React, { useEffect, useState } from 'react';
import { useQuery } from '@apollo/react-hooks';
import { useTranslation } from 'react-i18next';
import { useHistory } from 'react-router';
import { loader } from 'graphql.macro';

import getAuthenticatedUser from '../../../../auth/getAuthenticatedUser';
import PageLayout from '../../../../common/layout/PageLayout';
import CreateYouthProfile from '../createYouthProfile/CreateYouthProfile';
import SentYouthProfileScreen from '../confirmSendingYouthProfile/ConfirmSendingYouthProfile';
import Loading from '../../../../common/loading/Loading';
import styles from './YouthProfile.module.css';
import { ProfileExistsQuery } from '../../graphql/__generated__/ProfileExistsQuery';

const PROFILE_EXISTS = loader('../../graphql/profileExistsQuery.graphql');

type Props = {};

function YouthProfile(props: Props) {
  const { t } = useTranslation();
  const history = useHistory();

  const { data, loading } = useQuery<ProfileExistsQuery>(PROFILE_EXISTS);
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
  const isProfileFound = data && data.myProfile;

  return (
    <PageLayout background="youth">
      <Loading
        loadingClassName={styles.loading}
        isLoading={isLoadingAnything}
        loadingText={t('profile.loading')}
      >
        {isProfileFound ? (
          <SentYouthProfileScreen />
        ) : (
          <CreateYouthProfile tunnistamoUser={tunnistamoUser} />
        )}
      </Loading>
    </PageLayout>
  );
}

export default YouthProfile;
