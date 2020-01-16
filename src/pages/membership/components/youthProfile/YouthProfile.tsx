import React, { useEffect, useState } from 'react';
import { useLazyQuery } from '@apollo/react-hooks';
import { useTranslation } from 'react-i18next';
import { useHistory } from 'react-router';
import { loader } from 'graphql.macro';

import getAuthenticatedUser from '../../../../auth/getAuthenticatedUser';
import PageLayout from '../../../../common/layout/PageLayout';
import CreateYouthProfile from '../createYouthProfile/CreateYouthProfile';
import SentYouthProfileScreen from '../confirmSendingYouthProfile/ConfirmSendingYouthProfile';
import Loading from '../../../../common/loading/Loading';
import styles from './YouthProfile.module.css';
import { HasYouthProfile } from '../../../../graphql/generatedTypes';

const HAS_YOUTH_PROFILE = loader('../../graphql/HasYouthProfile.graphql');

type Props = {};

function YouthProfile(props: Props) {
  const { t } = useTranslation();
  const history = useHistory();
  const [checkProfileExists, { data, loading }] = useLazyQuery<HasYouthProfile>(
    HAS_YOUTH_PROFILE,
    {
      fetchPolicy: 'no-cache',
    }
  );
  const [isCheckingAuthState, setIsCheckingAuthState] = useState(true);
  const [tunnistamoUser, setTunnistamoUser] = useState();

  useEffect(() => {
    getAuthenticatedUser()
      .then(user => {
        checkProfileExists();
        setTunnistamoUser(user);
        setIsCheckingAuthState(false);
      })
      .catch(() => history.push('/login'));
  }, [checkProfileExists, history]);

  const isLoadingAnything = Boolean(isCheckingAuthState || loading);
  const isYouthProfileFound = Boolean(
    data?.myProfile?.youthProfile?.expiration
  );

  return (
    <PageLayout background="youth">
      <Loading
        loadingClassName={styles.loading}
        isLoading={isLoadingAnything}
        loadingText={t('profile.loading')}
      >
        {isYouthProfileFound ? (
          <SentYouthProfileScreen />
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
