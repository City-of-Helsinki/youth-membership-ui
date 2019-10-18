import { createClient as createUrqlClient } from 'urql';

const client = createUrqlClient({
  url: process.env.REACT_APP_PROFILE_GRAPHQL as string,
});

export default client;
