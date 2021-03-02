import { differenceInYears } from 'date-fns';

import { MembershipStatus } from '../../graphql/generatedTypes';
import ageConstants from '../youthProfile/constants/ageConstants';
import Config from '../../config';

class Membership {
  static getAdminUrl(profileId: null | string) {
    const url = Config.adminUrl;

    if (!profileId) {
      return null;
    }

    return `${url}youthProfiles/${profileId}/show`;
  }

  static getFullName(profile: null | { firstName: string; lastName: string }) {
    if (!profile) {
      return '';
    }

    const { firstName, lastName } = profile;

    return `${firstName} ${lastName}`.trim();
  }

  static getIsExpired(membershipStatus: MembershipStatus) {
    return membershipStatus === MembershipStatus.EXPIRED;
  }

  static getIsActive(membershipStatus: MembershipStatus) {
    return membershipStatus === MembershipStatus.ACTIVE;
  }

  static getIsRenewing(membershipStatus: MembershipStatus) {
    return membershipStatus === MembershipStatus.RENEWING;
  }

  static getIsPending(membershipStatus: MembershipStatus) {
    return membershipStatus === MembershipStatus.PENDING;
  }

  static getAge(birthday: string) {
    return differenceInYears(new Date(), new Date(birthday));
  }

  static getIsUnderage(birthday: string) {
    return this.getAge(birthday) < ageConstants.ADULT;
  }
}

export default Membership;
