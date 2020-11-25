import {
  MembershipDetails,
  MembershipInformation,
} from '../../../graphql/generatedTypes';

export default function getFullName(
  data?: MembershipDetails | MembershipInformation | null
) {
  return data?.myYouthProfile?.profile
    ? `${data.myYouthProfile.profile.firstName} ${data.myYouthProfile.profile.lastName}`.trim()
    : '';
}
