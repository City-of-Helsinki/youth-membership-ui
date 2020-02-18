import userManager from './userManager';
import store from '../redux/store';
import { apiError } from './redux';

export default function(): void {
  userManager
    .signoutRedirect()
    .catch(e => store.dispatch(apiError(e.toString())));
}
