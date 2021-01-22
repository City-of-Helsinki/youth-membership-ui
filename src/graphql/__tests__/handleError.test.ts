/* eslint-disable @typescript-eslint/ban-ts-comment */
import { GraphQLError } from 'graphql';
import { Operation } from '@apollo/client';
import * as Sentry from '@sentry/browser';

import * as config from '../config';
import handleError from '../handleError';

jest.mock('../config');

const graphQLError = ({
  message: 'Message',
  extensions: {
    code: 'TEST',
  },
  locations: [],
  path: ['myTest'],
} as unknown) as GraphQLError;

const operation = ({
  operationName: 'Test',
  query: {
    definitions: [
      {
        kind: 'OperationDefinition',
        operation: 'query',
      },
    ],
  },
} as unknown) as Operation;

describe('handleError', () => {
  let ignoreRules: unknown;

  beforeEach(() => {
    ignoreRules = config.ignoreErrorRules;
  });

  afterEach(() => {
    jest.resetAllMocks();
    // @ts-ignore
    // eslint-disable-next-line import/namespace
    config.ignoreErrorRules = ignoreRules;
  });

  describe('GraphQL errors', () => {
    it('should send graphQL errors', () => {
      const mockScope = {
        setLevel: jest.fn(),
        setTag: jest.fn(),
        setContext: jest.fn(),
        setExtra: jest.fn(),
      };
      const captureExceptionSpy = jest.spyOn(Sentry, 'captureException');
      const captureMessageSpy = jest.spyOn(Sentry, 'captureMessage');
      const withScopeSpy = jest.spyOn(Sentry, 'withScope');

      // @ts-ignore
      withScopeSpy.mockImplementation(cb => cb(mockScope));

      // @ts-ignore
      handleError({ graphQLErrors: [graphQLError], operation });

      expect(withScopeSpy).toHaveBeenCalledTimes(1);
      expect(mockScope.setLevel).toHaveBeenCalledWith('error');
      expect(mockScope.setTag).toHaveBeenCalledWith('type', 'GraphQL Error');
      expect(mockScope.setTag).toHaveBeenCalledWith('operation.kind', 'query');
      expect(mockScope.setContext).toHaveBeenCalledWith(
        'GraphQL Error',
        expect.any(Object)
      );
      expect(mockScope.setContext).toHaveBeenCalledWith(
        'Operation',
        expect.any(Object)
      );
      expect(captureExceptionSpy).toHaveBeenCalledTimes(0);
      expect(captureMessageSpy).toHaveBeenCalledWith(graphQLError.message);
    });

    it('should allow errors to be ignored', () => {
      const captureExceptionSpy = jest.spyOn(Sentry, 'captureException');
      const captureMessageSpy = jest.spyOn(Sentry, 'captureMessage');

      // @ts-ignore
      // eslint-disable-next-line import/namespace
      config.ignoreErrorRules = [
        [operation.operationName, graphQLError.extensions?.code],
      ];

      // @ts-ignore
      handleError({ graphQLErrors: [graphQLError], operation });

      expect(captureExceptionSpy).toHaveBeenCalledTimes(0);
      expect(captureMessageSpy).toHaveBeenCalledTimes(0);
    });

    it('should allow errors to be consumed', () => {
      const captureExceptionSpy = jest.spyOn(Sentry, 'captureException');
      const captureMessageSpy = jest.spyOn(Sentry, 'captureMessage');
      const response = {
        errors: 'Some error',
      };

      // @ts-ignore
      // eslint-disable-next-line import/namespace
      config.ignoreErrorRules = [
        [operation.operationName, graphQLError.extensions?.code, true],
      ];

      // @ts-ignore
      handleError({ graphQLErrors: [graphQLError], operation, response });

      expect(captureExceptionSpy).toHaveBeenCalledTimes(0);
      expect(captureMessageSpy).toHaveBeenCalledTimes(0);
      expect(response.errors).toBeUndefined();
    });
  });

  describe('network errors', () => {
    it('should send network errors', () => {
      const error = Error('Test');
      const mockScope = {
        setTag: jest.fn(),
      };
      const captureExceptionSpy = jest.spyOn(Sentry, 'captureException');
      const captureMessageSpy = jest.spyOn(Sentry, 'captureMessage');
      const withScopeSpy = jest.spyOn(Sentry, 'withScope');

      // @ts-ignore
      withScopeSpy.mockImplementation(cb => cb(mockScope));

      // @ts-ignore
      handleError({ networkError: error, operation });

      expect(withScopeSpy).toHaveBeenCalledTimes(1);
      expect(mockScope.setTag).toHaveBeenCalledWith('type', 'Network Error');
      expect(captureExceptionSpy).toHaveBeenCalledWith(error);
      expect(captureMessageSpy).toHaveBeenCalledTimes(0);
    });
  });
});
