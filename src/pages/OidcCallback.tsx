import React from 'react';
import { CallbackComponent } from 'redux-oidc';
import { RouteChildrenProps } from 'react-router';
import { useTranslation } from 'react-i18next';

import userManager from '../oidc/userManager';

type Props = RouteChildrenProps & {};

function OidcCallback(props: Props) {
  const onSuccess = (user: object) => {
    props.history.push('/');
  };
  const onError = (error: object) => {
    console.error(error);
  };
  const { t } = useTranslation();
  return (
    <CallbackComponent
      successCallback={onSuccess}
      errorCallback={onError}
      userManager={userManager}
    >
      <p>{t('oidc.redirecting')}</p>
    </CallbackComponent>
  );
}

export default OidcCallback;
