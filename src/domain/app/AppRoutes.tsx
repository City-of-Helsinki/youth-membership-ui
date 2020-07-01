import React from 'react';
import { Switch, Route } from 'react-router';

import userManager from '../../domain/auth/userManager';
import Login from '../../domain/auth/components/login/Login';
import OidcCallback from '../../domain/auth/components/oidcCallback/OidcCallback';
import AppYouthProfileRoute from './AppYouthProfileRoute';
import ApproveYouthProfile from '../youthProfile/approve/ApproveYouthProfile';
import AccessibilityStatement from '../accessibilityStatement/AccessibilityStatement';
import LandingPage from '../landingPage/LandingPage';
import MembershipDetailsPage from '../membership/details/MembershipDetailsPage';
import EditYouthProfilePage from '../youthProfile/edit/EditYouthProfilePage';
import CreateYouthProfilePage from '../youthProfile/create/CreateYouthProfilePage';

function AppRoutes() {
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
      <AppYouthProfileRoute path="/" exact component={LandingPage} />
      <AppYouthProfileRoute
        path="/membership-details"
        exact
        component={MembershipDetailsPage}
      />
      <AppYouthProfileRoute
        path="/edit"
        exact
        component={EditYouthProfilePage}
      />
      <Route path="/create" exact component={CreateYouthProfilePage} />
      <Route path="/approve/:token" exact component={ApproveYouthProfile} />
      <Route path="/accessibility" exact component={AccessibilityStatement} />
      <Route path="*">404 - not found</Route>
    </Switch>
  );
}

export default AppRoutes;
