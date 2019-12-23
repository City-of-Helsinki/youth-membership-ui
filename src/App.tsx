import React from 'react';
import { Switch, Route } from 'react-router';
import { ApolloProvider } from '@apollo/react-hooks';
import { Provider as ReduxProvider } from 'react-redux';
import { OidcProvider, loadUser } from 'redux-oidc';

import graphqlClient from './graphql/client';
import store from './redux/store';
import userManager from './auth/userManager';
import enableOidcLogging from './auth/enableOidcLogging';
import Login from './auth/components/login/Login';
import OidcCallback from './auth/components/oidcCallback/OidcCallback';
import YouthProfile from './pages/memberhsip/components/youthProfile/YouthProfile';
import { fetchApiTokenThunk } from './auth/redux';

if (process.env.NODE_ENV !== 'production') {
  enableOidcLogging();
}

loadUser(store, userManager).then(async user => {
  if (user && !user.expired) {
    store.dispatch(fetchApiTokenThunk(user.access_token));
  }
});

type Props = {};

function App(props: Props) {
  return (
    <ReduxProvider store={store}>
      <OidcProvider store={store} userManager={userManager}>
        <ApolloProvider client={graphqlClient}>
          <Switch>
            <Route
              path="/silent_renew"
              render={() => {
                userManager.signinSilentCallback();
                return null;
              }}
            />
            <Route path="/callback">
              <OidcCallback />
            </Route>
            <Route path="/login">
              <Login />
            </Route>
            <Route path="/" exact>
              <YouthProfile />
            </Route>
            <Route path="*">404 - not found</Route>
          </Switch>
        </ApolloProvider>
      </OidcProvider>
    </ReduxProvider>
  );
}

export default App;
