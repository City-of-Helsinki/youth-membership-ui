import React, { useState } from 'react';
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
import NotificationComponent from '../../../common/components/notification/NotificationComponent';
import PageContentWithHostingBox from '../../../common/components/layout/PageContentWithHostingBox';
import MembershipInformation from './MembershipInformation';

const MEMBERSHIP_INFORMATION = loader(
  '../graphql/MembershipInformation.graphql'
);
const RENEW_MEMBERSHIP = loader('../graphql/RenewMyYouthProfile.graphql');

function MembershipInformationPage() {
  const [showNotification, setShowNotification] = useState(false);
  const [successNotification, setSuccessNotification] = useState(false);
  const { t } = useTranslation();
  const profileApiToken = useSelector(profileApiTokenSelector);

  const { data, loading } = useQuery<MembershipInformationTypes>(
    MEMBERSHIP_INFORMATION,
    {
      onError: () => {
        setShowNotification(true);
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
      .then(result => setSuccessNotification(!!result.data))
      .catch((error: Error) => {
        Sentry.captureException(error);
        setShowNotification(true);
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
      <NotificationComponent
        show={showNotification}
        onClose={() => setShowNotification(false)}
      />
      <NotificationComponent
        show={successNotification}
        onClose={() => setSuccessNotification(false)}
        type="success"
        labelText={t('membershipInformation.renewSuccessTitle')}
      >
        {t('membershipInformation.renewSuccessMessage')}
      </NotificationComponent>
    </PageContentWithHostingBox>
  );
}

export default MembershipInformationPage;
