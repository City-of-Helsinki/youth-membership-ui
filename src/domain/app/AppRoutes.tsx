import React from 'react';
import { Switch, Route } from 'react-router';

import PageLayout from '../../common/components/layout/PageLayout';
import userManager from '../auth/userManager';
import Login from '../auth/components/login/Login';
import OidcCallback from '../auth/components/oidcCallback/OidcCallback';
import AppYouthProfileRoute from './AppYouthProfileRoute';
import ApproveYouthProfilePage from '../youthProfile/approve/ApproveYouthProfilePage';
import AccessibilityStatement from '../accessibilityStatement/AccessibilityStatement';
import LandingPage from '../landingPage/LandingPage';
import MembershipDetailsPage from '../membership/details/MembershipDetailsPage';
import EditYouthProfilePage from '../youthProfile/edit/EditYouthProfilePage';
import CreateYouthProfilePage from '../youthProfile/create/CreateYouthProfilePage';
import NotFoundPage from '../notFoundPage/NotFoundPage';

function AppRoutes() {
  return (
    <Switch>
      <Route path={['/approve/:approvalToken/:readToken']}>
        <PageLayout variant="approver">
          <Switch>
            <Route
              path="/approve/:approvalToken/:readToken"
              exact
              component={ApproveYouthProfilePage}
            />
          </Switch>
        </PageLayout>
      </Route>
      <Route>
        <PageLayout>
          <Switch>
            <Route path="/login" exact component={Login} />
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
            <Route
              path="/accessibility"
              exact
              component={AccessibilityStatement}
            />
            <Route
              path="/silent_renew"
              render={() => {
                userManager.signinSilentCallback();
                return null;
              }}
            />
            <Route path="/callback" component={OidcCallback} />
            <Route path="*" component={NotFoundPage} />
          </Switch>
        </PageLayout>
      </Route>
    </Switch>
  );
}

export default AppRoutes;
