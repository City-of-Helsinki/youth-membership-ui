import React from 'react';
import { useSelector } from 'react-redux';
import { useQuery } from '@apollo/react-hooks';
import { useTranslation } from 'react-i18next';
import { loader } from 'graphql.macro';

import PersonIcon from '../../svg/Person.svg';
import { MembershipDetails } from '../../../graphql/generatedTypes';
import Dropdown from '../../dropdown/Dropdown';
import authenticate from '../../../auth/authenticate';
import logout from '../../../auth/logout';
import { isAuthenticatedSelector } from '../../../auth/redux';

const MEMBERSHIP_DETAILS = loader(
  '../../../../src/pages/membership/graphql/MembershipDetails.graphql'
);

type Props = {};

function UserDropdown(props: Props) {
  const { data, loading } = useQuery<MembershipDetails>(MEMBERSHIP_DETAILS);
  const { t } = useTranslation();

  const login = {
    id: 'loginButton',
    label: t('nav.signin'),
    onClick: () => authenticate(),
  };

  const user = {
    id: 'userButton',
    icon: PersonIcon,
    label: !loading
      ? `${data?.youthProfile?.profile.firstName} ${data?.youthProfile?.profile.lastName}`
      : '',
  };

  const logOut = {
    id: 'logoutButton',
    label: t('nav.signout'),
    onClick: () => logout(),
  };

  const isAuthenticated = useSelector(isAuthenticatedSelector);

  const dropdownOptions =
    isAuthenticated && !loading ? [user, logOut] : [login];

  return <Dropdown options={dropdownOptions} />;
}

export default UserDropdown;
