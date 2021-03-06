import { format } from 'date-fns';

export default function convertDateToLocale(value: string | null | undefined) {
  if (value !== undefined && value !== null) {
    return format(new Date(value), 'dd.MM.yyyy').toLocaleString();
  }
  return '';
}
