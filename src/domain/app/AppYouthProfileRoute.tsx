import React, { useState } from 'react';
import { Route, Redirect, RouteProps } from 'react-router';
import { useQuery } from '@apollo/react-hooks';
import { loader } from 'graphql.macro';
import * as Sentry from '@sentry/browser';
import { useTranslation } from 'react-i18next';
import { isValid, parseISO } from 'date-fns';

import { HasYouthProfile } from '../../graphql/generatedTypes';
import getCookie from '../../common/helpers/getCookie';
import LoadingContent from '../../common/components/loading/LoadingContent';
import NotificationComponent from '../../common/components/notification/NotificationComponent';
import authConstants from '../auth/constants/authConstants';

const HAS_YOUTH_PROFILE = loader(
  '../youthProfile/graphql/HasYouthProfile.graphql'
);

type Props = RouteProps;

function AppYouthProfileRoute(props: Props) {
  const { t } = useTranslation();
  const [showNotification, setShowNotification] = useState<boolean>(false);

  const { data, loading } = useQuery<HasYouthProfile>(HAS_YOUTH_PROFILE, {
    onError: error => {
      // Ignore permission errors. This decision was made based on the difficulty to add enough checks that slow down Redirecting.
      // Using useLazyQuery with isAuthenticatedSelector won't fetch profile information fast enough and user is always
      // redirected to LoginPage. If in the future permission error causes application to crash, some kind of custom hook is necessary.
      error.graphQLErrors.forEach(qlError => {
        if (qlError.message !== authConstants.PERMISSION_DENIED) {
          Sentry.captureException(qlError);
          setShowNotification(true);
        }
      });
    },
  });

  const isYouthProfileFound = Boolean(data?.myProfile?.youthProfile);
  const birthDate = getCookie('birthDate');
  const isBirthDateValid = isValid(parseISO(birthDate));

  return (
    <>
      <LoadingContent isLoading={loading} loadingText={t('profile.verifying')}>
        {isYouthProfileFound ? (
          <Route {...props} />
        ) : !isBirthDateValid ? (
          <Redirect to="/login" />
        ) : (
          <Redirect to="/create" />
        )}
      </LoadingContent>
      <NotificationComponent
        show={showNotification}
        onClose={() => setShowNotification(false)}
      />
    </>
  );
}

export default AppYouthProfileRoute;
