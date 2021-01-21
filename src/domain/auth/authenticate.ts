import * as Sentry from '@sentry/browser';

import userManager from './userManager';
import store from '../../redux/store';
import { apiError } from './redux';

function authenticate(): void {
  userManager.signinRedirect().catch(error => {
    if (error.message !== 'Network Error') {
      Sentry.captureException(error);
    }
    store.dispatch(apiError(error.toString()));
  });
}

export default authenticate;
