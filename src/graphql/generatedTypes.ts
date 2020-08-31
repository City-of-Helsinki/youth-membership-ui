/* tslint:disable */
/* eslint-disable */
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL query operation: MembershipDetails
// ====================================================

export interface MembershipDetails_youthProfile_profile_primaryAddress {
  readonly __typename: "AddressNode";
  readonly address: string;
  readonly postalCode: string;
  readonly city: string;
  readonly countryCode: string;
  /**
   * The ID of the object.
   */
  readonly id: string;
  readonly addressType: AddressType | null;
  readonly primary: boolean;
}

export interface MembershipDetails_youthProfile_profile_addresses_edges_node {
  readonly __typename: "AddressNode";
  readonly primary: boolean;
  /**
   * The ID of the object.
   */
  readonly id: string;
  readonly address: string;
  readonly postalCode: string;
  readonly city: string;
  readonly countryCode: string;
  readonly addressType: AddressType | null;
}

export interface MembershipDetails_youthProfile_profile_addresses_edges {
  readonly __typename: "AddressNodeEdge";
  /**
   * The item at the end of the edge
   */
  readonly node: MembershipDetails_youthProfile_profile_addresses_edges_node | null;
}

export interface MembershipDetails_youthProfile_profile_addresses {
  readonly __typename: "AddressNodeConnection";
  /**
   * Contains the nodes in this connection.
   */
  readonly edges: ReadonlyArray<(MembershipDetails_youthProfile_profile_addresses_edges | null)>;
}

export interface MembershipDetails_youthProfile_profile_primaryEmail {
  readonly __typename: "EmailNode";
  readonly email: string;
  /**
   * The ID of the object.
   */
  readonly id: string;
}

export interface MembershipDetails_youthProfile_profile_primaryPhone {
  readonly __typename: "PhoneNode";
  readonly phone: string | null;
  /**
   * The ID of the object.
   */
  readonly id: string;
}

export interface MembershipDetails_youthProfile_profile {
  readonly __typename: "ProfileNode";
  readonly firstName: string;
  readonly lastName: string;
  readonly language: Language | null;
  /**
   * The ID of the object.
   */
  readonly id: string;
  /**
   * Convenience field for the address which is marked as primary.
   */
  readonly primaryAddress: MembershipDetails_youthProfile_profile_primaryAddress | null;
  /**
   * List of addresses of the profile.
   */
  readonly addresses: MembershipDetails_youthProfile_profile_addresses | null;
  /**
   * Convenience field for the email which is marked as primary.
   */
  readonly primaryEmail: MembershipDetails_youthProfile_profile_primaryEmail | null;
  /**
   * Convenience field for the phone which is marked as primary.
   */
  readonly primaryPhone: MembershipDetails_youthProfile_profile_primaryPhone | null;
}

export interface MembershipDetails_youthProfile_additionalContactPersons_edges_node {
  readonly __typename: "AdditionalContactPersonNode";
  /**
   * The ID of the object.
   */
  readonly id: string;
  readonly firstName: string;
  readonly lastName: string;
  readonly phone: string;
  readonly email: string;
}

export interface MembershipDetails_youthProfile_additionalContactPersons_edges {
  readonly __typename: "AdditionalContactPersonNodeEdge";
  /**
   * The item at the end of the edge
   */
  readonly node: MembershipDetails_youthProfile_additionalContactPersons_edges_node | null;
}

export interface MembershipDetails_youthProfile_additionalContactPersons {
  readonly __typename: "AdditionalContactPersonNodeConnection";
  /**
   * Contains the nodes in this connection.
   */
  readonly edges: ReadonlyArray<(MembershipDetails_youthProfile_additionalContactPersons_edges | null)>;
}

