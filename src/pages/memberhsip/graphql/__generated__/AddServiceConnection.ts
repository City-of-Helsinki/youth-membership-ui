/* tslint:disable */
/* eslint-disable */
// This file was automatically generated and should not be edited.

import { AddServiceConnectionMutationInput } from "./../../../../graphql/__generated__/globalTypes";

// ====================================================
// GraphQL mutation operation: AddServiceConnection
// ====================================================

export interface AddServiceConnection_addServiceConnection_serviceConnection {
  readonly __typename: "ServiceConnectionType";
  readonly enabled: boolean;
}

export interface AddServiceConnection_addServiceConnection {
  readonly __typename: "AddServiceConnectionMutationPayload";
  readonly serviceConnection: AddServiceConnection_addServiceConnection_serviceConnection | null;
}

export interface AddServiceConnection {
  readonly addServiceConnection: AddServiceConnection_addServiceConnection | null;
}

export interface AddServiceConnectionVariables {
  readonly input: AddServiceConnectionMutationInput;
}
