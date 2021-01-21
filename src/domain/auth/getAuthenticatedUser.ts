import { User } from 'oidc-client';

import userManager from './userManager';

function getAuthenticatedUser(): Promise<User> {
  return new Promise(async (resolve, reject) => {
    const user = await userManager.getUser();
    if (user && !user.expired) {
      resolve(user);
    } else {
      reject();
    }
  });
}

export default getAuthenticatedUser;
