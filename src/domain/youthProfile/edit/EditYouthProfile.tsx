import React from 'react';
import { useQuery } from '@apollo/client';
import { loader } from 'graphql.macro';
import { useHistory } from 'react-router-dom';

import {
  Language,
  MembershipDetails as MembershipDetailsData,
  YouthLanguage,
  MembershipDetails_myYouthProfile_profile_primaryAddress as PrimaryAddress,
} from '../../../graphql/generatedTypes';
import toastNotification from '../../../common/helpers/toastNotification/toastNotification';
import getAddressesFromNode from '../../membership/helpers/getAddressesFromNode';
import getAdditionalContactPersons from '../helpers/getAdditionalContactPersons';
import YouthProfileForm, {
  Values as FormValues,
} from '../form/YouthProfileForm';
import useUpdateProfiles from '../hooks/useUpdateProfiles';
import styles from './editYouthProfile.module.css';

const MEMBERSHIP_DETAILS = loader(
  '../../membership/graphql/MembershipDetails.graphql'
);

function EditYouthProfile() {
  const { data, loading: loadingProfile } = useQuery<MembershipDetailsData>(
    MEMBERSHIP_DETAILS,
    {
      onError: error => {
        // Without this console log, errors will fail when the CI env
        // variable is set to true. I was not able to understand the
        // underlying cause.
        // eslint-disable-next-line no-console
        console.log(error);
      },
    }
  );

  const history = useHistory();

  const [updateProfiles, { loading }] = useUpdateProfiles({
    onError: () => toastNotification(),
    onCompleted: () => history.push('/membership-details'),
  });

  const youthProfile = data?.myYouthProfile;

  const handleOnValues = (formValues: FormValues) => {
    updateProfiles(formValues, data);
  };

  return (
    <div className={styles.form}>
      {!loadingProfile && (
        <YouthProfileForm
          profile={{
            firstName: youthProfile?.profile?.firstName || '',
            lastName: youthProfile?.profile?.lastName || '',
            primaryAddress:
              youthProfile?.profile?.primaryAddress || ({} as PrimaryAddress),
            email: youthProfile?.profile?.primaryEmail?.email || '',
            addresses: getAddressesFromNode('membership', data),
            phone: youthProfile?.profile?.primaryPhone?.phone || '',
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
            additionalContactPersons: getAdditionalContactPersons(
              data?.myYouthProfile
            ),
          }}
          isEditing={true}
          isSubmitting={loading}
          onValues={handleOnValues}
        />
      )}
    </div>
  );
}

export default EditYouthProfile;
