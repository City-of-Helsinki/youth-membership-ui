import React, { useState } from 'react';
import { CallbackComponent } from 'redux-oidc';
import { RouteChildrenProps } from 'react-router';
import { useTranslation } from 'react-i18next';
import * as Sentry from '@sentry/browser';

import InfoPageLayout from '../../../../common/components/layout/InfoPageLayout';
import LoadingContent from '../../../../common/components/loading/LoadingContent';
import userManager from '../../userManager';

type AuthenticationError =
  | 'deviceTimeError'
  | 'permissionDeniedByUserError'
  | 'unknown';

// eslint-disable-next-line max-len
// https://github.com/City-of-Helsinki/kukkuu-ui/blob/0c708490d8202ff9828a76f2bc5b9c59bce76550/src/domain/auth/OidcCallback.tsx
function OidcCallback({ history }: RouteChildrenProps) {
  const { t } = useTranslation();
  const [
    authenticationError,
    setAuthenticationError,
  ] = useState<AuthenticationError | null>(null);

  const onSuccess = () => {
    // Use replace in order to hide the callback view from history.
    history.replace('/');
  };

  const onError = (error: Error) => {
    // Handle error caused by device time being more than 5 minutes off:
    if (
      error.message.includes('iat is in the future') ||
      error.message.includes('exp is in the past')
    ) {
      setAuthenticationError('deviceTimeError');
    } else if (
      // Handle error caused by end user choosing Deny in Tunnistamo's
      // permission request
      error.message ===
      'The resource owner or authorization server denied the request'
    ) {
      setAuthenticationError('permissionDeniedByUserError');
    } else {
      // Send other errors to Sentry for analysis
      Sentry.captureException(error);
      // Give user a generic error
      setAuthenticationError('unknown');
    }
  };

  const isLoading = !authenticationError;
  const isDeviceTimeError = authenticationError === 'deviceTimeError';
  const isPermissionDeniedByUserError =
    authenticationError === 'permissionDeniedByUserError';
  const isUnknownError = authenticationError === 'unknown';

  return (
    <CallbackComponent
      successCallback={onSuccess}
      errorCallback={onError}
      userManager={userManager}
    >
      <>
        <LoadingContent
          isLoading={isLoading}
          loadingText={t('oidc.authenticating')}
        />
        {isDeviceTimeError && (
          <InfoPageLayout
            title={t('authentication.errorTitle')}
            description={t('authentication.deviceTimeError.message')}
          />
        )}
        {isPermissionDeniedByUserError && (
          <InfoPageLayout
            title={t('authentication.errorTitle')}
            description={t('authentication.permRequestDenied.message')}
          />
        )}
        {isUnknownError && (
          <InfoPageLayout
            title={t('authentication.errorTitle')}
            description={t('authentication.errorMessage')}
          />
        )}
      </>
    </CallbackComponent>
  );
}

export default OidcCallback;
