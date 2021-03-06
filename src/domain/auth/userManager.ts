import { createUserManager } from 'redux-oidc';
import { UserManagerSettings, WebStorageStateStore } from 'oidc-client';

import store from '../../redux/store';
import { fetchApiTokenThunk } from './redux';
import getAuthenticatedUser from './getAuthenticatedUser';

const location = `${window.location.protocol}//${window.location.hostname}${
  window.location.port ? `:${window.location.port}` : ''
}`;

const settings: UserManagerSettings = {
  userStore: new WebStorageStateStore({ store: window.localStorage }),
  authority: process.env.REACT_APP_OIDC_AUTHORITY,
  automaticSilentRenew: true,
  client_id: process.env.REACT_APP_OIDC_CLIENT_ID,
  redirect_uri: `${location}/callback`,
  response_type: 'id_token token',
  scope: process.env.REACT_APP_OIDC_SCOPE,
  silent_redirect_uri: `${location}/silent_renew`,
  post_logout_redirect_uri: `${location}/`,
};

const userManager = createUserManager(settings);

userManager.events.addUserLoaded(async () => {
  const user = await getAuthenticatedUser();
  // eslint-disable-next-line @typescript-eslint/ban-ts-comment
  // @ts-ignore
  store.dispatch(fetchApiTokenThunk(user.access_token));
});

export default userManager;
