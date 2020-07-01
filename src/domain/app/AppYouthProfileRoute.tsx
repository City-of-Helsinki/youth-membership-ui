import React, { useState } from 'react';
import { Route, Redirect, RouteProps } from 'react-router';
import { useQuery } from '@apollo/react-hooks';
import { loader } from 'graphql.macro';
import * as Sentry from '@sentry/browser';
import { useTranslation } from 'react-i18next';

import { HasYouthProfile } from '../../graphql/generatedTypes';
import getCookie from '../../common/helpers/getCookie';
import Loading from '../../common/components/loading/Loading';
import NotificationComponent from '../../common/components/notification/NotificationComponent';

const HAS_YOUTH_PROFILE = loader(
  '../youthProfile/graphql/HasYouthProfile.graphql'
);

type Props = RouteProps;

function AppYouthProfileRoute(props: Props) {
  const { t } = useTranslation();
  const [showNotification, setShowNotification] = useState(false);
  const { data, loading } = useQuery<HasYouthProfile>(HAS_YOUTH_PROFILE, {
    onError: (error: Error) => {
      Sentry.captureException(error);
      setShowNotification(true);
    },
    fetchPolicy: 'network-only',
  });

  const isYouthProfileFound = Boolean(data?.myProfile?.youthProfile);
  const birthDate = getCookie('birthDate');

  return (
    <>
      <Loading
        loadingClassName="unused"
        isLoading={loading}
        loadingText={t('profile.verifying')}
      >
        {isYouthProfileFound ? (
          <Route {...props} />
        ) : !birthDate ? (
          <Redirect to="/login" />
        ) : (
          <Redirect to="/create" />
        )}
      </Loading>
      <NotificationComponent
        show={showNotification}
        onClose={() => setShowNotification(false)}
      />
    </>
  );
}

export default AppYouthProfileRoute;
