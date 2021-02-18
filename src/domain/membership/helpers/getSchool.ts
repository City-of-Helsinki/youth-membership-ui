import { MembershipDetails } from '../../../graphql/generatedTypes';

export default function getSchool(data: MembershipDetails) {
  return [data.myYouthProfile?.schoolName, data.myYouthProfile?.schoolClass]
    .filter(Boolean)
    .join(', ');
}
