import * as Sentry from '@sentry/browser';

import userManager from './userManager';
import store from '../../redux/store';
import { apiError } from './redux';
import authConstants from './constants/authConstants';

function logout(): void {
  // Reset birthDate cookie here. This way we will never run to a problem
  // where user is redirected to registration from without or with wrong birthDate
  document.cookie = 'birthDate=';
  // Clear oidc.user from localStorage
  window.localStorage.removeItem(authConstants.OIDC_KEY);
  userManager.signoutRedirect().catch(e => {
    Sentry.captureException(e);
    store.dispatch(apiError(e.toString()));
  });
}

export default logout;
