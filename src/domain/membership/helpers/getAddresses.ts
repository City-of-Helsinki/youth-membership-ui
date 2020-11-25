import countries from 'i18n-iso-countries';

import getLanguageCode from '../../../common/helpers/getLanguageCode';
import {
  MembershipDetails_myYouthProfile_profile as Profile,
  MembershipDetails_myYouthProfile_profile_addresses_edges_node as Address,
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

export default function getAddresses(
  profile: Omit<Profile, '__typename'>,
  lang: string
) {
  const addresses = (profile?.addresses?.edges || [])
    .map(edge => edge?.node)
    .filter((node): node is Address => Boolean(node));

  if (addresses) {
    return addresses
      .filter(address => !address.primary)
      .map(address => formatAddress(address, lang));
  }

  return [];
}
