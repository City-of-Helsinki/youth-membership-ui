import { YouthProfileByApprovalToken } from '../../../graphql/generatedTypes';

export default function getAddress(data: YouthProfileByApprovalToken) {
  if (data?.youthProfileByApprovalToken?.profile?.primaryAddress) {
    const address = data.youthProfileByApprovalToken.profile.primaryAddress;
    return `${address.address}, ${address.city} ${address.postalCode}`;
  }
  return '';
}
