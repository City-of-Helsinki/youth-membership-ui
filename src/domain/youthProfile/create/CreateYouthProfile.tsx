/* eslint-disable sort-keys */
import React, { useState } from 'react';
import { User } from 'oidc-client';
import { useMutation } from '@apollo/react-hooks';
import { loader } from 'graphql.macro';
import * as Sentry from '@sentry/browser';
import { useTranslation } from 'react-i18next';
import { useMatomo } from '@datapunt/matomo-tracker-react';
import { useHistory } from 'react-router';

import {
  AddServiceConnection as AddServiceConnectionData,
  AddServiceConnectionVariables,
  CreateMyProfile as CreateMyProfileData,
  CreateMyProfileVariables,
  Language,
  PrefillRegistartion,
  ServiceType,
  UpdateMyProfile as UpdateMyProfileData,
  UpdateMyProfileVariables,
  YouthLanguage,
  PrefillRegistartion_myProfile_primaryAddress as PrimaryAddress,
} from '../../../graphql/generatedTypes';
import NotificationComponent from '../../../common/components/notification/NotificationComponent';
import getCookie from '../../../common/helpers/getCookie';
import { getMutationVariables } from '../helpers/createProfileMutationVariables';
import getLanguageCode from '../../../common/helpers/getLanguageCode';
import getAddressesFromNode from '../../membership/helpers/getAddressesFromNode';
import YouthProfileForm, {
  Values as FormValues,
} from '../form/YouthProfileForm';
import styles from './createYouthProfile.module.css';

const CREATE_PROFILE = loader('../graphql/CreateMyProfile.graphql');
const ADD_SERVICE_CONNECTION = loader(
  '../graphql/AddServiceConnection.graphql'
);
const UPDATE_PROFILE = loader('../graphql/UpdateMyProfile.graphql');

type Props = {
  tunnistamoUser: User;
  prefillRegistrationData: PrefillRegistartion;
};

function CreateYouthProfile({
  tunnistamoUser,
  prefillRegistrationData,
}: Props) {
  const [showNotification, setShowNotification] = useState(false);
  const { i18n } = useTranslation();
  const { trackEvent } = useMatomo();
  const history = useHistory();

  const [createProfile, { loading }] = useMutation<
    CreateMyProfileData,
    CreateMyProfileVariables
  >(CREATE_PROFILE);

  const [addServiceConnection] = useMutation<
    AddServiceConnectionData,
    AddServiceConnectionVariables
  >(ADD_SERVICE_CONNECTION, {
    refetchQueries: ['HasYouthProfile'],
    awaitRefetchQueries: true,
  });

  const [updateProfile] = useMutation<
    UpdateMyProfileData,
    UpdateMyProfileVariables
  >(UPDATE_PROFILE);

  const birthDate = getCookie('birthDate');

  const connectService = () => {
    // TODO after back end supports editing serviceConnections change enabled from true to false
    const connectionVariables: AddServiceConnectionVariables = {
      input: {
        serviceConnection: {
          service: {
            type: ServiceType.YOUTH_MEMBERSHIP,
          },
          enabled: true,
        },
      },
    };

    addServiceConnection({ variables: connectionVariables })
      .then(() => {
        history.push('/');
      })
      .catch((error: Error) => {
        Sentry.captureException(error);
        setShowNotification(true);
      });
  };

  const handleOnValues = (formValues: FormValues) => {
    const variables: CreateMyProfileVariables = getMutationVariables(
      formValues,
      prefillRegistrationData
    );

    if (prefillRegistrationData?.myProfile) {
      updateProfile({ variables })
        .then(result => {
          if (!!result.data) {
            trackEvent({
              category: 'action',
              action: 'Register youth membership',
            });
            connectService();
          }
        })
        .catch((error: Error) => {
          Sentry.captureException(error);
          setShowNotification(true);
        });
    } else {
      createProfile({ variables })
        .then(result => {
          if (!!result.data) {
            trackEvent({
              category: 'action',
              action: 'Register youth membership',
            });
            connectService();
          }
        })
        .catch((error: Error) => {
          Sentry.captureException(error);
          setShowNotification(true);
        });
    }
  };

  const formatLocale = (locale: string) => {
    switch (locale) {
      case 'fi':
        return 'FINNISH';
      case 'en':
        return 'ENGLISH';
      case 'sv':
        return 'SWEDISH';
      default:
        return 'FINNISH';
    }
  };
  // These allow us to set initial value of languageAtHome & profileLanguage
  // to users current language.
  const currentLangForProfile: Language = formatLocale(
    getLanguageCode(i18n.languages[0])
  ) as Language;
  const currentLangForYouth: YouthLanguage = formatLocale(
    getLanguageCode(i18n.languages[0])
  ) as YouthLanguage;

  return (
    <div className={styles.form}>
      <YouthProfileForm
        profile={{
          firstName: prefillRegistrationData?.myProfile?.firstName || '',
          lastName: prefillRegistrationData?.myProfile?.lastName || '',
          primaryAddress:
            prefillRegistrationData?.myProfile?.primaryAddress ||
            ({} as PrimaryAddress),
          addresses: getAddressesFromNode('prefill', prefillRegistrationData),
          email: tunnistamoUser.profile.email || '',
          phone: prefillRegistrationData?.myProfile?.primaryPhone?.phone || '',
          birthDate,
          approverEmail: '',
          schoolName: '',
          schoolClass: '',
          approverFirstName: '',
          approverLastName: '',
          approverPhone: '',
          profileLanguage:
            prefillRegistrationData?.myProfile?.language ||
            Language[currentLangForProfile],
          languageAtHome: YouthLanguage[currentLangForYouth],
          photoUsageApproved: 'false',
        }}
        isSubmitting={loading}
        onValues={handleOnValues}
      />
      <NotificationComponent
        show={showNotification}
        onClose={() => setShowNotification(false)}
      />
    </div>
  );
}

export default CreateYouthProfile;
