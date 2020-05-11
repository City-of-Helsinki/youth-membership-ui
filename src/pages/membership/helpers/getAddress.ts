import countries from 'i18n-iso-countries';

import {
  YouthProfileByApprovalToken,
  MembershipDetails,
} from '../../../graphql/generatedTypes';

export default function getAddress(
  data: YouthProfileByApprovalToken | MembershipDetails,
  lang: string
) {
  let address = null;
  if ('youthProfile' in data) {
    // MembershipDetails
    address = data.youthProfile?.profile.primaryAddress;
  } else if ('youthProfileByApprovalToken' in data) {
    // YouthProfileByApprovalToken
    address = data.youthProfileByApprovalToken?.profile.primaryAddress;
  }
  if (address) {
    return `${address.address}, ${address.postalCode} ${address.city}\n${countries.getName(address.countryCode, lang)}`;
  }
  return '';
}
