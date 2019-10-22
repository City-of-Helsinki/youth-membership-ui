import ApolloClient from 'apollo-boost';

import userManager from '../oidc/userManager';

export default new ApolloClient({
  request: async operation => {
    const user = await userManager.getUser();
    if (user) {
      operation.setContext({
        headers: {
          Authorization: `Bearer ${user.access_token}`,
        },
      });
    }
  },
  uri: process.env.REACT_APP_PROFILE_GRAPHQL,
});
