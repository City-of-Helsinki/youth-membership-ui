/* eslint-disable sort-keys */
import React, { useState } from 'react';
import { User } from 'oidc-client';
import { useQuery, useMutation } from '@apollo/react-hooks';
import { loader } from 'graphql.macro';
import * as Sentry from '@sentry/browser';
import { useTranslation } from 'react-i18next';

import NotificationComponent from '../../../../common/notification/NotificationComponent';
import YouthProfileForm, {
  FormValues,
} from '../createYouthProfileForm/CreateYouthProfileForm';
import styles from './CreateYouthProfile.module.css';
import {
  AddressType,
  AddServiceConnection as AddServiceConnectionData,
  AddServiceConnectionVariables,
  CreateMyProfile as CreateMyProfileData,
  CreateMyProfileVariables,
  EmailType,
  PhoneType,
  ServiceType,
  YouthLanguage,
  PrefillRegistartion,
} from '../../../../graphql/generatedTypes';
import getCookie from '../../helpers/getCookie';
import Loading from '../../../../common/loading/Loading';

const PREFILL_REGISTRATION = loader(
  '../../graphql/PrefillRegistration.graphql'
);
const CREATE_PROFILE = loader('../../graphql/CreateMyProfile.graphql');
const ADD_SERVICE_CONNECTION = loader(
  '../../graphql/AddServiceConnection.graphql'
);

type Props = {
  tunnistamoUser: User;
};

function CreateYouthProflle({ tunnistamoUser }: Props) {
  const [showNotification, setShowNotification] = useState(false);
  const { t } = useTranslation();

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

  const birthDate = getCookie('birthDate');

  const handleOnValues = (formValues: FormValues) => {
    const variables: CreateMyProfileVariables = {
      input: {
        profile: {
          firstName: formValues.firstName,
          lastName: formValues.lastName,
          addAddresses: [
            {
              address: formValues.address,
              postalCode: formValues.postalCode,
              city: formValues.city,
              primary: true,
              addressType: AddressType.OTHER,
            },
          ],
          addEmails: [
            {
              email: formValues.email,
              primary: true,
              emailType: EmailType.OTHER,
            },
          ],
          addPhones: [
            formValues.phone
              ? {
                  phone: formValues.phone,
                  primary: true,
                  phoneType: PhoneType.OTHER,
                }
              : null,
          ],
          youthProfile: {
            birthDate: formValues.birthDate,
            schoolName: formValues.schoolName,
            schoolClass: formValues.schoolClass,
            approverFirstName: formValues.approverFirstName,
            approverLastName: formValues.approverLastName,
            approverPhone: formValues.approverPhone,
            approverEmail: formValues.approverEmail,
            languageAtHome: formValues.languageAtHome,
            photoUsageApproved: formValues.photoUsageApproved === 'true',
          },
        },
      },
    };

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

    createProfile({ variables })
      .then(result => {
        if (result.data) {
          addServiceConnection({ variables: connectionVariables }).catch(
            (error: Error) => {
              Sentry.captureException(error);
              setShowNotification(true);
            }
          );
        }
      })
      .catch((error: Error) => {
        Sentry.captureException(error);
        setShowNotification(true);
      });
  };
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
            languageAtHome: YouthLanguage.FINNISH,
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
