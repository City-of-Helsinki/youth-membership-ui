import React, { useState } from 'react';
import { useMutation, useQuery } from '@apollo/react-hooks';
import { loader } from 'graphql.macro';
import { useHistory } from 'react-router';

import {
  AddressType,
  Language,
  MembershipDetails as MembershipDetailsData,
  PhoneType,
  UpdateMyProfile as UpdateMyProfileData,
  UpdateMyProfileVariables,
  YouthLanguage,
} from '../../../../graphql/generatedTypes';
import YouthProfileForm, {
  FormValues,
} from '../createYouthProfileForm/CreateYouthProfileForm';
import styles from './EditYouthProfile.module.css';
import NotificationComponent from '../../../../common/notification/NotificationComponent';

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
    const variables: UpdateMyProfileVariables = {
      input: {
        profile: {
          firstName: formValues.firstName,
          lastName: formValues.lastName,
          language: formValues.profileLanguage,
          updateAddresses: [
            {
              address: formValues.address,
              postalCode: formValues.postalCode,
              city: formValues.city,
              addressType: AddressType.OTHER,
              primary: true,
              id: youthProfile?.profile?.primaryAddress?.id,
            },
          ],
          updatePhones: [
            {
              phone: formValues.phone,
              phoneType: PhoneType.OTHER,
              primary: true,
              id: youthProfile?.profile?.primaryPhone?.id,
            },
          ],
          youthProfile: {
            birthDate: youthProfile?.birthDate,
            schoolName: formValues.schoolName,
            schoolClass: formValues.schoolClass,
            approverFirstName: formValues.approverFirstName,
            approverLastName: formValues.approverLastName,
            approverPhone: formValues.approverPhone,
            approverEmail: formValues.approverEmail,
            languageAtHome: formValues.languageAtHome,
          },
        },
      },
    };

    updateProfile({ variables })
      .then(() => {
        history.push('/membership-details');
      })
      .catch((error: Error) => setShowNotification(true));
  };

  return (
    <div className={styles.form}>
      {!loadingProfile && (
        <YouthProfileForm
          profile={{
            firstName: youthProfile?.profile.firstName || '',
            lastName: youthProfile?.profile.lastName || '',
            address: youthProfile?.profile.primaryAddress?.address || '',
            postalCode: youthProfile?.profile.primaryAddress?.postalCode || '',
            city: youthProfile?.profile.primaryAddress?.city || '',
            email: youthProfile?.profile.primaryEmail?.email || '',
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
            photoUsageApproved: 'false',
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
