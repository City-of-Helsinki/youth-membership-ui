import { USER_EXPIRED, LOAD_USER_ERROR, USER_SIGNED_OUT } from 'redux-oidc';

import fetchApiTokens from '../fetchApiTokens';
import reducer, {
  startFetching,
  receiveApiToken,
  apiError,
  resetError,
  apiTokensSelector,
  profileApiTokenSelector,
  isAuthenticatedSelector,
  isFetchingApiTokenSelector,
  fetchApiTokenThunk,
} from '../redux';

jest.mock('../fetchApiTokens');

const initialState = {
  apiTokens: {},
  error: null,
  loading: false,
};

describe('redux.ts', () => {
  describe('reducer', () => {
    it('startFetching', () => {
      expect(reducer(initialState, startFetching())).toEqual({
        ...initialState,
        loading: true,
      });
    });

    it('receiveApiToken', () => {
      const payload = {
        token: '123',
      };

      expect(reducer(initialState, receiveApiToken({ payload }))).toEqual({
        ...initialState,
        error: null,
        apiTokens: { payload },
        loading: false,
      });
    });

    it('apiError', () => {
      const payload = {
        error: new Error('test'),
      };

      expect(reducer(initialState, apiError({ payload }))).toEqual({
        ...initialState,
        error: { payload },
        apiTokens: {},
        loading: false,
      });
    });

    it('resetError', () => {
      expect(reducer(initialState, resetError())).toEqual({
        ...initialState,
        error: null,
      });
    });
  });

  describe('extraReducer', () => {
    it('user expired', () => {
      expect(reducer({}, { type: USER_EXPIRED })).toEqual(initialState);
    });

    it('user load error', () => {
      expect(reducer({}, { type: LOAD_USER_ERROR })).toEqual(initialState);
    });

    it('user signed out', () => {
      expect(reducer({}, { type: USER_SIGNED_OUT })).toEqual(initialState);
    });
  });

  describe('fetchApiTokenThunk', () => {
    it('should work', async () => {
      const dispatch = jest.fn();
      const accessToken = '1234';
      const doThunk = fetchApiTokenThunk(accessToken);

      await doThunk(dispatch);

      expect(dispatch).toHaveBeenCalledWith(startFetching());
      expect(fetchApiTokens).toHaveBeenCalledWith(accessToken);
      expect(dispatch).toHaveBeenCalledWith(receiveApiToken());
    });

    it('should set error when there is something unexpected', async () => {
      const dispatch = jest.fn();
      const accessToken = '1234';
      const error = new Error('Test');

      fetchApiTokens.mockRejectedValueOnce(error);

      const doThunk = fetchApiTokenThunk(accessToken);

      await doThunk(dispatch);

      expect(dispatch).toHaveBeenCalledWith(startFetching());
      expect(fetchApiTokens).toHaveBeenCalledWith(accessToken);
      expect(dispatch).toHaveBeenCalledWith(apiError(error.toString()));
    });
  });

  describe('selectors', () => {
    const state = {
      auth: {
        apiTokens: {
          'https://api.hel.fi/auth/helsinkiprofile': 'sadfj123ojqq',
          'https://api.hel.fi/auth/jassari': 'cmxsdijo23b424',
        },
      },
    };

    it('apiTokensSelector', () => {
      expect(apiTokensSelector(state)).toMatchInlineSnapshot(`
        Object {
          "https://api.hel.fi/auth/helsinkiprofile": "sadfj123ojqq",
          "https://api.hel.fi/auth/jassari": "cmxsdijo23b424",
        }
      `);
    });

    it('profileApiTokenSelector', () => {
      expect(profileApiTokenSelector(state)).toMatchInlineSnapshot(
        `"sadfj123ojqq"`
      );
    });

    describe('isAuthenticatedSelector', () => {
      it('returns true when user is not being loaded and user exists', () => {
        expect(
          isAuthenticatedSelector({
            oidc: {
              isLoadingUser: false,
              user: {},
            },
          })
        ).toEqual(true);
      });

      it('returns false when user is being loaded and user exists', () => {
        expect(
          isAuthenticatedSelector({
            oidc: {
              isLoadingUser: true,
              user: {},
            },
          })
        ).toEqual(false);
      });

      it('returns false when user is not being loaded and user does not exist', () => {
        expect(
          isAuthenticatedSelector({
            oidc: {
              isLoadingUser: true,
            },
          })
        ).toEqual(false);
      });
    });

    describe('isFetchingApiTokenSelector', () => {
      it('returns true when auth state is loading', () => {
        expect(
          isFetchingApiTokenSelector({
            auth: {
              loading: true,
            },
          })
        ).toEqual(true);
      });

      it('returns false when auth state is not loading', () => {
        expect(
          isFetchingApiTokenSelector({
            auth: {
              loading: false,
            },
          })
        ).toEqual(false);
      });
    });
  });
});
