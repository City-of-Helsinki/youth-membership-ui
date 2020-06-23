import React, { useState } from 'react';
import { useMutation, useQuery } from '@apollo/react-hooks';
import { loader } from 'graphql.macro';
import { useHistory } from 'react-router';
import * as Sentry from '@sentry/browser';

import {
  Language,
  MembershipDetails as MembershipDetailsData,
  UpdateMyProfile as UpdateMyProfileData,
  UpdateMyProfileVariables,
  YouthLanguage,
  MembershipDetails_youthProfile_profile_primaryAddress as PrimaryAddress,
  MembershipDetails_youthProfile_profile_addresses_edges_node as Address,
} from '../../../../graphql/generatedTypes';
import YouthProfileForm, {
  FormValues,
} from '../youthProfileForm/YouthProfileForm';
import styles from './EditYouthProfile.module.css';
import NotificationComponent from '../../../../common/notification/NotificationComponent';
import { getEditMutationVariables } from '../../helpers/updateProfileMutationVariables';
import getAddressesFromNode from '../../helpers/getAddressesFromNode';

const MEMBERSHIP_DETAILS = loader('../../graphql/MembershipDetails.graphql');
const UPDATE_PROFILE = loader('../../graphql/UpdateMyProfile.graphql');

type Props = {};

function EditYouthProfile(props: Props) {
  const [showNotification, setShowNotification] = useState<boolean>(false);
  const { data, loading: loadingProfile } = useQuery<MembershipDetailsData>(
    MEMBERSHIP_DETAILS
  );

  const [updateProfile, { loading: saveLoading }] = useMutation<
    UpdateMyProfileData,
    UpdateMyProfileVariables
  >(UPDATE_PROFILE);

  const history = useHistory();
  const youthProfile = data?.youthProfile;

  const handleOnValues = (formValues: FormValues) => {
    const variables: UpdateMyProfileVariables = getEditMutationVariables(
      formValues,
      data
    );

    updateProfile({ variables })
      .then(() => {
        history.push('/membership-details');
      })
      .catch((error: Error) => {
        Sentry.captureException(error);
        setShowNotification(true);
      });
  };

  return (
    <div className={styles.form}>
      {!loadingProfile && (
        <YouthProfileForm
          profile={{
            firstName: youthProfile?.profile.firstName || '',
            lastName: youthProfile?.profile.lastName || '',
            primaryAddress:
              youthProfile?.profile?.primaryAddress || ({} as PrimaryAddress),
            email: youthProfile?.profile.primaryEmail?.email || '',
            addresses: getAddressesFromNode('membership', data),
            phone: youthProfile?.profile.primaryPhone?.phone || '',
            birthDate: youthProfile?.birthDate,
            schoolName: youthProfile?.schoolName || '',
            schoolClass: youthProfile?.schoolClass || '',
            approverFirstName: youthProfile?.approverFirstName || '',
            approverLastName: youthProfile?.approverLastName || '',
            approverPhone: youthProfile?.approverPhone || '',
            approverEmail: youthProfile?.approverEmail || '',
            profileLanguage:
              youthProfile?.profile?.language || Language.FINNISH,
            languageAtHome:
              youthProfile?.languageAtHome || YouthLanguage.FINNISH,
            photoUsageApproved:
              youthProfile?.photoUsageApproved?.toString() || 'false',
          }}
          isEditing={true}
          isSubmitting={saveLoading}
          onValues={handleOnValues}
        />
      )}

      <NotificationComponent
        show={showNotification}
        onClose={() => setShowNotification(false)}
      />
    </div>
  );
}

export default EditYouthProfile;
