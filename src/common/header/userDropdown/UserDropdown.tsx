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

    // Shows login text
    if (!isAuthenticated && !loading && !data?.myProfile) {
      return [login];
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
    altText: t('nav.menuButtonLabel'),
    label: !loading ? `${data?.myProfile?.firstName}` : '',
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