export interface MembershipDetails_youthProfile {
  readonly __typename: "YouthProfileType";
  readonly profile: MembershipDetails_youthProfile_profile;
  readonly birthDate: any;
  readonly schoolName: string;
  readonly schoolClass: string;
  /**
   * The language which is spoken in the youth's home.
   */
  readonly languageAtHome: YouthLanguage | null;
  readonly photoUsageApproved: boolean | null;
  readonly approverFirstName: string;
  readonly approverLastName: string;
  readonly approverEmail: string;
  readonly approverPhone: string;
  /**
   * Youth's membership number
   */
  readonly membershipNumber: string | null;
  readonly additionalContactPersons: MembershipDetails_youthProfile_additionalContactPersons;
}

export interface MembershipDetails {
  /**
   * Get a youth profile by youth profile ID.
   * 
   * **NOTE:** Currently this requires `superuser` credentials. This is going to be
   * changed at one point so that service-specific staff credentials and service
   * type are used, just like the rest of the admin-type queries.
   * 
   * Possible error codes:
   * 
   * * `TODO`
   */
  readonly youthProfile: MembershipDetails_youthProfile | null;
}

/* tslint:disable */
/* eslint-disable */
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL query operation: MembershipInformation
// ====================================================

export interface MembershipInformation_youthProfile_profile {
  readonly __typename: "ProfileNode";
  /**
   * The ID of the object.
   */
  readonly id: string;
  readonly firstName: string;
  readonly lastName: string;
}

export interface MembershipInformation_youthProfile {
  readonly __typename: "YouthProfileType";
  readonly profile: MembershipInformation_youthProfile_profile;
  readonly expiration: any;
  /**
   * Tells if the membership is currently renewable or not
   */
  readonly renewable: boolean | null;
  /**
   * Youth's membership number
   */
  readonly membershipNumber: string | null;
}

export interface MembershipInformation {
  /**
   * Get a youth profile by youth profile ID.
   * 
   * **NOTE:** Currently this requires `superuser` credentials. This is going to be
   * changed at one point so that service-specific staff credentials and service
   * type are used, just like the rest of the admin-type queries.
   * 
   * Possible error codes:
   * 
   * * `TODO`
   */
  readonly youthProfile: MembershipInformation_youthProfile | null;
}

/* tslint:disable */
/* eslint-disable */
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL mutation operation: RenewMyYouthProfile
// ====================================================

export interface RenewMyYouthProfile_renewMyYouthProfile_youthProfile {
  readonly __typename: "YouthProfileType";
  /**
   * Youth's membership number
   */
  readonly membershipNumber: string | null;
}

export interface RenewMyYouthProfile_renewMyYouthProfile {
  readonly __typename: "RenewMyYouthProfileMutationPayload";
  readonly youthProfile: RenewMyYouthProfile_renewMyYouthProfile_youthProfile | null;
}

export interface RenewMyYouthProfile {
  /**
   * Renews the youth profile. Renewing can only be done once per season.
   * 
   * Requires Authentication.
   * 
   * Possible error codes:
   * 
   * * `CANNOT_RENEW_YOUTH_PROFILE_ERROR`: Returned if the youth profile is already renewed or not in the renew window
   * 
   * * `TODO`
   */
  readonly renewMyYouthProfile: RenewMyYouthProfile_renewMyYouthProfile | null;
}

export interface RenewMyYouthProfileVariables {
  readonly input: RenewMyYouthProfileMutationInput;
}

/* tslint:disable */
/* eslint-disable */
// This file was automatically generated and should not be edited.

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
  /**
   * Connect the currently authenticated user's profile to the given service.
   * 
   * Requires authentication.
   * 
   * Possible error codes:
   * 
   * * `SERVICE_CONNECTION_ALREADY_EXISTS_ERROR`: Returned if the currently
   * authenticated user's profile is already connected to the given service.
   */
  readonly addServiceConnection: AddServiceConnection_addServiceConnection | null;
}

export interface AddServiceConnectionVariables {
  readonly input: AddServiceConnectionMutationInput;
}

/* tslint:disable */
/* eslint-disable */
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL query operation: ApproverEmail
// ====================================================

export interface ApproverEmail_youthProfile {
  readonly __typename: "YouthProfileType";
  readonly approverEmail: string;
}

