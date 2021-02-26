import React from 'react';
import { ApolloProvider } from '@apollo/client';
import { Provider as ReduxProvider } from 'react-redux';
import { OidcProvider, loadUser } from 'redux-oidc';
import { MatomoProvider, createInstance } from '@datapunt/matomo-tracker-react';
import countries from 'i18n-iso-countries';
import fi from 'i18n-iso-countries/langs/fi.json';
import en from 'i18n-iso-countries/langs/en.json';
import sv from 'i18n-iso-countries/langs/sv.json';
import { HelmetProvider } from 'react-helmet-async';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import graphqlClient from '../../graphql/client';
import store from '../../redux/store';
import AriaLiveProvider from '../../common/ariaLive/AriaLiveProvider';
import userManager from '../../domain/auth/userManager';
import enableOidcLogging from '../../domain/auth/enableOidcLogging';
import { fetchApiTokenThunk } from '../../domain/auth/redux';
import logout from '../../domain/auth/logout';
import authConstants from '../../domain/auth/constants/authConstants';
import authenticate from '../../domain/auth/authenticate';
import AppMeta from './AppMeta';
import AppRoutes from './AppRoutes';
import AppTitleAnnouncer from './AppTitleAnnouncer';
import styles from './app.module.css';

countries.registerLocale(fi);
countries.registerLocale(en);
countries.registerLocale(sv);

if (process.env.NODE_ENV !== 'production') {
  enableOidcLogging();
}

loadUser(store, userManager).then(async user => {
  if (user && !user.expired) {
    store.dispatch(fetchApiTokenThunk(user.access_token));
  }
});

const instance = createInstance({
  urlBase: 'https://analytics.hel.ninja/',
  siteId: 59,
});

// Prevent non-production data from being submitted to Matomo
// by pretending to require consent to process analytics data and never ask for it.
// https://developer.matomo.org/guides/tracking-javascript-guide#step-1-require-consent
if (process.env.REACT_APP_ENVIRONMENT !== 'production') {
  window._paq.push(['requireConsent']);
}

function App() {
  window.addEventListener('storage', event => {
    if (
      event.key === authConstants.OIDC_KEY &&
      event.oldValue &&
      !event.newValue
    ) {
      logout();
    }
    if (
      event.key === authConstants.OIDC_KEY &&
      !event.oldValue &&
      event.newValue
    )
      authenticate();
  });

  return (
    <AriaLiveProvider>
      <ReduxProvider store={store}>
        <OidcProvider store={store} userManager={userManager}>
          <ApolloProvider client={graphqlClient}>
            <MatomoProvider value={instance}>
              <HelmetProvider>
                <AppTitleAnnouncer />
                <AppMeta />
                <AppRoutes />
              </HelmetProvider>
            </MatomoProvider>
          </ApolloProvider>
        </OidcProvider>
        <ToastContainer closeButton={false} className={styles.toastContainer} />
      </ReduxProvider>
    </AriaLiveProvider>
  );
}

export default App;
