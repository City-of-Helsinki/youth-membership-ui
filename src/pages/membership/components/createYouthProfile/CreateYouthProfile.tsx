/* eslint-disable sort-keys */
import React, { useState } from 'react';
import { User } from 'oidc-client';
import { useMutation } from '@apollo/react-hooks';
import { loader } from 'graphql.macro';

import NotificationComponent from '../../../../common/notification/NotificationComponent';
import YouthProfileForm, {
  FormValues,
} from '../createYouthProfileForm/CreateYouthProfileForm';
import styles from './CreateYouthProflle.module.css';
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
} from '../../../../graphql/generatedTypes';
import getCookie from '../../helpers/getCookie';

const CREATE_PROFILE = loader('../../graphql/CreateMyProfile.graphql');
const ADD_SERVICE_CONNECTION = loader(
  '../../graphql/AddServiceConnection.graphql'
);

type Props = {
  tunnistamoUser: User;
};

function CreateYouthProflle({ tunnistamoUser }: Props) {
  const [showNotification, setShowNotification] = useState(false);

  const [createProfile, { loading }] = useMutation<
    CreateMyProfileData,
    CreateMyProfileVariables
  >(CREATE_PROFILE);

  const [addServiceConnection] = useMutation<
    AddServiceConnectionData,
    AddServiceConnectionVariables
  >(ADD_SERVICE_CONNECTION, {
    refetchQueries: ['HasYouthProfile', 'NameQuery'],
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
            //TODO: Waiting to be fixed in backend
            //photoUsageApproved: formValues.photoUsageApproved,
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
          addServiceConnection({ variables: connectionVariables }).catch(() =>
            setShowNotification(true)
          );
        }
      })
      .catch(() => setShowNotification(true));
  };
  return (
    <div className={styles.form}>
      <YouthProfileForm
        profile={{
          firstName: tunnistamoUser.profile.given_name || '',
          lastName: tunnistamoUser.profile.family_name || '',
          address: '',
          postalCode: '',
          city: '',
          email: tunnistamoUser.profile.email || '',
          phone: '',
          birthDate,
          approverEmail: '',
          schoolName: '',
          schoolClass: '',
          approverFirstName: '',
          approverLastName: '',
          approverPhone: '',
          languageAtHome: YouthLanguage.FINNISH,
          //TODO: Waiting to be fixed in backend
          //photoUsageApproved: false,
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

export default CreateYouthProflle;
