import userManager from './userManager';
import store from '../redux/store';
import { apiError } from './redux';

export default function(): void {
  // Reset birthDate cookie here as well. This way we will never run to a problem
  // where user is redirected to registration from without or with wrong birthDate
  document.cookie = 'birthDate=';
  userManager
    .signoutRedirect()
    .catch(e => store.dispatch(apiError(e.toString())));
}