export interface ApproverEmail {
  /**
   * Get a youth profile by youth profile ID.
   * 
   * **NOTE:** Currently this requires `superuser` credentials. This is going to be
   * changed at one point so that service-specific staff credentials and service
   * type are used, just like the rest of the admin-type queries.
   * 
   * Possible error codes:
   * 
   * * `TODO`
   */
  readonly youthProfile: ApproverEmail_youthProfile | null;
}

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
  /**
   * Fetches a youth profile using the given token, updates the data based on the
   * given input data and approves the youth profile so that it is considered
   * active. A confirmation is sent to the youth profile's email address after a
   * successful approval.
   * 
   * The token is no longer valid after it's been used to approve the youth profile.
   * 
   * Requires authentication.
   * 
   * Possible error codes:
   * 
   * * `PROFILE_HAS_NO_PRIMARY_EMAIL_ERROR`: Returned if the youth profile doesn't have a primary email address.
   * 
   * * `TODO`
   */
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
  /**
   * The Youth membership data of the profile.
   */
  readonly youthProfile: CreateMyProfile_createMyProfile_profile_youthProfile | null;
}

export interface CreateMyProfile_createMyProfile {
  readonly __typename: "CreateMyProfileMutationPayload";
  readonly profile: CreateMyProfile_createMyProfile_profile | null;
}

export interface CreateMyProfile {
  /**
   * Creates a new profile based on the given data. The new profile is linked to the currently authenticated user.
   * 
   * One or several of the following is possible to add:
   * 
   * * Email
   * * Address
   * * Phone
   * 
   * If youth data is given, a youth profile will also be created and linked to the profile.
   * 
   * Requires authentication.
   * 
   * Possible error codes:
   * 
   * * `TODO`
   */
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
  /**
   * Membership status based on expiration and approved_time fields
   */
  readonly membershipStatus: MembershipStatus | null;
}

export interface HasYouthProfile_myProfile {
  readonly __typename: "ProfileNode";
  /**
   * The Youth membership data of the profile.
   */
  readonly youthProfile: HasYouthProfile_myProfile_youthProfile | null;
}

export interface HasYouthProfile {
  /**
   * Get the profile belonging to the currently authenticated user.
   * 
   * Requires authentication.
   * 
   * Possible error codes:
   * 
   * * `TODO`
   */
  readonly myProfile: HasYouthProfile_myProfile | null;
}

/* tslint:disable */
/* eslint-disable */
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL query operation: NameQuery
// ====================================================

export interface NameQuery_myProfile {
  readonly __typename: "ProfileNode";
  readonly firstName: string;
  readonly lastName: string;
  readonly nickname: string;
}

export interface NameQuery {
  /**
   * Get the profile belonging to the currently authenticated user.
   * 
   * Requires authentication.
   * 
   * Possible error codes:
   * 
   * * `TODO`
   */
  readonly myProfile: NameQuery_myProfile | null;
}

/* tslint:disable */
/* eslint-disable */
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL query operation: PrefillRegistartion
// ====================================================

export interface PrefillRegistartion_myProfile_primaryPhone {
  readonly __typename: "PhoneNode";
  readonly phone: string | null;
  /**
   * The ID of the object.
   */
  readonly id: string;
}

export interface PrefillRegistartion_myProfile_primaryAddress {
  readonly __typename: "AddressNode";
  readonly address: string;
  readonly postalCode: string;
  readonly city: string;
  readonly countryCode: string;
  /**
   * The ID of the object.
   */
  readonly id: string;
  readonly primary: boolean;
  readonly addressType: AddressType | null;
}

export interface PrefillRegistartion_myProfile_addresses_edges_node {
  readonly __typename: "AddressNode";
  readonly primary: boolean;
  /**
   * The ID of the object.
   */
  readonly id: string;
  readonly address: string;
  readonly postalCode: string;
  readonly city: string;
  readonly countryCode: string;
  readonly addressType: AddressType | null;
}

