import { ErrorLink } from 'apollo-link-error';
import * as Sentry from '@sentry/browser';
import { GraphQLError, OperationDefinitionNode } from 'graphql';
import { Operation } from 'apollo-boost';

import { ignoreErrorRules } from './config';

const stringify = (value: unknown) => JSON.stringify(value, null, 2);

function getShouldIgnore(
  operation: Operation,
  graphQLError: GraphQLError
): [boolean, boolean | null] {
  const ignoreRule = ignoreErrorRules.find(([operationName, errorCode]) => {
    const isOperation = operationName === operation.operationName;
    const isError = graphQLError?.extensions?.code === errorCode;

    return isOperation && isError;
  });

  if (!ignoreRule) {
    return [false, null];
  }

  return [true, ignoreRule[2]];
}

function handleError({
  networkError,
  graphQLErrors,
  operation,
  response,
}: Parameters<ErrorLink.ErrorHandler>[0]): ReturnType<ErrorLink.ErrorHandler> {
  // Remember to not log variables or queries unless you are sure that
  // they don't contain any personal information!
  if (graphQLErrors) {
    graphQLErrors.forEach(graphQLError => {
      const [shouldIgnore, shouldConsume] = getShouldIgnore(
        operation,
        graphQLError
      );
      // For some errors we do not want to log entries into Sentry. Often
      // these errors are permissions related errors we know to expect
      // and can't avoid.
      if (shouldIgnore) {
        // Sometimes we don't want to pass down the error in which case
        // we "consume" it. This means that for instance hooks are not
        // called with this error. Note that stopping one error from
        // being passed will stop all the rest as well.
        // https://www.apollographql.com/docs/react/data/error-handling/#ignoring-errors
        if (shouldConsume && response) {
          delete response['errors'];
        }
        return;
      }

      const {
        originalError,
        extensions,
        locations,
        message,
        path,
      } = graphQLError;

      Sentry.withScope(scope => {
        const operationName = operation.operationName;
        const operationKind = operation.query.definitions.find(
          (definition): definition is OperationDefinitionNode =>
            definition.kind === 'OperationDefinition'
        )?.operation;

        scope.setLevel(Sentry.Severity.Error);

        scope.setTag('type', 'GraphQL Error');
        scope.setTag('operation.name', operationName);
        if (operationKind) {
          scope.setTag('operation.kind', operationKind);
        }

        scope.setContext('GraphQL Error', {
          extensions: stringify(extensions),
          locations: stringify(locations),
          path: stringify(path),
        });
        scope.setContext('Operation', {
          name: operationName,
          kind: operationKind,
        });

        if (originalError) {
          scope.setExtra('message', message);
          Sentry.captureException(originalError);
        } else {
          Sentry.captureMessage(message);
        }
      });
    });
  }

  if (networkError) {
    Sentry.withScope(scope => {
      scope.setTag('type', 'Network Error');
      Sentry.captureException(networkError);
    });
  }
}

export default handleError;
