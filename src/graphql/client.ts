import ApolloClient from 'apollo-boost';

import getAuthenticatedUser from '../oidc/getAuthenticatedUser';

export default new ApolloClient({
  request: async operation => {
    try {
      const user = await getAuthenticatedUser();
      operation.setContext({
        headers: {
          Authorization: `Bearer ${user.access_token}`,
        },
      });
    } catch (e) {
      // User not authenticated
    }
  },
  uri: process.env.REACT_APP_PROFILE_GRAPHQL,
});
