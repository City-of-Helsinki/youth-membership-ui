import React from 'react';
import { Switch, Route } from 'react-router';
import { Provider as ReduxProvider } from 'react-redux';
import { OidcProvider, loadUser } from 'redux-oidc';
import { Provider as UrqlProvider } from 'urql';

import store from './redux/store';
import userManager from './oidc/userManager';
import enableOidcLogging from './oidc/enableOidcLogging';
import urqlClient from './graphql/client';
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
        <UrqlProvider value={urqlClient}>
          <Switch>
            <Route path="/callback" component={OidcCallback} />
            <Route path="/" component={Home} exact />
          </Switch>
        </UrqlProvider>
      </OidcProvider>
    </ReduxProvider>
  );
}

export default App;
