import countries from 'i18n-iso-countries';

import getLanguageCode from '../../../common/helpers/getLanguageCode';
import {
  YouthProfileByApprovalToken,
  MembershipDetails,
} from '../../../graphql/generatedTypes';

export default function getAddress(
  data: YouthProfileByApprovalToken | MembershipDetails,
  lang: string
) {
  let address = null;
  if ('myYouthProfile' in data) {
    // MembershipDetails
    address = data.myYouthProfile?.profile?.primaryAddress;
  } else if ('youthProfileByApprovalToken' in data) {
    // YouthProfileByApprovalToken
    address = data.youthProfileByApprovalToken?.profile?.primaryAddress;
  }

  if (address) {
    const country = countries.getName(
      address.countryCode || 'FI',
      getLanguageCode(lang)
    );

    return [address.address, address.postalCode, address.city, country]
      .filter(addressPart => addressPart)
      .join(', ');
  }

  return '';
}