export interface PrefillRegistartion_myProfile_addresses_edges {
  readonly __typename: "AddressNodeEdge";
  /**
   * The item at the end of the edge
   */
  readonly node: PrefillRegistartion_myProfile_addresses_edges_node | null;
}

export interface PrefillRegistartion_myProfile_addresses {
  readonly __typename: "AddressNodeConnection";
  /**
   * Contains the nodes in this connection.
   */
  readonly edges: ReadonlyArray<(PrefillRegistartion_myProfile_addresses_edges | null)>;
}

export interface PrefillRegistartion_myProfile_primaryEmail {
  readonly __typename: "EmailNode";
  readonly email: string;
}

export interface PrefillRegistartion_myProfile {
  readonly __typename: "ProfileNode";
  readonly firstName: string;
  readonly lastName: string;
  readonly language: Language | null;
  /**
   * Convenience field for the phone which is marked as primary.
   */
  readonly primaryPhone: PrefillRegistartion_myProfile_primaryPhone | null;
  /**
   * Convenience field for the address which is marked as primary.
   */
  readonly primaryAddress: PrefillRegistartion_myProfile_primaryAddress | null;
  /**
   * List of addresses of the profile.
   */
  readonly addresses: PrefillRegistartion_myProfile_addresses | null;
  /**
   * Convenience field for the email which is marked as primary.
   */
  readonly primaryEmail: PrefillRegistartion_myProfile_primaryEmail | null;
}

export interface PrefillRegistartion {
  /**
   * Get the profile belonging to the currently authenticated user.
   * 
   * Requires authentication.
   * 
   * Possible error codes:
   * 
   * * `TODO`
   */
  readonly myProfile: PrefillRegistartion_myProfile | null;
}

/* tslint:disable */
/* eslint-disable */
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL mutation operation: UpdateMyProfile
// ====================================================

export interface UpdateMyProfile_updateMyProfile_profile_youthProfile {
  readonly __typename: "YouthProfileType";
  readonly approverEmail: string;
}

export interface UpdateMyProfile_updateMyProfile_profile {
  readonly __typename: "ProfileNode";
  /**
   * The Youth membership data of the profile.
   */
  readonly youthProfile: UpdateMyProfile_updateMyProfile_profile_youthProfile | null;
}

export interface UpdateMyProfile_updateMyProfile {
  readonly __typename: "UpdateMyProfileMutationPayload";
  readonly profile: UpdateMyProfile_updateMyProfile_profile | null;
}

export interface UpdateMyProfile {
  /**
   * Updates the profile which is linked to the currently authenticated user based on the given data.
   * 
   * One or several of the following is possible to add, modify or remove:
   * 
   * * Email
   * * Address
   * * Phone
   * 
   * If youth data is given, a youth profile will also be created and linked to the
   * profile **or** the existing youth profile will be updated if the profile is
   * already linked to a youth profile.
   * 
   * Requires authentication.
   * 
   * Possible error codes:
   * 
   * * `TODO`
   */
  readonly updateMyProfile: UpdateMyProfile_updateMyProfile | null;
}

export interface UpdateMyProfileVariables {
  readonly input: UpdateMyProfileMutationInput;
}

/* tslint:disable */
/* eslint-disable */
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL mutation operation: UpdateMyYouthProfile
// ====================================================

export interface UpdateMyYouthProfile_updateMyYouthProfile_youthProfile {
  readonly __typename: "YouthProfileType";
  readonly approverEmail: string;
}

export interface UpdateMyYouthProfile_updateMyYouthProfile {
  readonly __typename: "UpdateMyYouthProfileMutationPayload";
  readonly youthProfile: UpdateMyYouthProfile_updateMyYouthProfile_youthProfile | null;
}

export interface UpdateMyYouthProfile {
  /**
   * Updates the youth profile which belongs to the profile of the currently authenticated user.
   * 
   * The `resend_request_notification` parameter may be used to send a notification
   * to the youth profile's approver whose contact information is in the youth profile.
   * 
   * Requires authentication.
   * 
   * Possible error codes:
   * 
   * * `TODO`
   */
  readonly updateMyYouthProfile: UpdateMyYouthProfile_updateMyYouthProfile | null;
}

