import { useQuery, QueryHookOptions } from '@apollo/react-hooks';
import { loader } from 'graphql.macro';
import * as Sentry from '@sentry/browser';
import { ApolloError } from 'apollo-boost';

import {
  MembershipStatus,
  HasYouthProfile,
} from '../../graphql/generatedTypes';

const HAS_YOUTH_PROFILE = loader(
  '../youthProfile/graphql/HasYouthProfile.graphql'
);

type Props = QueryHookOptions<HasYouthProfile, Record<string, unknown>>;

function useIsMembershipPending({ onError }: Props) {
  const { data, loading } = useQuery<HasYouthProfile>(HAS_YOUTH_PROFILE, {
    onError: (error: ApolloError) => {
      Sentry.captureException(error);

      if (onError) {
        onError(error);
      }
    },
  });

  const membershipStatus = data?.myProfile?.youthProfile?.membershipStatus;
  const isMembershipPending = membershipStatus === MembershipStatus.PENDING;

  return [isMembershipPending, loading];
}

export default useIsMembershipPending;
