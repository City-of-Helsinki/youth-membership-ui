import React from 'react';

import PageLayout from '../../common/components/layout/PageLayout';
import Switch from '../../common/reactRouterWithLanguageSupport/Switch';
import Route from '../../common/reactRouterWithLanguageSupport/Route';
import userManager from '../auth/userManager';
import Login from '../auth/components/login/Login';
import OidcCallback from '../auth/components/oidcCallback/OidcCallback';
import AppPageTitleRoute from './AppPageTitleRoute';
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
      <Route path="/approve/:approvalToken/:readToken">
        <PageLayout variant="approver">
          <Switch>
            <AppPageTitleRoute
              path="/approve/:approvalToken/:readToken"
              exact
              component={ApproveYouthProfilePage}
              pageTitle="approval.title"
            />
          </Switch>
        </PageLayout>
      </Route>
      <Route isLanguageAgnostic>
        <PageLayout>
          <Switch>
            <Route
              isLanguageAgnostic
              exact
              path="/callback"
              component={OidcCallback}
            />
            <Route
              isLanguageAgnostic
              exact
              path="/silent_renew"
              render={() => {
                userManager.signinSilentCallback();
                return null;
              }}
            />
            <AppPageTitleRoute
              path="/login"
              exact
              component={Login}
              pageTitle="login.pageTitle"
            />
            <AppYouthProfileRoute
              path="/"
              exact
              component={LandingPage}
              pageTitle="membershipInformation.pageTitle"
            />
            <AppYouthProfileRoute
              path="/membership-details"
              exact
              component={MembershipDetailsPage}
              pageTitle="membershipDetails.title"
            />
            <AppYouthProfileRoute
              path="/edit"
              exact
              component={EditYouthProfilePage}
              pageTitle="edit.pageTitle"
            />
            <AppPageTitleRoute
              path="/create"
              exact
              component={CreateYouthProfilePage}
              pageTitle="registration.pageTitle"
            />
            <AppPageTitleRoute
              path="/accessibility"
              exact
              component={AccessibilityStatement}
              pageTitle="footer.accessibility"
            />
            <Route path="*" component={NotFoundPage} />
          </Switch>
        </PageLayout>
      </Route>
    </Switch>
  );
}

export default AppRoutes;
