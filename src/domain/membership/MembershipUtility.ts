import { differenceInYears } from 'date-fns';

import { MembershipStatus } from '../../graphql/generatedTypes';
import ageConstants from '../youthProfile/constants/ageConstants';
import Config from '../../config';

export function getAdminUrl(profileId: null | string) {
  const url = Config.adminUrl;

  if (!profileId) {
    return null;
  }

  return `${url}youthProfiles/${profileId}/show`;
}

export function getFullName(
  profile: null | { firstName: string; lastName: string }
) {
  if (!profile) {
    return '';
  }

  const { firstName, lastName } = profile;

  return `${firstName} ${lastName}`.trim();
}

export function getIsExpired(membershipStatus: MembershipStatus) {
  return membershipStatus === MembershipStatus.EXPIRED;
}

export function getIsActive(membershipStatus: MembershipStatus) {
  return membershipStatus === MembershipStatus.ACTIVE;
}

export function getIsRenewing(membershipStatus: MembershipStatus) {
  return membershipStatus === MembershipStatus.RENEWING;
}

export function getIsPending(membershipStatus: MembershipStatus) {
  return membershipStatus === MembershipStatus.PENDING;
}

export function getAge(birthday: string) {
  return differenceInYears(new Date(), new Date(birthday));
}

export function getIsUnderage(birthday: string) {
  return getAge(birthday) < ageConstants.ADULT;
}
