import countries from 'i18n-iso-countries';

import getLanguageCode from '../../../common/helpers/getLanguageCode';
import {
  YouthProfileByApprovalToken,
  MembershipDetails,
  MembershipDetails_youthProfile_profile_addresses_edges as AddressEdges,
  MembershipDetails_youthProfile_profile_addresses_edges_node as Address,
} from '../../../graphql/generatedTypes';

function formatAddress(address: Address, lang: string) {
  const country = countries.getName(
    address.countryCode || 'FI',
    getLanguageCode(lang)
  );

  return [address.address, address.postalCode, address.city, country]
    .filter(addressPart => addressPart)
    .join(', ');
}

function findAddressesEdges(
  data: YouthProfileByApprovalToken | MembershipDetails
): Readonly<Array<AddressEdges | null> | undefined> {
  if ('youthProfile' in data) {
    // MembershipDetails
    return data.youthProfile?.profile.addresses?.edges;
  } else if ('youthProfileByApprovalToken' in data) {
    // YouthProfileByApprovalToken
    return data.youthProfileByApprovalToken?.profile.addresses?.edges;
  }

  return;
}

function handleApiData(
  data: YouthProfileByApprovalToken | MembershipDetails
): Address[] {
  const edges = findAddressesEdges(data) || [];

  return edges
    .map(edge => edge?.node)
    .filter((node): node is Address => Boolean(node));
}

export default function getAddress(
  data: YouthProfileByApprovalToken | MembershipDetails,
  lang: string
) {
  const addresses = handleApiData(data);

  if (addresses) {
    return addresses
      .filter(address => !address.primary)
      .map(address => formatAddress(address, lang));
  }

  return [];
}