export interface UpdateMyYouthProfileVariables {
  readonly input: UpdateMyYouthProfileMutationInput;
}

/* tslint:disable */
/* eslint-disable */
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL query operation: YouthProfileByApprovalToken
// ====================================================

export interface YouthProfileByApprovalToken_youthProfileByApprovalToken_profile_primaryAddress {
  readonly __typename: "AddressNode";
  readonly address: string;
  readonly postalCode: string;
  readonly city: string;
  readonly countryCode: string;
  /**
   * The ID of the object.
   */
  readonly id: string;
  readonly addressType: AddressType | null;
  readonly primary: boolean;
}

export interface YouthProfileByApprovalToken_youthProfileByApprovalToken_profile_addresses_edges_node {
  readonly __typename: "AddressNode";
  readonly primary: boolean;
  /**
   * The ID of the object.
   */
  readonly id: string;
  readonly address: string;
  readonly postalCode: string;
  readonly city: string;
  readonly countryCode: string;
  readonly addressType: AddressType | null;
}

export interface YouthProfileByApprovalToken_youthProfileByApprovalToken_profile_addresses_edges {
  readonly __typename: "AddressNodeEdge";
  /**
   * The item at the end of the edge
   */
  readonly node: YouthProfileByApprovalToken_youthProfileByApprovalToken_profile_addresses_edges_node | null;
}

export interface YouthProfileByApprovalToken_youthProfileByApprovalToken_profile_addresses {
  readonly __typename: "AddressNodeConnection";
  /**
   * Contains the nodes in this connection.
   */
  readonly edges: ReadonlyArray<(YouthProfileByApprovalToken_youthProfileByApprovalToken_profile_addresses_edges | null)>;
}

export interface YouthProfileByApprovalToken_youthProfileByApprovalToken_profile_primaryEmail {
  readonly __typename: "EmailNode";
  readonly email: string;
  /**
   * The ID of the object.
   */
  readonly id: string;
}

export interface YouthProfileByApprovalToken_youthProfileByApprovalToken_profile_primaryPhone {
  readonly __typename: "PhoneNode";
  readonly phone: string | null;
  /**
   * The ID of the object.
   */
  readonly id: string;
}

export interface YouthProfileByApprovalToken_youthProfileByApprovalToken_profile {
  readonly __typename: "ProfileNode";
  readonly firstName: string;
  readonly lastName: string;
  readonly language: Language | null;
  /**
   * The ID of the object.
   */
  readonly id: string;
  /**
   * Convenience field for the address which is marked as primary.
   */
  readonly primaryAddress: YouthProfileByApprovalToken_youthProfileByApprovalToken_profile_primaryAddress | null;
  /**
   * List of addresses of the profile.
   */
  readonly addresses: YouthProfileByApprovalToken_youthProfileByApprovalToken_profile_addresses | null;
  /**
   * Convenience field for the email which is marked as primary.
   */
  readonly primaryEmail: YouthProfileByApprovalToken_youthProfileByApprovalToken_profile_primaryEmail | null;
  /**
   * Convenience field for the phone which is marked as primary.
   */
  readonly primaryPhone: YouthProfileByApprovalToken_youthProfileByApprovalToken_profile_primaryPhone | null;
}

export interface YouthProfileByApprovalToken_youthProfileByApprovalToken_additionalContactPersons_edges_node {
  readonly __typename: "AdditionalContactPersonNode";
  /**
   * The ID of the object.
   */
  readonly id: string;
  readonly firstName: string;
  readonly lastName: string;
  readonly phone: string;
  readonly email: string;
}

export interface YouthProfileByApprovalToken_youthProfileByApprovalToken_additionalContactPersons_edges {
  readonly __typename: "AdditionalContactPersonNodeEdge";
  /**
   * The item at the end of the edge
   */
  readonly node: YouthProfileByApprovalToken_youthProfileByApprovalToken_additionalContactPersons_edges_node | null;
}

