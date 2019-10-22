import React from 'react';
import { Switch, Route } from 'react-router';
import { Provider as ReduxProvider } from 'react-redux';
import { OidcProvider, loadUser } from 'redux-oidc';
import { ApolloProvider } from '@apollo/react-hooks';

import store from './redux/store';
import userManager from './oidc/userManager';
import enableOidcLogging from './oidc/enableOidcLogging';
import graphqlClient from './graphql/client';
import Home from './pages/Home';
import OidcCallback from './pages/OidcCallback';

if (process.env.NODE_ENV !== 'production') {
  enableOidcLogging();
}

loadUser(store, userManager);

type Props = {};

function App(props: Props) {
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
