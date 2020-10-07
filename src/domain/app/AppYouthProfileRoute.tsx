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
      // It's too difficult to block the profile from being loaded before authentication is finished.
      // Instead we allow the UI to optimistically request the profile before it has the authorisation to do so.
      // Because we ignore the subsequent permissions error, the user experience is not affected.
      // Other errors should be shown to the user and be passed to Sentry.
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
