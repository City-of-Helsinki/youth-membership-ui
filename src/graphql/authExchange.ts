import { Exchange, Operation } from 'urql';
import { map, mergeMap, pipe, fromPromise } from 'wonka';
import { User } from 'oidc-client';

import userManager from '../oidc/userManager';

const mergeTokenIntoOperation = (
  token: string,
  operation: Operation
): Operation => ({
  ...operation,
  context: {
    ...operation.context,
    fetchOptions: {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    },
  },
});

const setAuthToken = (operation: Operation) =>
  pipe(
    fromPromise(userManager.getUser()),
    map((user: User | null) => {
      if (user) {
        return mergeTokenIntoOperation(user.access_token, operation);
      }
      return operation;
    })
  );

const authExchange: Exchange = ({ forward }) => operations$ =>
  pipe(
    operations$,
    mergeMap(operation => setAuthToken(operation)),
    forward
  );

export default authExchange;
