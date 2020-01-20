/* tslint:disable */
/* eslint-disable */
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL mutation operation: ApproveYouthProfile
// ====================================================

export interface ApproveYouthProfile_approveYouthProfile_youthProfile {
  readonly __typename: "YouthProfileType";
  readonly approverEmail: string;
}

export interface ApproveYouthProfile_approveYouthProfile {
  readonly __typename: "ApproveYouthProfileMutationPayload";
  readonly youthProfile: ApproveYouthProfile_approveYouthProfile_youthProfile | null;
}

export interface ApproveYouthProfile {
  readonly approveYouthProfile: ApproveYouthProfile_approveYouthProfile | null;
}

export interface ApproveYouthProfileVariables {
  readonly input: ApproveYouthProfileMutationInput;
}

/* tslint:disable */
/* eslint-disable */
// This file was automatically generated and should not be edited.

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

/* tslint:disable */
/* eslint-disable */
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL query operation: HasYouthProfile
// ====================================================

export interface HasYouthProfile_myProfile_youthProfile {
  readonly __typename: "YouthProfileType";
  readonly expiration: any;
}

export interface HasYouthProfile_myProfile {
  readonly __typename: "ProfileNode";
  readonly youthProfile: HasYouthProfile_myProfile_youthProfile | null;
}

export interface HasYouthProfile {
  readonly myProfile: HasYouthProfile_myProfile | null;
}

/* tslint:disable */
/* eslint-disable */
// This file was automatically generated and should not be edited.

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

/* tslint:disable */
/* eslint-disable */
// This file was automatically generated and should not be edited.

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

/* tslint:disable */
/* eslint-disable */
// This file was automatically generated and should not be edited.

//==============================================================
// START Enums and Input Objects
//==============================================================

export enum AddressType {
  HOME = "HOME",
  NONE = "NONE",
  OTHER = "OTHER",
  WORK = "WORK",
}

/**
 * An enumeration.
 */
export enum ContactMethod {
  EMAIL = "EMAIL",
  SMS = "SMS",
}

export enum EmailType {
  NONE = "NONE",
  OTHER = "OTHER",
  PERSONAL = "PERSONAL",
  WORK = "WORK",
}

/**
 * An enumeration.
 */
export enum Language {
  ENGLISH = "ENGLISH",
  FINNISH = "FINNISH",
  SWEDISH = "SWEDISH",
}

export enum PhoneType {
  HOME = "HOME",
  MOBILE = "MOBILE",
  NONE = "NONE",
  OTHER = "OTHER",
  WORK = "WORK",
}

export enum YouthLanguage {
  ARABIC = "ARABIC",
  ENGLISH = "ENGLISH",
  ESTONIAN = "ESTONIAN",
  FINNISH = "FINNISH",
  RUSSIAN = "RUSSIAN",
  SOMALI = "SOMALI",
  SWEDISH = "SWEDISH",
}

export interface AddressInput {
  readonly id?: string | null;
  readonly address: string;
  readonly postalCode: string;
  readonly city: string;
  readonly countryCode?: string | null;
  readonly addressType: AddressType;
  readonly primary?: boolean | null;
}

export interface ApproveYouthProfileFields {
  readonly schoolName?: string | null;
  readonly schoolClass?: string | null;
  readonly languageAtHome?: YouthLanguage | null;
  readonly approverFirstName?: string | null;
  readonly approverLastName?: string | null;
  readonly approverPhone?: string | null;
  readonly approverEmail?: string | null;
  readonly birthDate?: any | null;
  readonly photoUsageApproved?: boolean | null;
}

export interface ApproveYouthProfileMutationInput {
  readonly approvalToken: string;
  readonly approvalData: ApproveYouthProfileFields;
  readonly clientMutationId?: string | null;
}

export interface CreateMyProfileMutationInput {
  readonly profile: ProfileInput;
  readonly clientMutationId?: string | null;
}

export interface EmailInput {
  readonly id?: string | null;
  readonly email?: string | null;
  readonly emailType: EmailType;
  readonly primary?: boolean | null;
}

export interface PhoneInput {
  readonly id?: string | null;
  readonly phone: string;
  readonly phoneType: PhoneType;
  readonly primary?: boolean | null;
}

export interface ProfileInput {
  readonly firstName?: string | null;
  readonly lastName?: string | null;
  readonly nickname?: string | null;
  readonly image?: string | null;
  readonly language?: Language | null;
  readonly contactMethod?: ContactMethod | null;
  readonly addEmails?: ReadonlyArray<(EmailInput | null)> | null;
  readonly updateEmails?: ReadonlyArray<(EmailInput | null)> | null;
  readonly removeEmails?: ReadonlyArray<(string | null)> | null;
  readonly addPhones?: ReadonlyArray<(PhoneInput | null)> | null;
  readonly updatePhones?: ReadonlyArray<(PhoneInput | null)> | null;
  readonly removePhones?: ReadonlyArray<(string | null)> | null;
  readonly addAddresses?: ReadonlyArray<(AddressInput | null)> | null;
  readonly updateAddresses?: ReadonlyArray<(AddressInput | null)> | null;
  readonly removeAddresses?: ReadonlyArray<(string | null)> | null;
  readonly youthProfile?: YouthProfileFields | null;
}

export interface YouthProfileFields {
  readonly schoolName?: string | null;
  readonly schoolClass?: string | null;
  readonly languageAtHome?: YouthLanguage | null;
  readonly approverFirstName?: string | null;
  readonly approverLastName?: string | null;
  readonly approverPhone?: string | null;
  readonly approverEmail?: string | null;
  readonly birthDate?: any | null;
}

//==============================================================
// END Enums and Input Objects
//==============================================================
