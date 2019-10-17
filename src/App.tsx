import React from 'react';
import { Switch, Route } from 'react-router';
import { Provider as ReduxProvider } from 'react-redux';
import { OidcProvider, loadUser } from 'redux-oidc';

import store from './redux/store';
import userManager from './oidc/userManager';
import enableOidcLogging from './oidc/enableOidcLogging';
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
        <Switch>
          <Route path="/callback" component={OidcCallback} />
          <Route path="/" component={Home} exact />
        </Switch>
      </OidcProvider>
    </ReduxProvider>
  );
}

export default App;
