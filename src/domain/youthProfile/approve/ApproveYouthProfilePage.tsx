import React, { useState } from 'react';
import { loader } from 'graphql.macro';
import * as Sentry from '@sentry/browser';
import { useQuery, useMutation } from '@apollo/react-hooks';
import { useParams } from 'react-router';

import {
  YouthProfileByApprovalToken,
  ApproveYouthProfile as ApproveYourProfileData,
  ApproveYouthProfileVariables,
} from '../../../graphql/generatedTypes';
import NotificationComponent from '../../../common/components/notification/NotificationComponent';
import PageContent from '../../../common/components/layout/PageContent';
import { FormValues } from './ApproveYouthProfileForm';
import ApproveYouthProfile from './ApproveYouthProfile';

const PROFILE_BY_TOKEN = loader(
  '../graphql/YouthProfileByApprovalToken.graphql'
);
const APPROVE_PROFILE = loader('../graphql/ApproveYouthProfile.graphql');

type Params = {
  token: string;
};

function ApproveYouthProfilePage() {
  const [approvalSuccessful, setApprovalSuccessful] = useState(false);
  const [showNotification, setShowNotification] = useState(false);

  const params = useParams<Params>();
  const { data, loading: queryLoading } = useQuery<YouthProfileByApprovalToken>(
    PROFILE_BY_TOKEN,
    {
      variables: { token: params.token },
      onError: (error: Error) => {
        Sentry.captureException(error);
        setShowNotification(true);
      },
      fetchPolicy: 'network-only',
    }
  );
  const [approveProfile] = useMutation<
    ApproveYourProfileData,
    ApproveYouthProfileVariables
  >(APPROVE_PROFILE);

  const handleOnSubmit = async (values: FormValues) => {
    const variables = {
      input: {
        approvalData: {
          approverFirstName: values.approverFirstName,
          approverLastName: values.approverLastName,
          approverEmail: values.approverEmail,
          approverPhone: values.approverPhone,
          birthDate: data?.youthProfileByApprovalToken?.birthDate,
        },
        approvalToken: params.token,
      },
    };

    try {
      const result = await approveProfile({ variables });

      if (result.data) {
        setApprovalSuccessful(true);
      }
    } catch (error) {
      Sentry.captureException(error);
      setShowNotification(true);
    }
  };

  const isLoading = queryLoading;

  return (
    <PageContent isReady={!isLoading} title="approval.title">
      {data && (
        <ApproveYouthProfile
          data={data}
          onSubmit={handleOnSubmit}
          isApprovalSuccessful={approvalSuccessful}
        />
      )}
      <NotificationComponent
        show={showNotification}
        onClose={() => setShowNotification(false)}
      />
    </PageContent>
  );
}

export default ApproveYouthProfilePage;
