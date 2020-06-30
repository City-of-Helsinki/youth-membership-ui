import React, { useState } from 'react';
import { useQuery, useMutation } from '@apollo/react-hooks';
import { useParams } from 'react-router';
import { loader } from 'graphql.macro';
import { useTranslation } from 'react-i18next';
import * as Sentry from '@sentry/browser';

import {
  YouthProfileByApprovalToken,
  ApproveYouthProfile as ApproveYourProfileData,
  ApproveYouthProfileVariables,
} from '../../../graphql/generatedTypes';
import convertBooleanToString from '../../../common/helpers/convertBooleanToString';
import Loading from '../../../common/components/loading/Loading';
import NotificationComponent from '../../../common/components/notification/NotificationComponent';
import PageLayout from '../../../common/components/layout/PageLayout';
import getAddress from '../../membership/helpers/getAddress';
import ConfirmApprovingYouthProfile from './ConfirmApprovingYouthProfile';
import ApproveYouthProfileForm, { FormValues } from './ApproveYouthProfileForm';

const PROFILE_BY_TOKEN = loader(
  '../graphql/YouthProfileByApprovalToken.graphql'
);
const APPROVE_PROFILE = loader('../graphql/ApproveYouthProfile.graphql');

type Props = {};
type Params = {
  token: string;
};

function ApproveYouthProfile(props: Props) {
  const [approvalSuccessful, setApprovalSuccessful] = useState(false);
  const [showNotification, setShowNotification] = useState(false);

  const params = useParams<Params>();
  const { t, i18n } = useTranslation();
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
  const [approveProfile, { loading }] = useMutation<
    ApproveYourProfileData,
    ApproveYouthProfileVariables
  >(APPROVE_PROFILE);

  const handleOnValues = (values: FormValues) => {
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

    approveProfile({ variables })
      .then(result => {
        if (result.data) {
          setApprovalSuccessful(true);
        }
      })
      .catch((error: Error) => {
        Sentry.captureException(error);
        setShowNotification(true);
      });
  };

  return (
    <PageLayout title="approval.title">
      <Loading
        isLoading={queryLoading}
        loadingClassName="loading"
        loadingText={t('loading')}
      >
        {!approvalSuccessful && data && (
          <ApproveYouthProfileForm
            profile={{
              firstName:
                data?.youthProfileByApprovalToken?.profile?.firstName || '',
              lastName:
                data?.youthProfileByApprovalToken?.profile?.lastName || '',
              address: getAddress(data, i18n.languages[0]),
              email:
                data?.youthProfileByApprovalToken?.profile?.primaryEmail
                  ?.email || '',
              phone:
                data?.youthProfileByApprovalToken?.profile?.primaryPhone
                  ?.phone || '',
              birthDate: data?.youthProfileByApprovalToken?.birthDate,
              schoolName: data?.youthProfileByApprovalToken?.schoolName || '',
              schoolClass: data?.youthProfileByApprovalToken?.schoolClass || '',
              approverFirstName:
                data?.youthProfileByApprovalToken?.approverFirstName || '',
              approverLastName:
                data?.youthProfileByApprovalToken?.approverLastName || '',
              approverPhone:
                data?.youthProfileByApprovalToken?.approverPhone || '',
              approverEmail:
                data?.youthProfileByApprovalToken?.approverEmail || '',
              photoUsageApproved: convertBooleanToString(
                data?.youthProfileByApprovalToken?.photoUsageApproved
              ),
              languageAtHome:
                data?.youthProfileByApprovalToken?.languageAtHome || '',
            }}
            isSubmitting={loading}
            onValues={handleOnValues}
          />
        )}
        {!approvalSuccessful && !data && <h2>{t('approval.approvedLink')}</h2>}
        {approvalSuccessful && <ConfirmApprovingYouthProfile />}
      </Loading>
      <NotificationComponent
        show={showNotification}
        onClose={() => setShowNotification(false)}
      />
    </PageLayout>
  );
}

export default ApproveYouthProfile;
