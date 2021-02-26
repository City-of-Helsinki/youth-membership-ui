import { useQuery, QueryHookOptions, ApolloError } from '@apollo/client';
import { loader } from 'graphql.macro';

import { HasYouthProfile } from '../../graphql/generatedTypes';

const HAS_YOUTH_PROFILE = loader(
  '../youthProfile/graphql/HasYouthProfile.graphql'
);

type Props = QueryHookOptions<HasYouthProfile, Record<string, unknown>>;

function useMembershipStatus({ onError }: Props) {
  const { data, loading } = useQuery<HasYouthProfile>(HAS_YOUTH_PROFILE, {
    onError: (error: ApolloError) => {
      if (onError) {
        onError(error);
      }
    },
  });

  const membershipStatus = data?.myYouthProfile?.membershipStatus;

  return [membershipStatus, loading];
}

export default useMembershipStatus;