export interface YouthProfileByApprovalToken_youthProfileByApprovalToken_additionalContactPersons {
  readonly __typename: "AdditionalContactPersonNodeConnection";
  /**
   * Contains the nodes in this connection.
   */
  readonly edges: ReadonlyArray<(YouthProfileByApprovalToken_youthProfileByApprovalToken_additionalContactPersons_edges | null)>;
}

export interface YouthProfileByApprovalToken_youthProfileByApprovalToken {
  readonly __typename: "YouthProfileType";
  readonly profile: YouthProfileByApprovalToken_youthProfileByApprovalToken_profile;
  readonly birthDate: any;
  readonly schoolName: string;
  readonly schoolClass: string;
  /**
   * The language which is spoken in the youth's home.
   */
  readonly languageAtHome: YouthLanguage | null;
  readonly photoUsageApproved: boolean | null;
  readonly approverFirstName: string;
  readonly approverLastName: string;
  readonly approverEmail: string;
  readonly approverPhone: string;
  /**
   * Youth's membership number
   */
  readonly membershipNumber: string | null;
  readonly additionalContactPersons: YouthProfileByApprovalToken_youthProfileByApprovalToken_additionalContactPersons;
}

export interface YouthProfileByApprovalToken {
  /**
   * Get a youth profile by approval token. 
   * 
   * Doesn't require authentication.
   * 
   * Possible error codes:
   * 
   * * `TODO`
   */
  readonly youthProfileByApprovalToken: YouthProfileByApprovalToken_youthProfileByApprovalToken | null;
}

export interface YouthProfileByApprovalTokenVariables {
  readonly token: string;
}

/* tslint:disable */
/* eslint-disable */
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL fragment: MembershipDetailsFragment
// ====================================================

export interface MembershipDetailsFragment_profile_primaryAddress {
  readonly __typename: "AddressNode";
  readonly address: string;
  readonly postalCode: string;
  readonly city: string;
  readonly countryCode: string;
  /**
   * The ID of the object.
   */
  readonly id: string;
  readonly addressType: AddressType | null;
  readonly primary: boolean;
}

export interface MembershipDetailsFragment_profile_addresses_edges_node {
  readonly __typename: "AddressNode";
  readonly primary: boolean;
  /**
   * The ID of the object.
   */
  readonly id: string;
  readonly address: string;
  readonly postalCode: string;
  readonly city: string;
  readonly countryCode: string;
  readonly addressType: AddressType | null;
}

export interface MembershipDetailsFragment_profile_addresses_edges {
  readonly __typename: "AddressNodeEdge";
  /**
   * The item at the end of the edge
   */
  readonly node: MembershipDetailsFragment_profile_addresses_edges_node | null;
}

export interface MembershipDetailsFragment_profile_addresses {
  readonly __typename: "AddressNodeConnection";
  /**
   * Contains the nodes in this connection.
   */
  readonly edges: ReadonlyArray<(MembershipDetailsFragment_profile_addresses_edges | null)>;
}

export interface MembershipDetailsFragment_profile_primaryEmail {
  readonly __typename: "EmailNode";
  readonly email: string;
  /**
   * The ID of the object.
   */
  readonly id: string;
}

export interface MembershipDetailsFragment_profile_primaryPhone {
  readonly __typename: "PhoneNode";
  readonly phone: string | null;
  /**
   * The ID of the object.
   */
  readonly id: string;
}

export interface MembershipDetailsFragment_profile {
  readonly __typename: "ProfileNode";
  readonly firstName: string;
  readonly lastName: string;
  readonly language: Language | null;
  /**
   * The ID of the object.
   */
  readonly id: string;
  /**
   * Convenience field for the address which is marked as primary.
   */
  readonly primaryAddress: MembershipDetailsFragment_profile_primaryAddress | null;
  /**
   * List of addresses of the profile.
   */
  readonly addresses: MembershipDetailsFragment_profile_addresses | null;
  /**
   * Convenience field for the email which is marked as primary.
   */
  readonly primaryEmail: MembershipDetailsFragment_profile_primaryEmail | null;
  /**
   * Convenience field for the phone which is marked as primary.
   */
  readonly primaryPhone: MembershipDetailsFragment_profile_primaryPhone | null;
}

