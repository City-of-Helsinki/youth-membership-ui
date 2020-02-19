import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import { useLazyQuery } from '@apollo/react-hooks';
import { useTranslation } from 'react-i18next';
import { loader } from 'graphql.macro';

import PersonIcon from '../../svg/Person.svg';
import { NameQuery } from '../../../graphql/generatedTypes';
import Dropdown from '../../dropdown/Dropdown';
import authenticate from '../../../auth/authenticate';
import logout from '../../../auth/logout';
import { isAuthenticatedSelector } from '../../../auth/redux';
import NotificationComponent from '../../notification/NotificationComponent';
import commonConstants from '../../constants/commonConstants';

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

    // Shows nothing for now in login page
    if (!isAuthenticated && !loading && !data?.myProfile) {
      return [empty];
    }

    return [user, profile, logOut];
  };

  const login = {
    id: 'loginButton',
    label: t('nav.signin'),
    onClick: () => authenticate(),
  };

  const user = {
    id: 'userButton',
    icon: PersonIcon,
    label: !loading
      ? `${data?.myProfile?.firstName} ${data?.myProfile?.lastName}`
      : '',
  };

  const profile = {
    id: 'profileButton',
    label: 'Profiili',
    url: commonConstants.URLS.HELSINKI_PROFILE_URL,
  };

  const logOut = {
    id: 'logoutButton',
    label: t('nav.signout'),
    onClick: () => logout(),
  };

  // This is just a placeholder and will be removed when OM - 478
  // is done. If user is able to authenticate and doesn't have youth profile he is
  // redirected to registration form. If there is no birthdate
  // in the cookies, it will cause whole application to crash.
  const empty = {
    id: 'emptyId',
    label: ' ',
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
