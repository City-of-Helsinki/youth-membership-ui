import React from 'react';
import { Switch, Route } from 'react-router';

import userManager from '../../domain/auth/userManager';
import Login from '../../domain/auth/components/login/Login';
import OidcCallback from '../../domain/auth/components/oidcCallback/OidcCallback';
import YouthProfile from '../youthProfile/YouthProfile';
import ApproveYouthProfile from '../youthProfile/approve/ApproveYouthProfile';
import AccessibilityStatement from '../accessibilityStatement/AccessibilityStatement';

type Props = {};

function AppRoutes(props: Props) {
  return (
    <Switch>
      <Route
        path="/silent_renew"
        render={() => {
          userManager.signinSilentCallback();
          return null;
        }}
      />
      <Route path="/callback" component={OidcCallback} />
      <Route path="/login" component={Login} />
      <Route path={['/', '/membership-details', '/edit']} exact>
        <YouthProfile />
      </Route>
      <Route path="/approve/:token" exact component={ApproveYouthProfile} />
      <Route path="/accessibility" exact component={AccessibilityStatement} />
      <Route path="*">404 - not found</Route>
    </Switch>
  );
}

export default AppRoutes;
