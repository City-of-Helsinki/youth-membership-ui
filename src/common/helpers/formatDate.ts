import format from 'date-fns/format';
import parse from 'date-fns/parse';

export default function formatDate(dateString: string) {
  const date = parse(dateString, 'yyyy-MM-dd', new Date());
  return format(date, 'd.M.yyyy');
}
