import React, { useState, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { useQuery } from '@apollo/client';
import { loader } from 'graphql.macro';
import { User } from 'oidc-client';

import {
  MembershipStatus,
  PrefillRegistartion,
} from '../../../graphql/generatedTypes';
import useHistory from '../../../common/reactRouterWithLanguageSupport/useHistory';
import Redirect from '../../../common/reactRouterWithLanguageSupport/Redirect';
import PageContent from '../../../common/components/layout/PageContent';
import toastNotification from '../../../common/helpers/toastNotification/toastNotification';
import getAuthenticatedUser from '../../auth/getAuthenticatedUser';
import useMembershipStatus from '../../membership/useMembershipStatus';
import CreateYouthProfile from './CreateYouthProfile';

const PREFILL_REGISTRATION = loader('../graphql/PrefillRegistration.graphql');

function CreateYouthProfilePage() {
  const { t } = useTranslation();
  const history = useHistory();
  const [tunnistamoUser, setTunnistamoUser] = useState<User | null>(null);
  const [isCheckingAuthState, setIsCheckingAuthState] = useState(true);
  const { data, loading: loadingPrefillData } = useQuery<PrefillRegistartion>(
    PREFILL_REGISTRATION,
    {
      onError: () => {
        toastNotification();
      },
    }
  );
  const [membershipStatus, loadingIsMembershipPending] = useMembershipStatus({
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

  if (membershipStatus === MembershipStatus.PENDING) {
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
    </PageContent>
  );
}

export default CreateYouthProfilePage;
