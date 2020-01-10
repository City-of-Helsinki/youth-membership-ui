/* tslint:disable */
/* eslint-disable */
// This file was automatically generated and should not be edited.

import { ApproveYouthProfileInput } from "./../../../../graphql/__generated__/globalTypes";

// ====================================================
// GraphQL mutation operation: ApproveYouthProfile
// ====================================================

export interface ApproveYouthProfile_approveYouthProfile_youthProfile {
  readonly __typename: "YouthProfileType";
  readonly approverEmail: string;
}

export interface ApproveYouthProfile_approveYouthProfile {
  readonly __typename: "ApproveYouthProfile";
  readonly youthProfile: ApproveYouthProfile_approveYouthProfile_youthProfile | null;
}

export interface ApproveYouthProfile {
  readonly approveYouthProfile: ApproveYouthProfile_approveYouthProfile | null;
}

export interface ApproveYouthProfileVariables {
  readonly approvalData: ApproveYouthProfileInput;
  readonly approvalToken: string;
}
