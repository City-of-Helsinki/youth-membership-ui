/* tslint:disable */
/* eslint-disable */
// This file was automatically generated and should not be edited.

import { ProfileInput } from "./../../../../graphql/__generated__/globalTypes";

// ====================================================
// GraphQL mutation operation: CreateProfile
// ====================================================

export interface CreateProfile_createProfile_profile_youthProfile {
  readonly __typename: "YouthProfileType";
  readonly birthDate: any;
  readonly schoolName: string;
  readonly schoolClass: string;
  readonly approverFirstName: string;
  readonly approverLastName: string;
  readonly approverPhone: string;
  readonly approverEmail: string;
  readonly approvedTime: any | null;
  readonly photoUsageApproved: boolean | null;
  /**
   * Youth's membership number
   */
  readonly membershipNumber: string | null;
}

export interface CreateProfile_createProfile_profile {
  readonly __typename: "ProfileNode";
  /**
   * The ID of the object.
   */
  readonly id: string;
  readonly youthProfile: CreateProfile_createProfile_profile_youthProfile | null;
}

export interface CreateProfile_createProfile {
  readonly __typename: "CreateProfile";
  readonly profile: CreateProfile_createProfile_profile | null;
}

export interface CreateProfile {
  readonly createProfile: CreateProfile_createProfile | null;
}

export interface CreateProfileVariables {
  readonly profile: ProfileInput;
}
