import { createUserManager } from 'redux-oidc';
import { UserManagerSettings } from 'oidc-client';

const location = `${window.location.protocol}//${window.location.hostname}${
  window.location.port ? `:${window.location.port}` : ''
}`;

const settings: UserManagerSettings = {
  authority: process.env.REACT_APP_OIDC_AUTHORITY,
  client_id: process.env.REACT_APP_OIDC_CLIENT_ID,
  redirect_uri: `${location}/callback`,
  response_type: 'id_token token',
  scope: process.env.REACT_APP_OIDC_SCOPE,
};

const userManager = createUserManager(settings);

export default userManager;
