import * as apolloHooks from '@apollo/client';

import useProfileByTokens from '../useProfileByTokens';

describe('useProfileByTokens', () => {
  const approvalToken = '1';
  const readToken = '2';
  let useQuerySpy;

  beforeEach(() => {
    useQuerySpy = jest.spyOn(apolloHooks, 'useQuery').mockReturnValue({});
  });

  afterEach(() => {
    jest.resetAllMocks();
  });

  it('should pass tokens field in options into variables', () => {
    useProfileByTokens({ tokens: { approvalToken, readToken } });

    expect(useQuerySpy).toHaveBeenCalledTimes(2);
    expect(useQuerySpy).toHaveBeenCalledWith(expect.anything(), {
      variables: { token: readToken },
    });
    expect(useQuerySpy).toHaveBeenCalledWith(expect.anything(), {
      variables: { token: approvalToken },
    });
  });

  it('should pass options without tokens', () => {
    const apolloOptions = {
      onError: () => {
        // pass
      },
    };
    const options = {
      tokens: { approvalToken, readToken },
      ...apolloOptions,
    };

    useProfileByTokens(options);

    expect(useQuerySpy).toHaveBeenCalledTimes(2);
    expect(useQuerySpy).toHaveBeenCalledWith(expect.anything(), {
      variables: { token: readToken },
      ...apolloOptions,
    });
    expect(useQuerySpy).toHaveBeenCalledWith(expect.anything(), {
      variables: { token: approvalToken },
      ...apolloOptions,
    });
  });

  it('should merge loading', () => {
    useQuerySpy
      .mockReset()
      .mockReturnValueOnce({
        loading: false,
        error: null,
        data: null,
      })
      .mockReturnValueOnce({
        loading: true,
        error: null,
        data: null,
      });

    const { loading } = useProfileByTokens({
      tokens: { approvalToken, readToken },
    });

    expect(loading).toEqual(true);
  });

  it('should merge errors', () => {
    const profileError = new Error('ProfileError');
    profileError.graphQLErrors = [
      {
        extensions: {
          code: 'PROFILE',
        },
      },
    ];
    const youthProfileError = new Error('YouthProfileError');
    youthProfileError.graphQLErrors = [
      {
        extensions: {
          code: 'Youth',
        },
      },
    ];

    useQuerySpy
      .mockReset()
      .mockReturnValueOnce({
        loading: false,
        error: profileError,
        data: null,
      })
      .mockReturnValueOnce({
        loading: true,
        error: youthProfileError,
        data: null,
      });

    const { error } = useProfileByTokens({
      tokens: { approvalToken, readToken },
    });

    expect(error).toEqual({
      originalErrors: [profileError, youthProfileError],
      graphQLErrors: [
        ...profileError.graphQLErrors,
        ...youthProfileError.graphQLErrors,
      ],
    });
  });

  it('should merge query results', () => {
    const profile = {
      firstName: 'George',
    };
    const youthProfile = {
      schoolName: 'Gdasnks elementary school',
    };

    useQuerySpy
      .mockReset()
      .mockReturnValueOnce({
        loading: false,
        error: null,
        data: {
          profileWithAccessToken: profile,
        },
      })
      .mockReturnValueOnce({
        loading: false,
        error: null,
        data: {
          youthProfileByApprovalToken: youthProfile,
        },
      });

    const { data, error, loading } = useProfileByTokens({
      tokens: { approvalToken, readToken },
    });

    expect(loading).toBeFalsy();
    expect(error).toBeFalsy();
    expect(data).toEqual({
      youthProfileByApprovalToken: {
        ...youthProfile,
        profile,
      },
    });
  });
});
