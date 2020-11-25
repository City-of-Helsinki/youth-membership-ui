import { loader } from 'graphql.macro';
import { useQuery, QueryHookOptions } from '@apollo/react-hooks';
import { QueryResult } from '@apollo/react-common';
import { ApolloError } from 'apollo-boost';
import { GraphQLError } from 'graphql';

import {
  YouthProfileByApprovalToken,
  YouthProfileByApprovalToken_youthProfileByApprovalToken as YouthProfileByApprovalTokenNode,
  ProfileWithAccessToken,
  ProfileWithAccessToken_profileWithAccessToken as ProfileWithAccessTokenNode,
} from '../../../graphql/generatedTypes';

const PROFILE_WITH_ACCESS_TOKEN = loader(
  '../graphql/ProfileWithAccessToken.graphql'
);
const YOUTH_PROFILE_BY_APPROVAL_TOKEN = loader(
  '../graphql/YouthProfileByApprovalToken.graphql'
);

export type MergedProfile = YouthProfileByApprovalToken & {
  youthProfileByApprovalToken: YouthProfileByApprovalTokenNode & {
    profile: ProfileWithAccessTokenNode;
  };
};

type MergedError = {
  originalErrors: ApolloError[];
  graphQLErrors: GraphQLError[];
};

function mergeErrors(
  ...errorsWithUndefined: Array<ApolloError | undefined>
): MergedError | undefined {
  const errors = errorsWithUndefined.filter((error): error is ApolloError =>
    Boolean(error)
  );
  const graphQLErrors = errors.flatMap(error => error.graphQLErrors);

  if (errors.length === 0) {
    return;
  }

  return {
    originalErrors: errors,
    graphQLErrors,
  };
}

function mergeProfiles(
  profileWithAccessToken?: ProfileWithAccessToken,
  youthProfileByApprovalToken?: YouthProfileByApprovalToken
): MergedProfile | undefined {
  const profile = profileWithAccessToken?.profileWithAccessToken;
  const youthProfile = youthProfileByApprovalToken?.youthProfileByApprovalToken;

  if (!profile || !youthProfile) {
    return;
  }

  return {
    youthProfileByApprovalToken: {
      ...youthProfile,
      profile,
    },
  };
}

type Options = QueryHookOptions & {
  tokens: {
    approvalToken: string;
    readToken: string;
  };
};

type ProfileByTokensResult = Pick<
  QueryResult<MergedProfile | null>,
  'loading' | 'data'
> & {
  error?: MergedError;
};

function useProfileByTokens({
  tokens: { approvalToken, readToken },
  ...options
}: Options): ProfileByTokensResult {
  const helsinkiProfile = useQuery<ProfileWithAccessToken>(
    PROFILE_WITH_ACCESS_TOKEN,
    {
      ...options,
      variables: { token: readToken },
    }
  );
  const youthProfile = useQuery<YouthProfileByApprovalToken>(
    YOUTH_PROFILE_BY_APPROVAL_TOKEN,
    {
      ...options,
      variables: { token: approvalToken },
    }
  );

  const loading = helsinkiProfile.loading || youthProfile.loading;
  const error = mergeErrors(helsinkiProfile.error, youthProfile.error);
  const data =
    !loading && !error
      ? mergeProfiles(helsinkiProfile.data, youthProfile.data)
      : null;

  return {
    loading,
    error,
    data,
  };
}

export default useProfileByTokens;
