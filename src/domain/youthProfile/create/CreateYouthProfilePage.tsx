import React, { useState, useEffect } from 'react';
import { useHistory, Redirect } from 'react-router';
import { useTranslation } from 'react-i18next';
import { useQuery } from '@apollo/react-hooks';
import { loader } from 'graphql.macro';
import { User } from 'oidc-client';

import { PrefillRegistartion } from '../../../graphql/generatedTypes';
import PageContent from '../../../common/components/layout/PageContent';
import NotificationComponent from '../../../common/components/notification/NotificationComponent';
import getAuthenticatedUser from '../../auth/getAuthenticatedUser';
import useIsMembershipPending from '../../membership/useIsMembershipPending';
import CreateYouthProfile from './CreateYouthProfile';

const PREFILL_REGISTRATION = loader('../graphql/PrefillRegistration.graphql');

function CreateYouthProfilePage() {
  const { t } = useTranslation();
  const history = useHistory();
  const [showNotification, setShowNotification] = useState(false);
  const [tunnistamoUser, setTunnistamoUser] = useState<User | null>(null);
  const [isCheckingAuthState, setIsCheckingAuthState] = useState(true);
  const { data, loading: loadingPrefillData } = useQuery<PrefillRegistartion>(
    PREFILL_REGISTRATION,
    {
      onError: () => {
        setShowNotification(true);
      },
    }
  );
  const [
    isMembershipPending,
    loadingIsMembershipPending,
  ] = useIsMembershipPending({
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
    <PageContent
      isReady={
        !(
          isCheckingAuthState ||
          loadingPrefillData ||
          loadingIsMembershipPending
        )
      }
      loadingText={t('profile.loading')}
      title="registration.pageTitle"
    >
      {data && tunnistamoUser && (
        <CreateYouthProfile
          tunnistamoUser={tunnistamoUser}
          prefillRegistrationData={data}
        />
      )}
      <NotificationComponent
        show={showNotification}
        onClose={() => setShowNotification(false)}
      />
    </PageContent>
  );
}

export default CreateYouthProfilePage;
