import { DocumentNode, OperationDefinitionNode } from 'graphql';
import { loader } from 'graphql.macro';

import { ErrorCode } from './errorCodes';

const HAS_YOUTH_PROFILE = loader(
  '../domain/youthProfile/graphql/HasYouthProfile.graphql'
);
const PREFILL_REGISTRATION = loader(
  '../domain/youthProfile/graphql/PrefillRegistration.graphql'
);

function getName(document?: DocumentNode): string {
  if (!document) {
    throw Error('No document found');
  }

  const operation = document.definitions.find(
    (definition): definition is OperationDefinitionNode =>
      definition.kind === 'OperationDefinition'
  );

  if (!operation) {
    throw Error('No operation definition found from document');
  }

  if (!operation.name) {
    throw Error('Operation definitions did not have name');
  }

  return operation.name.value;
}

// Operation name, error code, shouldConsume
export type IgnoreRule = [string, ErrorCode, boolean];

type IgnoreInput =
  | [DocumentNode | undefined, ErrorCode]
  | [DocumentNode | undefined, ErrorCode, boolean];

function createIgnoreErrorsConfig(ignoreInput: IgnoreInput[]): IgnoreRule[] {
  const ignoreErrorRules: IgnoreRule[] = [];

  ignoreInput.forEach(([document, errorCode, shouldConsume = false]) => {
    try {
      const name = getName(document);

      ignoreErrorRules.push([name, errorCode, shouldConsume]);
    } catch (e) {
      throw e;
    }
  });

  return ignoreErrorRules;
}

export const ignoreErrorRules: IgnoreRule[] = createIgnoreErrorsConfig([
  [HAS_YOUTH_PROFILE, 'PERMISSION_DENIED_ERROR', true],
  [PREFILL_REGISTRATION, 'PERMISSION_DENIED_ERROR', true],
]);
