import { useMutation } from '@apollo/react-hooks';
import { useSelector } from 'react-redux';
import * as Sentry from '@sentry/browser';
import { loader } from 'graphql.macro';

import { Values as FormValues } from '../form/YouthProfileForm';
import {
  MembershipDetails,
  UpdateMyProfile as UpdateMyProfileData,
  UpdateMyProfileVariables,
  UpdateMyYouthProfile as UpdateMyYouthProfileData,
  UpdateMyYouthProfileVariables,
} from '../../../graphql/generatedTypes';
import { getEditMutationVariables } from '../helpers/updateProfileMutationVariables';
import { getEditYouthProfile } from '../helpers/youthProfileGetters';
import { profileApiTokenSelector } from '../../auth/redux';

const UPDATE_MY_PROFILE = loader('../graphql/UpdateMyProfile.graphql');
const UPDATE_MY_YOUTH_PROFILE = loader(
  '../graphql/UpdateMyYouthProfile.graphql'
);

type Options = {
  onError: (e: Error) => void;
  onCompleted: () => void;
};

type UpdateProfileVariables = {
  loading: boolean;
};

const useUpdateProfiles = ({ onError, onCompleted }: Options) => {
  const profileApiToken = useSelector(profileApiTokenSelector);

  const [updateMyProfile, { loading: updatingMyProfile }] = useMutation<
    UpdateMyProfileData,
    UpdateMyProfileVariables
  >(UPDATE_MY_PROFILE);
  const [
    updateMyYouthProfile,
    { loading: updatingMyYouthProfile },
  ] = useMutation<UpdateMyYouthProfileData, UpdateMyYouthProfileVariables>(
    UPDATE_MY_YOUTH_PROFILE
  );

  const loading = updatingMyProfile || updatingMyYouthProfile;

  const updateProfiles = async (
    formValues: FormValues,
    membershipData?: MembershipDetails
  ) => {
    const myProfileVariables: UpdateMyProfileVariables = getEditMutationVariables(
      formValues,
      membershipData
    );
    const myYouthProfileVariables: UpdateMyYouthProfileVariables = {
      input: {
        youthProfile: getEditYouthProfile(formValues, membershipData),
        profileApiToken,
      },
    };

    try {
      await updateMyProfile({ variables: myProfileVariables });
      await updateMyYouthProfile({ variables: myYouthProfileVariables });
      onCompleted();
    } catch (e) {
      Sentry.captureException(e);
      onError(e);
    }
  };

  return [updateProfiles, { loading }] as [
    (formValues: FormValues, membershipData?: MembershipDetails) => void,
    UpdateProfileVariables
  ];
};

export default useUpdateProfiles;
