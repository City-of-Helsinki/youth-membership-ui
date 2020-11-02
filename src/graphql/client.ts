import ApolloClient from 'apollo-boost';

import store from '../redux/store';
import { apiTokensSelector } from '../domain/auth/redux';
import getAuthenticatedUser from '../domain/auth/getAuthenticatedUser';
import fetchApiTokens from '../domain/auth/fetchApiTokens';
import handleError from './handleError';

const getTokens = async () => {
  try {
    // First try to get previously fetched token from store
    const tokensFromStore = apiTokensSelector(store.getState());

    // Check that object has values
    if (Object.keys(tokensFromStore).length > 0) {
      return tokensFromStore;
    }
    // If not found from store, fallback to fetching api-token from api.
    const tunnistamoUser = await getAuthenticatedUser();
    return await fetchApiTokens(tunnistamoUser.access_token);
  } catch (e) {
    return null;
  }
};

export default new ApolloClient({
  request: async operation => {
    const tokens = await getTokens();

    if (tokens) {
      operation.setContext({
        headers: {
          'Api-Tokens': JSON.stringify(tokens),
        },
      });
    }
  },
  uri: process.env.REACT_APP_PROFILE_GRAPHQL,
  onError: handleError,
});
