import {
  PrefillRegistartion_myProfile_addresses_edges_node as PrefillAddress,
  MembershipDetails_myYouthProfile_profile_addresses_edges_node as MembershipAddress,
  PrefillRegistartion,
  MembershipDetails,
} from '../../../graphql/generatedTypes';

const getEdge = (
  type: 'prefill' | 'membership',
  data?: PrefillRegistartion | MembershipDetails
) => {
  switch (type) {
    case 'prefill':
      return (data as PrefillRegistartion)?.myProfile?.addresses?.edges || [];
    case 'membership':
      return (
        (data as MembershipDetails)?.myYouthProfile?.profile?.addresses
          ?.edges || []
      );
    default:
      return [];
  }
};

const getAddressesFromNode = (
  type: 'prefill' | 'membership',
  data?: PrefillRegistartion | MembershipDetails
) => {
  const edge = getEdge(type, data);

  return edge
    .filter(edge => !edge?.node?.primary)
    .map(
      edge =>
        ({
          address: edge?.node?.address,
          postalCode: edge?.node?.postalCode,
          city: edge?.node?.city,
          countryCode: edge?.node?.countryCode,
          id: edge?.node?.id,
          primary: edge?.node?.primary,
          addressType: edge?.node?.addressType,
          __typename: edge?.node?.__typename || 'AddressNode',
        } as PrefillAddress | MembershipAddress)
    );
};

export default getAddressesFromNode;
