import { ApolloClient, ApolloLink, InMemoryCache } from '@apollo/client';
import { onError } from '@apollo/client/link/error';
import { setContext } from '@apollo/client/link/context';
import { HttpLink } from '@apollo/client/link/http';

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

const httpLink = new HttpLink({
  uri: process.env.REACT_APP_PROFILE_GRAPHQL,
});

const errorLink = onError(handleError);

const authLink = setContext(async (_, { headers }) => {
  const tokens = await getTokens();

  if (tokens) {
    return {
      headers: {
        ...headers,
        'Api-Tokens': JSON.stringify(tokens),
      },
    };
  }
});

export default new ApolloClient({
  link: ApolloLink.from([authLink, errorLink, httpLink]),
  cache: new InMemoryCache(),
});
