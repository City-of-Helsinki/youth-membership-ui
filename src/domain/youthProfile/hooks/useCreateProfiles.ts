import { useState } from 'react';
import { useMutation } from '@apollo/react-hooks';
import { loader } from 'graphql.macro';
import { useSelector } from 'react-redux';
import { useHistory } from 'react-router';
import * as Sentry from '@sentry/browser';
import { useMatomo } from '@datapunt/matomo-tracker-react';

import { profileApiTokenSelector } from '../../auth/redux';
import { Values as FormValues } from '../form/YouthProfileForm';
import {
  AddServiceConnection as AddServiceConnectionData,
  AddServiceConnectionVariables,
  CreateMyProfile as CreateMyProfileData,
  CreateMyProfileVariables,
  CreateMyYouthProfile as CreateMyYouthProfileData,
  CreateMyYouthProfileVariables,
  UpdateMyProfile as UpdateMyProfileData,
  UpdateMyProfileVariables,
  PrefillRegistartion,
  ServiceType,
} from '../../../graphql/generatedTypes';
import { getMutationVariables } from '../helpers/createProfileMutationVariables';
import { getCreateYouthProfile } from '../helpers/youthProfileGetters';

const ADD_SERVICE_CONNECTION = loader(
  '../graphql/AddServiceConnection.graphql'
);
const CREATE_MY_PROFILE = loader('../graphql/CreateMyProfile.graphql');
const CREATE_MY_YOUTH_PROFILE = loader(
  '../graphql/CreateMyYouthProfile.graphql'
);
const UPDATE_MY_PROFILE = loader('../graphql/UpdateMyProfile.graphql');

const useCreateProfiles = () => {
  const [error, setError] = useState<Error | null>(null);
  const history = useHistory();
  const profileApiToken = useSelector(profileApiTokenSelector);
  const { trackEvent } = useMatomo();

  const [
    addServiceConnection,
    { loading: addingServiceConnection },
  ] = useMutation<AddServiceConnectionData, AddServiceConnectionVariables>(
    ADD_SERVICE_CONNECTION,
    {
      refetchQueries: ['HasYouthProfile'],
      awaitRefetchQueries: true,
    }
  );

  const [createMyProfile, { loading: creatingMyProfile }] = useMutation<
    CreateMyProfileData,
    CreateMyProfileVariables
  >(CREATE_MY_PROFILE);

  const [
    createMyYouthProfile,
    { loading: creatingMyYouthProfile },
  ] = useMutation<CreateMyYouthProfileData, CreateMyYouthProfileVariables>(
    CREATE_MY_YOUTH_PROFILE
  );

  const [updateMyYouthProfile, { loading: updatingMyProfile }] = useMutation<
    UpdateMyProfileData,
    UpdateMyProfileVariables
  >(UPDATE_MY_PROFILE);

  const isLoading =
    addingServiceConnection ||
    creatingMyProfile ||
    creatingMyYouthProfile ||
    updatingMyProfile;

  const connectService = () => {
    const serviceConnectionVariables: AddServiceConnectionVariables = {
      input: {
        serviceConnection: {
          service: {
            type: ServiceType.YOUTH_MEMBERSHIP,
          },
          enabled: true,
        },
      },
    };

    addServiceConnection({ variables: serviceConnectionVariables })
      .then(() => {
        history.push('/');
      })
      .catch((error: Error) => {
        Sentry.captureException(error);
        setError(error);
      });
  };

  const createYouthProfile = (formValues: FormValues) => {
    const myYouthProfileVariables: CreateMyYouthProfileVariables = {
      input: {
        youthProfile: getCreateYouthProfile(formValues),
        profileApiToken: profileApiToken,
      },
    };

    createMyYouthProfile({ variables: myYouthProfileVariables })
      .then(result => {
        if (result.data) {
          trackEvent({
            category: 'action',
            action: 'Register youth membership',
          });
          connectService();
        }
      })
      .catch((error: Error) => {
        Sentry.captureException(error);
        setError(error);
      });
  };

  const createProfiles = (
    formValues: FormValues,
    prefillRegistration: PrefillRegistartion
  ) => {
    const myProfileVariables: CreateMyProfileVariables = getMutationVariables(
      formValues,
      prefillRegistration
    );

    if (prefillRegistration?.myProfile) {
      updateMyYouthProfile({ variables: myProfileVariables })
        .then(result => {
          if (result.data) createYouthProfile(formValues);
        })
        .catch((error: Error) => {
          Sentry.captureException(error);
          setError(error);
        });
    } else {
      createMyProfile({ variables: myProfileVariables })
        .then(result => {
          if (result.data) createYouthProfile(formValues);
        })
        .catch((error: Error) => {
          Sentry.captureException(error);
          setError(error);
        });
    }
  };

  return { createProfiles, isLoading, error, setError };
};

export default useCreateProfiles;
