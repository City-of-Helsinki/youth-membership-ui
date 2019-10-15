import React from 'react';
import { Switch, Route } from 'react-router';
import { Store } from 'redux-starter-kit';
import { Provider as ReduxProvider } from 'react-redux';
import { OidcProvider, loadUser } from 'redux-oidc';

import userManager from './oidc/userManager';
import enableOidcLogging from './oidc/enableOidcLogging';
import Home from './pages/Home';
import OidcCallback from './pages/OidcCallback';

if (process.env.NODE_ENV !== 'production') {
  enableOidcLogging();
}

type Props = {
  store: Store;
};

function App(props: Props) {
  loadUser(props.store, userManager);
  return (
    <ReduxProvider store={props.store}>
      <OidcProvider store={props.store} userManager={userManager}>
        <Switch>
          <Route path="/callback" component={OidcCallback} />
          <Route path="/" component={Home} exact />
        </Switch>
      </OidcProvider>
    </ReduxProvider>
  );
}

export default App;
