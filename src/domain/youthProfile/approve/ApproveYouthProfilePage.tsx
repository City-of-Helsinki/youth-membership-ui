import React from 'react';
import { loader } from 'graphql.macro';
import { useMutation } from '@apollo/client';
import { useParams } from 'react-router';
import { useTranslation } from 'react-i18next';
import { GraphQLError } from 'graphql';

import {
  ApproveYouthProfile as ApproveYourProfileData,
  ApproveYouthProfileVariables,
  CreateAdditionalContactPersonInput,
  UpdateAdditionalContactPersonInput,
  YouthProfileByApprovalToken_youthProfileByApprovalToken as YouthProfileByApprovalTokenNode,
} from '../../../graphql/generatedTypes';
import PageContent from '../../../common/components/layout/PageContent';
import PageSection from '../../../common/components/layout/PageSection';
import Text from '../../../common/components/text/Text';
import prepareArrayFieldChanges from '../helpers/prepareArrayFieldChanges';
import getAdditionalContactPersons from '../helpers/getAdditionalContactPersons';
import useProfileByTokens from './useProfileByTokens';
import { FormValues } from './ApproveYouthProfileForm';
import ApproveYouthProfile from './ApproveYouthProfile';
import styles from './approveYouthProfilePage.module.css';

const APPROVE_PROFILE = loader('../graphql/ApproveYouthProfile.graphql');

function getApprovalData(
  values: FormValues,
  currentYouthProfile?: YouthProfileByApprovalTokenNode
) {
  const previousAdditionalContactPersons = getAdditionalContactPersons(
    currentYouthProfile
  );
  const { add, update, remove } = prepareArrayFieldChanges<
    CreateAdditionalContactPersonInput,
    UpdateAdditionalContactPersonInput
  >(previousAdditionalContactPersons, values.additionalContactPersons);

  return {
    approverFirstName: values.approverFirstName,
    approverLastName: values.approverLastName,
    approverEmail: values.approverEmail,
    approverPhone: values.approverPhone,
    birthDate: currentYouthProfile?.birthDate,
    photoUsageApproved: values.photoUsageApproved === 'true',
    addAdditionalContactPersons: add,
    updateAdditionalContactPersons: update,
    removeAdditionalContactPersons: remove,
    languageAtHome: values.languageAtHome,
  };
}

function isError(graphQLErrors?: GraphQLError[], errorCode?: string): boolean {
  if (!graphQLErrors) {
    return false;
  }

  return graphQLErrors.reduce<boolean>(
    (previousValue, graphqlError) =>
      graphqlError.extensions?.code === errorCode || previousValue,
    false
  );
}

function isProfileDoesNotExistError(graphQLErrors?: GraphQLError[]) {
  return isError(graphQLErrors, 'PROFILE_DOES_NOT_EXIST_ERROR');
}

function isTokenExpiredError(graphQLErrors?: GraphQLError[]) {
  return isError(graphQLErrors, 'TOKEN_EXPIRED_ERROR');
}

type Params = {
  approvalToken: string;
  readToken: string;
};

function ApproveYouthProfilePage() {
  const { t } = useTranslation();
  const { approvalToken, readToken } = useParams<Params>();

  const { data, loading, error: queryProfileError } = useProfileByTokens({
    tokens: { approvalToken, readToken },
    fetchPolicy: 'network-only',
  });
  const [
    approveProfile,
    {
      error: approveProfileError,
      called: approveProfileCalled,
      loading: approveProfileLoading,
    },
  ] = useMutation<ApproveYourProfileData, ApproveYouthProfileVariables>(
    APPROVE_PROFILE
  );

  const handleOnSubmit = (values: FormValues) => {
    return approveProfile({
      variables: {
        input: {
          approvalData: getApprovalData(
            values,
            data?.youthProfileByApprovalToken
          ),
          approvalToken,
        },
      },
    });
  };

  const isApprovalSuccessful =
    approveProfileCalled &&
    !approveProfileLoading &&
    !Boolean(approveProfileError);
  const isProfileError =
    isProfileDoesNotExistError(queryProfileError?.graphQLErrors) ||
    isTokenExpiredError(queryProfileError?.graphQLErrors);
  const isApprovalError =
    !isApprovalSuccessful && !data?.youthProfileByApprovalToken;
  const isError = isProfileError || isApprovalError;

  return (
    <PageContent isReady={!loading} title="approval.title">
      {!isError && data?.youthProfileByApprovalToken && (
        <ApproveYouthProfile
          data={data}
          onSubmit={handleOnSubmit}
          isApprovalSuccessful={isApprovalSuccessful}
        />
      )}
      {isError && (
        <PageSection className={styles.explanationContainer}>
          <Text variant="h1">{t('approval.approvedLink')}</Text>
          <Text variant="info">{t('approval.explanationError')}</Text>
          <Text variant="info">{t('approval.explanationCheckStatus')}</Text>
        </PageSection>
      )}
    </PageContent>
  );
}

export default ApproveYouthProfilePage;
