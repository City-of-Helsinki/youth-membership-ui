/* eslint-disable sort-keys */
import React, { useState } from 'react';
import { User } from 'oidc-client';
import { useMutation, useQuery } from '@apollo/react-hooks';
import { loader } from 'graphql.macro';
import * as Sentry from '@sentry/browser';
import { useTranslation } from 'react-i18next';
import { useMatomo } from '@datapunt/matomo-tracker-react';

import NotificationComponent from '../../../../common/notification/NotificationComponent';
import YouthProfileForm, {
  FormValues,
} from '../youthProfileForm/YouthProfileForm';
import styles from './CreateYouthProfile.module.css';
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
} from '../../../../graphql/generatedTypes';
import getCookie from '../../helpers/getCookie';
import Loading from '../../../../common/loading/Loading';
import { getMutationVariables } from '../../helpers/createProfileMutationVariables';

const PREFILL_REGISTRATION = loader(
  '../../graphql/PrefillRegistration.graphql'
);
const CREATE_PROFILE = loader('../../graphql/CreateMyProfile.graphql');
const ADD_SERVICE_CONNECTION = loader(
  '../../graphql/AddServiceConnection.graphql'
);
const UPDATE_PROFILE = loader('../../graphql/UpdateMyProfile.graphql');

type Props = {
  tunnistamoUser: User;
};

function CreateYouthProflle({ tunnistamoUser }: Props) {
  const [showNotification, setShowNotification] = useState(false);
  const { t, i18n } = useTranslation();
  const { trackEvent } = useMatomo();

  const { data, loading: loadingData } = useQuery<PrefillRegistartion>(
    PREFILL_REGISTRATION,
    {
      onError: (error: Error) => {
        Sentry.captureException(error);
        setShowNotification(true);
      },
    }
  );

  const [createProfile, { loading }] = useMutation<
    CreateMyProfileData,
    CreateMyProfileVariables
  >(CREATE_PROFILE);

  const [addServiceConnection] = useMutation<
    AddServiceConnectionData,
    AddServiceConnectionVariables
  >(ADD_SERVICE_CONNECTION, {
    refetchQueries: ['HasYouthProfile'],
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

    addServiceConnection({ variables: connectionVariables }).catch(
      (error: Error) => {
        Sentry.captureException(error);
        setShowNotification(true);
      }
    );
  };

  const handleOnValues = (formValues: FormValues) => {
    const variables: CreateMyProfileVariables = getMutationVariables(
      formValues,
      data
    );

    if (data?.myProfile) {
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
    i18n.languages[0]
  ) as Language;
  const currentLangForYouth: YouthLanguage = formatLocale(
    i18n.languages[0]
  ) as YouthLanguage;

  return (
    <div className={styles.form}>
      <Loading
        isLoading={loadingData}
        loadingText={t('profile.loading')}
        loadingClassName={styles.loading}
      >
        <YouthProfileForm
          profile={{
            firstName: data?.myProfile?.firstName || '',
            lastName: data?.myProfile?.lastName || '',
            address: data?.myProfile?.primaryAddress?.address || '',
            postalCode: data?.myProfile?.primaryAddress?.postalCode || '',
            city: data?.myProfile?.primaryAddress?.city || '',
            email: tunnistamoUser.profile.email || '',
            phone: data?.myProfile?.primaryPhone?.phone || '',
            birthDate,
            approverEmail: '',
            schoolName: '',
            schoolClass: '',
            approverFirstName: '',
            approverLastName: '',
            approverPhone: '',
            profileLanguage:
              data?.myProfile?.language || Language[currentLangForProfile],
            languageAtHome: YouthLanguage[currentLangForYouth],
            photoUsageApproved: 'false',
          }}
          isSubmitting={loading}
          onValues={handleOnValues}
        />
      </Loading>
      <NotificationComponent
        show={showNotification}
        onClose={() => setShowNotification(false)}
      />
    </div>
  );
}

export default CreateYouthProflle;
