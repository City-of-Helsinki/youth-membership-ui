/* tslint:disable */
/* eslint-disable */
// This file was automatically generated and should not be edited.

import { YouthLanguage } from "../../../../graphql/__generated__/globalTypes";

// ====================================================
// GraphQL query operation: YouthProfileByApprovalToken
// ====================================================

export interface YouthProfileByApprovalToken_youthProfileByApprovalToken_profile_primaryEmail {
  readonly __typename: "EmailNode";
  readonly email: string;
}

export interface YouthProfileByApprovalToken_youthProfileByApprovalToken_profile_primaryAddress {
  readonly __typename: "AddressNode";
  readonly address: string;
  readonly postalCode: string;
  readonly city: string;
}

export interface YouthProfileByApprovalToken_youthProfileByApprovalToken_profile_primaryPhone {
  readonly __typename: "PhoneNode";
  readonly phone: string | null;
}

export interface YouthProfileByApprovalToken_youthProfileByApprovalToken_profile {
  readonly __typename: "ProfileNode";
  readonly firstName: string;
  readonly lastName: string;
  readonly primaryEmail: YouthProfileByApprovalToken_youthProfileByApprovalToken_profile_primaryEmail | null;
  readonly primaryAddress: YouthProfileByApprovalToken_youthProfileByApprovalToken_profile_primaryAddress | null;
  readonly primaryPhone: YouthProfileByApprovalToken_youthProfileByApprovalToken_profile_primaryPhone | null;
}

export interface YouthProfileByApprovalToken_youthProfileByApprovalToken {
  readonly __typename: "YouthProfileType";
  readonly profile: YouthProfileByApprovalToken_youthProfileByApprovalToken_profile;
  readonly birthDate: any;
  readonly schoolName: string;
  readonly schoolClass: string;
  readonly approverFirstName: string;
  readonly approverLastName: string;
  readonly approverPhone: string;
  readonly approverEmail: string;
  readonly photoUsageApproved: boolean | null;
  /**
   * The language which is spoken in the youth's home.
   */
  readonly languageAtHome: YouthLanguage | null;
}

export interface YouthProfileByApprovalToken {
  readonly youthProfileByApprovalToken: YouthProfileByApprovalToken_youthProfileByApprovalToken | null;
}

export interface YouthProfileByApprovalTokenVariables {
  readonly token: string;
}
