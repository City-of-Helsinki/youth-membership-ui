import { MembershipDetails } from '../../../graphql/generatedTypes';

export default function getSchool(data: MembershipDetails) {
  return [data.youthProfile?.schoolName, data.youthProfile?.schoolClass]
    .filter(Boolean)
    .join(', ');
}
