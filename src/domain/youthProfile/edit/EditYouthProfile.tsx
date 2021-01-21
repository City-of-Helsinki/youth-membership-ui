import React, { useState } from 'react';
import { useQuery } from '@apollo/react-hooks';
import { loader } from 'graphql.macro';
import { useHistory } from 'react-router';

import {
  Language,
  MembershipDetails as MembershipDetailsData,
  YouthLanguage,
  MembershipDetails_myYouthProfile_profile_primaryAddress as PrimaryAddress,
} from '../../../graphql/generatedTypes';
import NotificationComponent from '../../../common/components/notification/NotificationComponent';
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
  const [showNotification, setShowNotification] = useState<boolean>(false);
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
    onError: () => setShowNotification(true),
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

      <NotificationComponent
        show={showNotification}
        onClose={() => setShowNotification(false)}
      />
    </div>
  );
}

export default EditYouthProfile;
