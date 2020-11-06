import countries from 'i18n-iso-countries';

import getLanguageCode from '../../../common/helpers/getLanguageCode';
import { MembershipDetails_myYouthProfile_profile as Profile } from '../../../graphql/generatedTypes';

export default function getAddress(
  profile: Omit<Profile, '__typename'> | null,
  lang: string
) {
  const address = profile?.primaryAddress;

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
