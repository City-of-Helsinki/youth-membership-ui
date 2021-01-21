import React, { useState } from 'react';
import { Redirect, RouteProps, RouteComponentProps } from 'react-router';
import { useQuery } from '@apollo/react-hooks';
import { loader } from 'graphql.macro';
import { useTranslation } from 'react-i18next';
import { isValid, parseISO } from 'date-fns';

import AppPageTitleRoute from './AppPageTitleRoute';
import { HasYouthProfile } from '../../graphql/generatedTypes';
import getCookie from '../../common/helpers/getCookie';
import LoadingContent from '../../common/components/loading/LoadingContent';
import NotificationComponent from '../../common/components/notification/NotificationComponent';

const HAS_YOUTH_PROFILE = loader(
  '../youthProfile/graphql/HasYouthProfile.graphql'
);

interface Props extends RouteProps {
  component: // eslint-disable-next-line @typescript-eslint/no-explicit-any
  | React.ComponentType<RouteComponentProps<any>>
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    | React.ComponentType<any>;
  pageTitle: string;
}

function AppYouthProfileRoute({
  component: Component,
  pageTitle,
  ...rest
}: Props) {
  const { t } = useTranslation();
  const [showNotification, setShowNotification] = useState<boolean>(false);

  const { data, loading } = useQuery<HasYouthProfile>(HAS_YOUTH_PROFILE, {
    onError: () => {
      setShowNotification(true);
    },
  });

  const isYouthProfileFound = Boolean(data?.myYouthProfile?.membershipStatus);
  const birthDate = getCookie('birthDate');
  const isBirthDateValid = isValid(parseISO(birthDate));

  return (
    <>
      <AppPageTitleRoute
        pageTitle={pageTitle}
        {...rest}
        render={(routeComponentProps: RouteComponentProps) => {
          return (
            <LoadingContent
              isLoading={loading}
              loadingText={t('profile.verifying')}
            >
              {isYouthProfileFound ? (
                <Component {...routeComponentProps} />
              ) : !isBirthDateValid ? (
                <Redirect to="/login" />
              ) : (
                <Redirect to="/create" />
              )}
            </LoadingContent>
          );
        }}
      />
      <NotificationComponent
        show={showNotification}
        onClose={() => setShowNotification(false)}
      />
    </>
  );
}

export default AppYouthProfileRoute;
