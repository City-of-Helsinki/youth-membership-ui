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
} from '../../../graphql/generatedTypes';
import { profileApiTokenSelector } from '../../auth/redux';
import toastNotification from '../../../common/components/notification/toastNotification';
import PageContentWithHostingBox from '../../../common/components/layout/PageContentWithHostingBox';
import MembershipInformation from './MembershipInformation';

const MEMBERSHIP_INFORMATION = loader(
  '../graphql/MembershipInformation.graphql'
);
const RENEW_MEMBERSHIP = loader('../graphql/RenewMyYouthProfile.graphql');

function MembershipInformationPage() {
  const { t } = useTranslation();
  const profileApiToken = useSelector(profileApiTokenSelector);

  const { data, loading } = useQuery<MembershipInformationTypes>(
    MEMBERSHIP_INFORMATION,
    {
      onError: () => {
        toastNotification({});
      },
    }
  );
  const [renewMembership] = useMutation<
    RenewMyYouthProfileData,
    RenewMyYouthProfileVariables
  >(RENEW_MEMBERSHIP, { refetchQueries: ['MembershipInformation'] });

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
        toastNotification({});
      });
  };

  return (
    <PageContentWithHostingBox
      isReady={!loading}
      title="membershipInformation.pageTitle"
    >
      {data && (
        <MembershipInformation
          onRenewMembership={handleRenewMembership}
          membershipInformationTypes={data}
        />
      )}
    </PageContentWithHostingBox>
  );
}

export default MembershipInformationPage;
