import userManager from './userManager';
import store from '../redux/store';
import { apiError } from './redux';

export default function(): void {
  userManager
    .signinRedirect()
    .catch(error => store.dispatch(apiError(error.toString())));
}
