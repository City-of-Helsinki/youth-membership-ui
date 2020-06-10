import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import { useLazyQuery } from '@apollo/react-hooks';
import { useTranslation } from 'react-i18next';
import { loader } from 'graphql.macro';
import { useMatomo } from '@datapunt/matomo-tracker-react';

import PersonIcon from '../../svg/Person.svg';
import { NameQuery } from '../../../graphql/generatedTypes';
import Dropdown from '../../dropdown/Dropdown';
import authenticate from '../../../auth/authenticate';
import logout from '../../../auth/logout';
import { isAuthenticatedSelector } from '../../../auth/redux';
import NotificationComponent from '../../notification/NotificationComponent';

const NAME_QUERY = loader(
  '../../../../src/pages/membership/graphql/NameQuery.graphql'
);

type Props = {};

function UserDropdown(props: Props) {
  const [showNotification, setShowNotification] = useState(false);
  const [nameQuery, { data, loading }] = useLazyQuery<NameQuery>(NAME_QUERY, {
    onError: () => setShowNotification(true),
  });
  const { t } = useTranslation();
  const { trackEvent } = useMatomo();

  const isAuthenticated = useSelector(isAuthenticatedSelector);

  React.useEffect(() => {
    if (isAuthenticated) {
      nameQuery();
    }
  }, [isAuthenticated, nameQuery]);

  const getDropdownOptions = () => {
    if (loading) return [login];

    // Shows logout in registration form
    if (isAuthenticated && !loading && !data?.myProfile) {
      return [logOut];
    }

    // Shows login text
    if (!isAuthenticated && !loading && !data?.myProfile) {
      return [login];
    }

    return [user, profile, logOut];
  };

  const login = {
    id: 'loginButton',
    label: t('nav.signin'),
    onClick: () => {
      trackEvent({ category: 'action', action: 'Log in' });
      authenticate();
    },
  };

  const user = {
    id: 'userButton',
    icon: PersonIcon,
    altText: t('nav.menuButtonLabel'),
    label: !loading ? `${data?.myProfile?.firstName}` : '',
  };

  const profile = {
    id: 'profileButton',
    label: t('nav.profile'),
    url: process.env.REACT_APP_PROFILE_LINK,
  };

  const logOut = {
    id: 'logoutButton',
    label: t('nav.signout'),
    onClick: () => {
      trackEvent({ category: 'action', action: 'Log out' });
      logout();
    },
  };

  const dropdownOptions = getDropdownOptions();

  return (
    <React.Fragment>
      <Dropdown options={dropdownOptions} />
      <NotificationComponent
        show={showNotification}
        onClose={() => setShowNotification(false)}
      />
    </React.Fragment>
  );
}

export default UserDropdown;
