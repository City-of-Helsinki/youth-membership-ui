import React, { useEffect } from 'react';
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
import { fetchApiTokenThunk } from './auth/redux';

if (process.env.NODE_ENV !== 'production') {
  enableOidcLogging();
}

type Props = {};

function App(props: Props) {
  useEffect(() => {
    loadUser(store, userManager).then(async user => {
      if (user) {
        store.dispatch(fetchApiTokenThunk(user.access_token));
      }
    });
  }, []);
  return (
    <ReduxProvider store={store}>
      <OidcProvider store={store} userManager={userManager}>
        <ApolloProvider client={graphqlClient}>
          <Switch>
            <Route path="/callback" component={OidcCallback} />
            <Route path="/" component={Home} exact />
          </Switch>
        </ApolloProvider>
      </OidcProvider>
    </ReduxProvider>
  );
}

export default App;
