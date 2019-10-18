import {
  createClient as createUrqlClient,
  fetchExchange,
  cacheExchange,
  dedupExchange,
} from 'urql';

import authExchange from './authExchange';

const client = createUrqlClient({
  exchanges: [dedupExchange, cacheExchange, authExchange, fetchExchange],
  url: process.env.REACT_APP_PROFILE_GRAPHQL as string,
});

export default client;
