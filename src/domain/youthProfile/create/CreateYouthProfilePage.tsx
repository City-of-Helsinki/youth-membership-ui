import React, { useState, useEffect } from 'react';
import { useHistory, Redirect } from 'react-router';
import { useTranslation } from 'react-i18next';

import Loading from '../../../common/components/loading/Loading';
import PageLayout from '../../../common/components/layout/PageLayout';
import getAuthenticatedUser from '../../auth/getAuthenticatedUser';
import useIsMembershipPending from '../../membership/useIsMembershipPending';
import CreateYouthProfile from './CreateYouthProfile';

function CreateYouthProfilePage() {
  const { t } = useTranslation();
  const history = useHistory();
  const [tunnistamoUser, setTunnistamoUser] = useState();
  const [isCheckingAuthState, setIsCheckingAuthState] = useState(true);
  const [isMembershipPending, loading] = useIsMembershipPending({
    onError: () => {
      history.push('/login');
    },
  });

  useEffect(() => {
    getAuthenticatedUser()
      .then(user => {
        setTunnistamoUser(user);
        setIsCheckingAuthState(false);
      })
      .catch(() => history.push('/login'));
  }, [history]);

  if (isMembershipPending) {
    return <Redirect to="/" />;
  }

  return (
    <PageLayout title="">
      <Loading
        loadingClassName="unused"
        isLoading={isCheckingAuthState || loading}
        loadingText={t('profile.loading')}
      >
        <CreateYouthProfile tunnistamoUser={tunnistamoUser} />
      </Loading>
    </PageLayout>
  );
}

export default CreateYouthProfilePage;
