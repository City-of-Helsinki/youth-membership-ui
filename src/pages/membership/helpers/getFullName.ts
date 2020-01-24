import { MembershipDetails } from '../../../graphql/generatedTypes';

export default function getFullName(data?: MembershipDetails | null) {
  return data?.youthProfile?.profile
    ? `${data.youthProfile.profile.firstName} ${data.youthProfile.profile.lastName}`.trim()
    : '';
}
