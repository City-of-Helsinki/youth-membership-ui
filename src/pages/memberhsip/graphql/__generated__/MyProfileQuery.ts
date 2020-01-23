/* tslint:disable */
/* eslint-disable */
// This file was automatically generated and should not be edited.

import { YouthLanguage } from "./../../../../graphql/__generated__/globalTypes";

// ====================================================
// GraphQL query operation: MyProfileQuery
// ====================================================

export interface MyProfileQuery_myProfile_primaryAddress {
  readonly __typename: "AddressNode";
  readonly address: string;
  readonly postalCode: string;
  readonly city: string;
}

export interface MyProfileQuery_myProfile_primaryEmail {
  readonly __typename: "EmailNode";
  readonly email: string;
}

export interface MyProfileQuery_myProfile_primaryPhone {
  readonly __typename: "PhoneNode";
  readonly phone: string | null;
}

export interface MyProfileQuery_myProfile_youthProfile {
  readonly __typename: "YouthProfileType";
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

export interface MyProfileQuery_myProfile {
  readonly __typename: "ProfileNode";
  readonly firstName: string;
  readonly lastName: string;
  readonly primaryAddress: MyProfileQuery_myProfile_primaryAddress | null;
  readonly primaryEmail: MyProfileQuery_myProfile_primaryEmail | null;
  readonly primaryPhone: MyProfileQuery_myProfile_primaryPhone | null;
  readonly youthProfile: MyProfileQuery_myProfile_youthProfile | null;
}

export interface MyProfileQuery {
  readonly myProfile: MyProfileQuery_myProfile | null;
}