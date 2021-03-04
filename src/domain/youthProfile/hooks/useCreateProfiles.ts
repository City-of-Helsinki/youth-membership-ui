import { useMutation } from '@apollo/client';
import { loader } from 'graphql.macro';
import { useSelector } from 'react-redux';
import * as Sentry from '@sentry/browser';
import { useMatomo } from '@datapunt/matomo-tracker-react';

import useHistory from '../../../common/reactRouterWithLanguageSupport/useHistory';
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

type CreateProfileVariables = {
  loading: boolean;
};

type Options = {
  onError: (e: Error) => void;
};

const useCreateProfiles = ({ onError }: Options) => {
  const history = useHistory();
  const profileApiToken = useSelector(profileApiTokenSelector);
  const { trackEvent } = useMatomo();

  const [
    addServiceConnection,
    { loading: addingServiceConnection },
  ] = useMutation<AddServiceConnectionData, AddServiceConnectionVariables>(
    ADD_SERVICE_CONNECTION,
    {
      refetchQueries: ['HasYouthProfile', 'NameQuery'],
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

  const loading =
    addingServiceConnection ||
    creatingMyProfile ||
    creatingMyYouthProfile ||
    updatingMyProfile;

  const createProfiles = async (
    formValues: FormValues,
    prefillRegistration: PrefillRegistartion
  ) => {
    const myProfileVariables: CreateMyProfileVariables = getMutationVariables(
      formValues,
      prefillRegistration
    );

    const myYouthProfileVariables: CreateMyYouthProfileVariables = {
      input: {
        youthProfile: getCreateYouthProfile(formValues),
        profileApiToken: profileApiToken,
      },
    };

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

    try {
      if (prefillRegistration.myProfile) {
        await updateMyYouthProfile({ variables: myProfileVariables });
      } else {
        await createMyProfile({ variables: myProfileVariables });
      }
      await createMyYouthProfile({ variables: myYouthProfileVariables });
      await trackEvent({
        category: 'action',
        action: 'Register youth membership',
      });
      await addServiceConnection({ variables: serviceConnectionVariables });
      history.push('/');
    } catch (e) {
      Sentry.captureException(e);
      onError(e);
    }
  };

  return [createProfiles, { loading }] as [
    (formValues: FormValues, prefillRegistartion: PrefillRegistartion) => void,
    CreateProfileVariables
  ];
};

export default useCreateProfiles;
