import { gql } from '@apollo/client';

import client from '../client';

jest.mock('../../domain/auth/redux', () => {
  return {
    apiTokensSelector: () =>
      //eslint-disable-next-line max-len
      "{'https://api.hel.fi/auth/jassariapi': 'jassari-token-1234', 'https://api.hel.fi/auth/helsinkiprofile': 'profile-token-1234'}",
  };
});

describe('graphql client', () => {
  beforeEach(() => {
    global.fetch.resetMocks();
  });

  it('sets Authorization-header to requests', async () => {
    global.fetch.mockResponse(
      JSON.stringify({
        data: {
          profile: null,
        },
      })
    );

    try {
      await client.query({
        query: gql`
          query FooQuery {
            profile
          }
        `,
      });
    } catch (e) {}

    const fetchOptions = global.fetch.mock.calls[0][1];
    expect(fetchOptions.headers).toHaveProperty(
      'Api-Tokens',
      //eslint-disable-next-line max-len
      "\"{'https://api.hel.fi/auth/jassariapi': 'jassari-token-1234', 'https://api.hel.fi/auth/helsinkiprofile': 'profile-token-1234'}\""
    );
  });
});
