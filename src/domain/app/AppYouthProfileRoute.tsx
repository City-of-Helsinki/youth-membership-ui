import React from 'react';
import { RouteProps, RouteComponentProps } from 'react-router';
import { useQuery } from '@apollo/client';
import { loader } from 'graphql.macro';
import { useTranslation } from 'react-i18next';
import { isValid, parseISO } from 'date-fns';

import Redirect from '../../common/reactRouterWithLanguageSupport/Redirect';
import AppPageTitleRoute from './AppPageTitleRoute';
import { HasYouthProfile } from '../../graphql/generatedTypes';
import getCookie from '../../common/helpers/getCookie';
import LoadingContent from '../../common/components/loading/LoadingContent';
import toastNotification from '../../common/helpers/toastNotification/toastNotification';

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

  const { data, loading } = useQuery<HasYouthProfile>(HAS_YOUTH_PROFILE, {
    onError: () => toastNotification(),
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
    </>
  );
}

export default AppYouthProfileRoute;
