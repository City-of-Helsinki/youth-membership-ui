import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { Navigation, IconSignout } from 'hds-react';
import { useSelector } from 'react-redux';
import { loader } from 'graphql.macro';
import { useQuery } from '@apollo/react-hooks';
import { useMatomo } from '@datapunt/matomo-tracker-react';

import { NameQuery } from '../../../../graphql/generatedTypes';
import authenticate from '../../../../domain/auth/authenticate';
import logout from '../../../../domain/auth/logout';
import { isAuthenticatedSelector } from '../../../../domain/auth/redux';
import getLanguageCode from '../../../helpers/getLanguageCode';
import NotificationComponent from '../../notification/NotificationComponent';
import { MAIN_CONTENT_ID } from '../PageContent';
import styles from './Header.module.css';

const NAME_QUERY = loader(
  '../../../../domain/youthProfile/graphql/NameQuery.graphql'
);

const languages = {
  fi: 'Suomi',
  sv: 'Svenska',
  en: 'English',
};

// Approver variant is shown for approver view. The approver should not
// be shown the user menu, nor should the header contain links for
// navigating into te front page.
export type HeaderVariant = 'default' | 'approver';

type Props = {
  variant?: HeaderVariant;
};

function Header({ variant = 'default' }: Props) {
  const { t, i18n } = useTranslation();
  const { trackEvent } = useMatomo();
  const [showNotification, setShowNotification] = useState<boolean>(false);
  const isAuthenticated = useSelector(isAuthenticatedSelector);
  const { data } = useQuery<NameQuery>(NAME_QUERY, {
    onError: () => setShowNotification(true),
    skip: !isAuthenticated,
  });

  const handleSignIn = () => {
    trackEvent({ category: 'action', action: 'Log in' });
    authenticate();
  };

  const handleSignOut = (e: React.SyntheticEvent<HTMLAnchorElement>) => {
    e.preventDefault();
    trackEvent({ category: 'action', action: 'Log out' });
    logout();
  };

  const handleSetLanguage = (
    e: React.SyntheticEvent<HTMLAnchorElement>,
    normalizedLanguageCode: string
  ) => {
    e.preventDefault();
    i18n.changeLanguage(normalizedLanguageCode);
  };

  const isDefaultVariant = variant === 'default';
  const isApproverVariant = variant === 'approver';
  const normalizedLanguageCode = getLanguageCode(
    i18n.languages[0]
  ) as keyof typeof languages;
  const logoLanguage = normalizedLanguageCode === 'sv' ? 'sv' : 'fi';
  const userName = data?.myProfile?.firstName;
  const isCreatingProfile = isAuthenticated && !userName;
  const titleUrl = isApproverVariant ? window.location.href : '/';

  return (
    <>
      <Navigation
        className={styles.header}
        title={t('appName')}
        titleAriaLabel={`${t('nav.helsinki')}: ${t('appName')}`}
        titleUrl={titleUrl}
        skipTo={`#${MAIN_CONTENT_ID}`}
        skipToContentLabel={t('nav.skipToContent')}
        menuToggleAriaLabel={t('nav.menu')}
        logoLanguage={logoLanguage}
      >
        <Navigation.Actions>
          <Navigation.LanguageSelector
            label={normalizedLanguageCode.toUpperCase()}
            buttonAriaLabel={languages[normalizedLanguageCode]}
          >
            {Object.entries(languages).map(
              ([normalizedLanguageCode, label]) => (
                <Navigation.Item
                  key={normalizedLanguageCode}
                  href="#"
                  onClick={(e: React.SyntheticEvent<HTMLAnchorElement>) =>
                    handleSetLanguage(e, normalizedLanguageCode)
                  }
                  label={label}
                  lang={normalizedLanguageCode}
                />
              )
            )}
          </Navigation.LanguageSelector>
          {isCreatingProfile && (
            <Navigation.Item
              href="#"
              onClick={handleSignOut}
              variant="supplementary"
              label={t('nav.signout')}
              icon={<IconSignout aria-hidden />}
              className={styles.fakeAction}
            />
          )}
          {isDefaultVariant && !isCreatingProfile && (
            <Navigation.User
              authenticated={isAuthenticated}
              buttonAriaLabel={`User: ${userName}`}
              label={t('nav.signin')}
              onSignIn={handleSignIn}
              userName={userName}
            >
              <Navigation.Item
                href={process.env.REACT_APP_PROFILE_LINK}
                variant="secondary"
                label={t('nav.profile')}
              />
              <Navigation.Item
                href="#"
                onClick={handleSignOut}
                variant="supplementary"
                label={t('nav.signout')}
                icon={<IconSignout aria-hidden />}
              />
            </Navigation.User>
          )}
        </Navigation.Actions>
      </Navigation>
      <NotificationComponent
        show={showNotification}
        onClose={() => setShowNotification(false)}
      />
    </>
  );
}

export default Header;
