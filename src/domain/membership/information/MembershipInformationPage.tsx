import React from 'react';
import { useQuery, useMutation } from '@apollo/client';
import { loader } from 'graphql.macro';
import { useTranslation } from 'react-i18next';
import { useSelector } from 'react-redux';
import * as Sentry from '@sentry/browser';

import {
  RenewMyYouthProfile as RenewMyYouthProfileData,
  RenewMyYouthProfileVariables,
  MembershipInformation as MembershipInformationTypes,
  UpdateMyYouthProfile as UpdateMyYouthProfileData,
  UpdateMyYouthProfileVariables,
} from '../../../graphql/generatedTypes';
import { profileApiTokenSelector } from '../../auth/redux';
import toastNotification from '../../../common/helpers/toastNotification/toastNotification';
import PageContentWithHostingBox from '../../../common/components/layout/PageContentWithHostingBox';
import MembershipInformation from './MembershipInformation';

const MEMBERSHIP_INFORMATION = loader(
  '../graphql/MembershipInformation.graphql'
);
const RENEW_MEMBERSHIP = loader('../graphql/RenewMyYouthProfile.graphql');
const RESEND_EMAIL = loader(
  '../../youthProfile/graphql/UpdateMyYouthProfile.graphql'
);

function MembershipInformationPage() {
  const { t } = useTranslation();
  const profileApiToken = useSelector(profileApiTokenSelector);

  const { data, loading } = useQuery<MembershipInformationTypes>(
    MEMBERSHIP_INFORMATION,
    {
      onError: () => {
        toastNotification();
      },
    }
  );
  const [renewMembership] = useMutation<
    RenewMyYouthProfileData,
    RenewMyYouthProfileVariables
  >(RENEW_MEMBERSHIP, { refetchQueries: ['MembershipInformation'] });

  const [resendConfirmationEmail] = useMutation<
    UpdateMyYouthProfileData,
    UpdateMyYouthProfileVariables
  >(RESEND_EMAIL);

  const handleRenewMembership = () => {
    const variables: RenewMyYouthProfileVariables = {
      input: {
        profileApiToken,
      },
    };

    renewMembership({ variables })
      .then(result => {
        if (!!result.data)
          toastNotification({
            type: 'success',
            labelText: t('membershipInformation.renewSuccessTitle'),
            notificationMessage: t('membershipInformation.renewSuccessMessage'),
          });
      })
      .catch((error: Error) => {
        Sentry.captureException(error);
        toastNotification();
      });
  };

  const handleResendEmail = () => {
    const variables: UpdateMyYouthProfileVariables = {
      input: {
        youthProfile: {
          resendRequestNotification: true,
        },
        profileApiToken,
      },
    };
    resendConfirmationEmail({ variables }).catch((error: Error) => {
      Sentry.captureException(error);
      toastNotification();
    });
  };

  const youthProfile = data?.myYouthProfile;
  const profile = data?.myYouthProfile?.profile;

  return (
    <PageContentWithHostingBox
      isReady={!loading}
      title="membershipInformation.pageTitle"
    >
      {youthProfile && profile && (
        <MembershipInformation
          onRenewMembership={handleRenewMembership}
          onResendConfirmationEmail={handleResendEmail}
          youthProfile={youthProfile}
          profile={profile}
        />
      )}
    </PageContentWithHostingBox>
  );
}

export default MembershipInformationPage;
