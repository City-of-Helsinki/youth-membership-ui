/* tslint:disable */
/* eslint-disable */
// This file was automatically generated and should not be edited.

import { CreateMyProfileMutationInput } from "./../../../../graphql/__generated__/globalTypes";

// ====================================================
// GraphQL mutation operation: CreateMyProfile
// ====================================================

export interface CreateMyProfile_createMyProfile_profile_youthProfile {
  readonly __typename: "YouthProfileType";
  readonly birthDate: any;
}

export interface CreateMyProfile_createMyProfile_profile {
  readonly __typename: "ProfileNode";
  readonly youthProfile: CreateMyProfile_createMyProfile_profile_youthProfile | null;
}

export interface CreateMyProfile_createMyProfile {
  readonly __typename: "CreateMyProfileMutationPayload";
  readonly profile: CreateMyProfile_createMyProfile_profile | null;
}

export interface CreateMyProfile {
  readonly createMyProfile: CreateMyProfile_createMyProfile | null;
}

export interface CreateMyProfileVariables {
  readonly input: CreateMyProfileMutationInput;
}
