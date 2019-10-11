import { createUserManager } from 'redux-oidc';
import { UserManagerSettings } from 'oidc-client';

/* eslint-disable @typescript-eslint/camelcase */
const settings: UserManagerSettings = {
  authority: process.env.REACT_APP_OIDC_AUTHORITY,
  client_id: process.env.REACT_APP_OIDC_CLIENT_ID,
  client_secret: process.env.REACT_APP_OIDC_CLIENT_SECRET,
  redirect_uri: process.env.REACT_APP_OIDC_REDIRECT_URI,
  response_type: 'id_token',
  scope: process.env.REACT_APP_OIDC_SCOPE,
};
/* eslint-enable @typescript-eslint/camelcase */

const userManager = createUserManager(settings);

export default userManager;