export interface MembershipDetailsFragment_additionalContactPersons_edges_node {
  readonly __typename: "AdditionalContactPersonNode";
  /**
   * The ID of the object.
   */
  readonly id: string;
  readonly firstName: string;
  readonly lastName: string;
  readonly phone: string;
  readonly email: string;
}

export interface MembershipDetailsFragment_additionalContactPersons_edges {
  readonly __typename: "AdditionalContactPersonNodeEdge";
  /**
   * The item at the end of the edge
   */
  readonly node: MembershipDetailsFragment_additionalContactPersons_edges_node | null;
}

export interface MembershipDetailsFragment_additionalContactPersons {
  readonly __typename: "AdditionalContactPersonNodeConnection";
  /**
   * Contains the nodes in this connection.
   */
  readonly edges: ReadonlyArray<(MembershipDetailsFragment_additionalContactPersons_edges | null)>;
}

export interface MembershipDetailsFragment {
  readonly __typename: "YouthProfileType";
  readonly profile: MembershipDetailsFragment_profile;
  readonly birthDate: any;
  readonly schoolName: string;
  readonly schoolClass: string;
  /**
   * The language which is spoken in the youth's home.
   */
  readonly languageAtHome: YouthLanguage | null;
  readonly photoUsageApproved: boolean | null;
  readonly approverFirstName: string;
  readonly approverLastName: string;
  readonly approverEmail: string;
  readonly approverPhone: string;
  /**
   * Youth's membership number
   */
  readonly membershipNumber: string | null;
  readonly additionalContactPersons: MembershipDetailsFragment_additionalContactPersons;
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

export enum MembershipStatus {
  ACTIVE = "ACTIVE",
  EXPIRED = "EXPIRED",
  PENDING = "PENDING",
  RENEWING = "RENEWING",
}

export enum PhoneType {
  HOME = "HOME",
  MOBILE = "MOBILE",
  NONE = "NONE",
  OTHER = "OTHER",
  WORK = "WORK",
}

export enum ServiceType {
  BERTH = "BERTH",
  GODCHILDREN_OF_CULTURE = "GODCHILDREN_OF_CULTURE",
  HKI_MY_DATA = "HKI_MY_DATA",
  YOUTH_MEMBERSHIP = "YOUTH_MEMBERSHIP",
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

export interface AddServiceConnectionMutationInput {
  readonly serviceConnection: ServiceConnectionInput;
  readonly clientMutationId?: string | null;
}

export interface ApproveYouthProfileMutationInput {
  readonly approvalToken: string;
  readonly approvalData: YouthProfileFields;
  readonly clientMutationId?: string | null;
}

export interface CreateAdditionalContactPersonInput {
  readonly firstName: string;
  readonly lastName: string;
  readonly phone: string;
  readonly email: string;
}

export interface CreateAddressInput {
  readonly countryCode?: string | null;
  readonly primary?: boolean | null;
  readonly address: string;
  readonly postalCode: string;
  readonly city: string;
  readonly addressType: AddressType;
}

export interface CreateEmailInput {
  readonly primary?: boolean | null;
  readonly email: string;
  readonly emailType: EmailType;
}

export interface CreateMyProfileMutationInput {
  readonly profile: ProfileInput;
  readonly clientMutationId?: string | null;
}

export interface CreatePhoneInput {
  readonly primary?: boolean | null;
  readonly phone: string;
  readonly phoneType: PhoneType;
}

export interface ProfileInput {
  readonly firstName?: string | null;
  readonly lastName?: string | null;
  readonly nickname?: string | null;
  readonly image?: string | null;
  readonly language?: Language | null;
  readonly contactMethod?: ContactMethod | null;
  readonly addEmails?: ReadonlyArray<(CreateEmailInput | null)> | null;
  readonly updateEmails?: ReadonlyArray<(UpdateEmailInput | null)> | null;
  readonly removeEmails?: ReadonlyArray<(string | null)> | null;
  readonly addPhones?: ReadonlyArray<(CreatePhoneInput | null)> | null;
  readonly updatePhones?: ReadonlyArray<(UpdatePhoneInput | null)> | null;
  readonly removePhones?: ReadonlyArray<(string | null)> | null;
  readonly addAddresses?: ReadonlyArray<(CreateAddressInput | null)> | null;
  readonly updateAddresses?: ReadonlyArray<(UpdateAddressInput | null)> | null;
  readonly removeAddresses?: ReadonlyArray<(string | null)> | null;
  readonly subscriptions?: ReadonlyArray<(SubscriptionInputType | null)> | null;
  readonly youthProfile?: YouthProfileFields | null;
  readonly sensitivedata?: SensitiveDataFields | null;
}

export interface RenewMyYouthProfileMutationInput {
  readonly clientMutationId?: string | null;
}

export interface SensitiveDataFields {
  readonly ssn?: string | null;
}

export interface ServiceConnectionInput {
  readonly service: ServiceInput;
  readonly enabled?: boolean | null;
}

export interface ServiceInput {
  readonly type?: ServiceType | null;
}

export interface SubscriptionInputType {
  readonly subscriptionTypeId: string;
  readonly enabled: boolean;
}

export interface UpdateAdditionalContactPersonInput {
  readonly id: string;
  readonly firstName?: string | null;
  readonly lastName?: string | null;
  readonly phone?: string | null;
  readonly email?: string | null;
}

export interface UpdateAddressInput {
  readonly countryCode?: string | null;
  readonly primary?: boolean | null;
  readonly id: string;
  readonly address?: string | null;
  readonly postalCode?: string | null;
  readonly city?: string | null;
  readonly addressType?: AddressType | null;
}

export interface UpdateEmailInput {
  readonly primary?: boolean | null;
  readonly id: string;
  readonly email?: string | null;
  readonly emailType?: EmailType | null;
}

export interface UpdateMyProfileMutationInput {
  readonly profile: ProfileInput;
  readonly clientMutationId?: string | null;
}

export interface UpdateMyYouthProfileMutationInput {
  readonly youthProfile: UpdateYouthProfileInput;
  readonly clientMutationId?: string | null;
}

export interface UpdatePhoneInput {
  readonly primary?: boolean | null;
  readonly id: string;
  readonly phone?: string | null;
  readonly phoneType?: PhoneType | null;
}

export interface UpdateYouthProfileInput {
  readonly schoolName?: string | null;
  readonly schoolClass?: string | null;
  readonly languageAtHome?: YouthLanguage | null;
  readonly approverFirstName?: string | null;
  readonly approverLastName?: string | null;
  readonly approverPhone?: string | null;
  readonly approverEmail?: string | null;
  readonly birthDate?: any | null;
  readonly photoUsageApproved?: boolean | null;
  readonly addAdditionalContactPersons?: ReadonlyArray<(CreateAdditionalContactPersonInput | null)> | null;
  readonly updateAdditionalContactPersons?: ReadonlyArray<(UpdateAdditionalContactPersonInput | null)> | null;
  readonly removeAdditionalContactPersons?: ReadonlyArray<(string | null)> | null;
  readonly resendRequestNotification?: boolean | null;
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
  readonly photoUsageApproved?: boolean | null;
  readonly addAdditionalContactPersons?: ReadonlyArray<(CreateAdditionalContactPersonInput | null)> | null;
  readonly updateAdditionalContactPersons?: ReadonlyArray<(UpdateAdditionalContactPersonInput | null)> | null;
  readonly removeAdditionalContactPersons?: ReadonlyArray<(string | null)> | null;
}

//==============================================================
// END Enums and Input Objects
//==============================================================
