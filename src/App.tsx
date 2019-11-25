import React from 'react';
import { Switch, Route } from 'react-router';
import { Provider as ReduxProvider } from 'react-redux';
import { OidcProvider, loadUser } from 'redux-oidc';
import { ApolloProvider } from '@apollo/react-hooks';

import store from './redux/store';
import userManager from './auth/userManager';
import enableOidcLogging from './auth/enableOidcLogging';
import graphqlClient from './graphql/client';
import Home from './pages/Home';
import OidcCallback from './pages/OidcCallback';
import Registration from './pages/memberhsip/components/membership/Membership';
import { fetchApiTokenThunk } from './auth/redux';

if (process.env.NODE_ENV !== 'production') {
  enableOidcLogging();
}

loadUser(store, userManager).then(async user => {
  if (user) {
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
            <Route path="/callback" component={OidcCallback} />
            <Route path="/" component={Home} exact />
            <Route path="/registration" component={Registration} exact />
          </Switch>
        </ApolloProvider>
      </OidcProvider>
    </ReduxProvider>
  );
}

export default App;
