import { isAfter } from 'date-fns';

export default function isMembershipValid(
  expirationDate: string,
  approvedTime: string | null
) {
  if (isAfter(new Date(), new Date(expirationDate))) return false;
  return !(
    approvedTime === null || isAfter(new Date(approvedTime), new Date())
  );
}
