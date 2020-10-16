import React, { useState } from 'react';
import { loader } from 'graphql.macro';
import * as Sentry from '@sentry/browser';
import { useQuery, useMutation } from '@apollo/react-hooks';
import { useParams } from 'react-router';
import { useTranslation } from 'react-i18next';

import {
  YouthProfileByApprovalToken,
  ApproveYouthProfile as ApproveYourProfileData,
  ApproveYouthProfileVariables,
  CreateAdditionalContactPersonInput,
  UpdateAdditionalContactPersonInput,
} from '../../../graphql/generatedTypes';
import NotificationComponent from '../../../common/components/notification/NotificationComponent';
import PageContent from '../../../common/components/layout/PageContent';
import PageSection from '../../../common/components/layout/PageSection';
import prepareArrayFieldChanges from '../helpers/prepareArrayFieldChanges';
import getAdditionalContactPersons from '../helpers/getAdditionalContactPersons';
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
  const { t } = useTranslation();
  const [approvalSuccessful, setApprovalSuccessful] = useState(false);
  const [showNotification, setShowNotification] = useState(false);

  const params = useParams<Params>();
  const { data, loading } = useQuery<YouthProfileByApprovalToken>(
    PROFILE_BY_TOKEN,
    {
      variables: { token: params.token },
      onError: () => {
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
    const previousAdditionalContactPersons = getAdditionalContactPersons(
      data?.youthProfileByApprovalToken
    );
    const { add, update, remove } = prepareArrayFieldChanges<
      CreateAdditionalContactPersonInput,
      UpdateAdditionalContactPersonInput
    >(previousAdditionalContactPersons, values.additionalContactPersons);
    const variables = {
      input: {
        approvalData: {
          approverFirstName: values.approverFirstName,
          approverLastName: values.approverLastName,
          approverEmail: values.approverEmail,
          approverPhone: values.approverPhone,
          birthDate: data?.youthProfileByApprovalToken?.birthDate,
          photoUsageApproved: Boolean(values.photoUsageApproved),
          addAdditionalContactPersons: add,
          updateAdditionalContactPersons: update,
          removeAdditionalContactPersons: remove,
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

  return (
    <PageContent isReady={!loading} title="approval.title">
      {data && (
        <ApproveYouthProfile
          data={data}
          onSubmit={handleOnSubmit}
          isApprovalSuccessful={approvalSuccessful}
        />
      )}
      {!approvalSuccessful && !data && (
        <PageSection>
          <h2>{t('approval.approvedLink')}</h2>
        </PageSection>
      )}
      <NotificationComponent
        show={showNotification}
        onClose={() => setShowNotification(false)}
      />
    </PageContent>
  );
}

export default ApproveYouthProfilePage;
