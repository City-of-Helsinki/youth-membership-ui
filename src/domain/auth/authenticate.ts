import * as Sentry from '@sentry/browser';

import toastNotification from '../../common/helpers/toastNotification/toastNotification';
import userManager from './userManager';
import store from '../../redux/store';
import { apiError } from './redux';

function authenticate(): void {
  userManager.signinRedirect().catch(error => {
    if (error.message !== 'Network Error') {
      toastNotification();
      Sentry.captureException(error);
    }
    store.dispatch(apiError(error.toString()));
  });
}

export default authenticate;
