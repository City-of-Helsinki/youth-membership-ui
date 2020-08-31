import React from 'react';
import { CallbackComponent } from 'redux-oidc';
import { useHistory } from 'react-router';
import { useTranslation } from 'react-i18next';
import * as Sentry from '@sentry/browser';

import LoadingContent from '../../../../common/components/loading/LoadingContent';
import userManager from '../../userManager';

type Props = {};

function OidcCallback(props: Props) {
  const history = useHistory();
  const onSuccess = (user: object) => {
    history.push('/');
  };
  const onError = (error: object) => {
    Sentry.captureException(error);
    history.push('/');
  };
  const { t } = useTranslation();
  return (
    <CallbackComponent
      successCallback={onSuccess}
      errorCallback={onError}
      userManager={userManager}
    >
      <LoadingContent isLoading={true} loadingText={t('oidc.authenticating')} />
    </CallbackComponent>
  );
}

export default OidcCallback;
