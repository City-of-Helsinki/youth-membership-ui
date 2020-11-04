/* tslint:disable */
/* eslint-disable */
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL query operation: MembershipDetails
// ====================================================

export interface MembershipDetails_myYouthProfile_profile_primaryAddress {
  readonly __typename: "AddressNode";
  readonly address: string;
  readonly postalCode: string;
  readonly city: string;
  readonly countryCode: string;
  readonly id: string;
  readonly addressType: AddressType | null;
  readonly primary: boolean;
}

export interface MembershipDetails_myYouthProfile_profile_addresses_edges_node {
  readonly __typename: "AddressNode";
  readonly primary: boolean;
  readonly id: string;
  readonly address: string;
  readonly postalCode: string;
  readonly city: string;
  readonly countryCode: string;
  readonly addressType: AddressType | null;
}

export interface MembershipDetails_myYouthProfile_profile_addresses_edges {
  readonly __typename: "AddressNodeEdge";
  readonly node: MembershipDetails_myYouthProfile_profile_addresses_edges_node | null;
}

export interface MembershipDetails_myYouthProfile_profile_addresses {
  readonly __typename: "AddressNodeConnection";
  readonly edges: ReadonlyArray<(MembershipDetails_myYouthProfile_profile_addresses_edges | null)>;
}

export interface MembershipDetails_myYouthProfile_profile_primaryEmail {
  readonly __typename: "EmailNode";
  readonly email: string;
  readonly id: string;
}

export interface MembershipDetails_myYouthProfile_profile_primaryPhone {
  readonly __typename: "PhoneNode";
  readonly phone: string | null;
  readonly id: string;
}

export interface MembershipDetails_myYouthProfile_profile {
  readonly __typename: "ProfileNode";
  readonly firstName: string;
  readonly lastName: string;
  readonly language: Language | null;
  readonly id: string;
  readonly primaryAddress: MembershipDetails_myYouthProfile_profile_primaryAddress | null;
  readonly addresses: MembershipDetails_myYouthProfile_profile_addresses | null;
  readonly primaryEmail: MembershipDetails_myYouthProfile_profile_primaryEmail | null;
  readonly primaryPhone: MembershipDetails_myYouthProfile_profile_primaryPhone | null;
}

export interface MembershipDetails_myYouthProfile_additionalContactPersons_edges_node {
  readonly __typename: "AdditionalContactPersonNode";
  readonly id: string;
  readonly firstName: string;
  readonly lastName: string;
  readonly phone: string;
  readonly email: string;
}

export interface MembershipDetails_myYouthProfile_additionalContactPersons_edges {
  readonly __typename: "AdditionalContactPersonNodeEdge";
  readonly node: MembershipDetails_myYouthProfile_additionalContactPersons_edges_node | null;
}

export interface MembershipDetails_myYouthProfile_additionalContactPersons {
  readonly __typename: "AdditionalContactPersonNodeConnection";
  readonly edges: ReadonlyArray<(MembershipDetails_myYouthProfile_additionalContactPersons_edges | null)>;
}

export interface MembershipDetails_myYouthProfile {
  readonly __typename: "YouthProfileNode";
  readonly profile: MembershipDetails_myYouthProfile_profile | null;
  readonly birthDate: any;
  readonly schoolName: string;
  readonly schoolClass: string;
  readonly languageAtHome: YouthLanguage;
  readonly photoUsageApproved: boolean | null;
  readonly approverFirstName: string;
  readonly approverLastName: string;
  readonly approverEmail: string;
  readonly approverPhone: string;
  readonly membershipNumber: string;
  readonly additionalContactPersons: MembershipDetails_myYouthProfile_additionalContactPersons;
}

export interface MembershipDetails {
  readonly myYouthProfile: MembershipDetails_myYouthProfile | null;
}

/* tslint:disable */
/* eslint-disable */
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL query operation: MembershipInformation
// ====================================================

export interface MembershipInformation_myYouthProfile_profile {
  readonly __typename: "ProfileNode";
  readonly id: string;
  readonly firstName: string;
  readonly lastName: string;
}

export interface MembershipInformation_myYouthProfile {
  readonly __typename: "YouthProfileNode";
  readonly profile: MembershipInformation_myYouthProfile_profile | null;
  readonly expiration: any;
  readonly renewable: boolean;
  readonly membershipNumber: string;
}

export interface MembershipInformation {
  readonly myYouthProfile: MembershipInformation_myYouthProfile | null;
}

/* tslint:disable */
/* eslint-disable */
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL mutation operation: RenewMyYouthProfile
// ====================================================

export interface RenewMyYouthProfile_renewMyYouthProfile_youthProfile {
  readonly __typename: "YouthProfileNode";
  readonly membershipNumber: string;
}

export interface RenewMyYouthProfile_renewMyYouthProfile {
  readonly __typename: "RenewMyYouthProfileMutationPayload";
  readonly youthProfile: RenewMyYouthProfile_renewMyYouthProfile_youthProfile | null;
}

export interface RenewMyYouthProfile {
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

export interface ApproverEmail_myYouthProfile {
  readonly __typename: "YouthProfileNode";
  readonly approverEmail: string;
}

export interface ApproverEmail {
  readonly myYouthProfile: ApproverEmail_myYouthProfile | null;
}

/* tslint:disable */
/* eslint-disable */
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL mutation operation: ApproveYouthProfile
// ====================================================

export interface ApproveYouthProfile_approveYouthProfile_youthProfile {
  readonly __typename: "YouthProfileNode";
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

export interface CreateMyProfile_createMyProfile_profile {
  readonly __typename: "ProfileNode";
  readonly id: string;
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
// GraphQL mutation operation: CreateMyYouthProfile
// ====================================================

export interface CreateMyYouthProfile_createMyYouthProfile_youthProfile {
  readonly __typename: "YouthProfileNode";
  readonly birthDate: any;
}

export interface CreateMyYouthProfile_createMyYouthProfile {
  readonly __typename: "CreateMyYouthProfileMutationPayload";
  readonly youthProfile: CreateMyYouthProfile_createMyYouthProfile_youthProfile | null;
}

export interface CreateMyYouthProfile {
  readonly createMyYouthProfile: CreateMyYouthProfile_createMyYouthProfile | null;
}

export interface CreateMyYouthProfileVariables {
  readonly input: CreateMyYouthProfileMutationInput;
}

/* tslint:disable */
/* eslint-disable */
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL query operation: HasYouthProfile
// ====================================================

export interface HasYouthProfile_myYouthProfile {
  readonly __typename: "YouthProfileNode";
  readonly membershipStatus: MembershipStatus;
}

export interface HasYouthProfile {
  readonly myYouthProfile: HasYouthProfile_myYouthProfile | null;
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
  readonly id: string;
}

export interface PrefillRegistartion_myProfile_primaryAddress {
  readonly __typename: "AddressNode";
  readonly address: string;
  readonly postalCode: string;
  readonly city: string;
  readonly countryCode: string;
  readonly id: string;
  readonly primary: boolean;
  readonly addressType: AddressType | null;
}

export interface PrefillRegistartion_myProfile_addresses_edges_node {
  readonly __typename: "AddressNode";
  readonly primary: boolean;
  readonly id: string;
  readonly address: string;
  readonly postalCode: string;
  readonly city: string;
  readonly countryCode: string;
  readonly addressType: AddressType | null;
}

export interface PrefillRegistartion_myProfile_addresses_edges {
  readonly __typename: "AddressNodeEdge";
  readonly node: PrefillRegistartion_myProfile_addresses_edges_node | null;
}

export interface PrefillRegistartion_myProfile_addresses {
  readonly __typename: "AddressNodeConnection";
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
  readonly primaryPhone: PrefillRegistartion_myProfile_primaryPhone | null;
  readonly primaryAddress: PrefillRegistartion_myProfile_primaryAddress | null;
  readonly addresses: PrefillRegistartion_myProfile_addresses | null;
  readonly primaryEmail: PrefillRegistartion_myProfile_primaryEmail | null;
}

export interface PrefillRegistartion {
  readonly myProfile: PrefillRegistartion_myProfile | null;
}

/* tslint:disable */
/* eslint-disable */
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL mutation operation: UpdateMyProfile
// ====================================================

export interface UpdateMyProfile_updateMyProfile_profile {
  readonly __typename: "ProfileNode";
  readonly id: string;
}

export interface UpdateMyProfile_updateMyProfile {
  readonly __typename: "UpdateMyProfileMutationPayload";
  readonly profile: UpdateMyProfile_updateMyProfile_profile | null;
}

export interface UpdateMyProfile {
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
  readonly __typename: "YouthProfileNode";
  readonly approverEmail: string;
}

export interface UpdateMyYouthProfile_updateMyYouthProfile {
  readonly __typename: "UpdateMyYouthProfileMutationPayload";
  readonly youthProfile: UpdateMyYouthProfile_updateMyYouthProfile_youthProfile | null;
}

export interface UpdateMyYouthProfile {
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
  readonly id: string;
  readonly addressType: AddressType | null;
  readonly primary: boolean;
}

export interface YouthProfileByApprovalToken_youthProfileByApprovalToken_profile_addresses_edges_node {
  readonly __typename: "AddressNode";
  readonly primary: boolean;
  readonly id: string;
  readonly address: string;
  readonly postalCode: string;
  readonly city: string;
  readonly countryCode: string;
  readonly addressType: AddressType | null;
}

export interface YouthProfileByApprovalToken_youthProfileByApprovalToken_profile_addresses_edges {
  readonly __typename: "AddressNodeEdge";
  readonly node: YouthProfileByApprovalToken_youthProfileByApprovalToken_profile_addresses_edges_node | null;
}

export interface YouthProfileByApprovalToken_youthProfileByApprovalToken_profile_addresses {
  readonly __typename: "AddressNodeConnection";
  readonly edges: ReadonlyArray<(YouthProfileByApprovalToken_youthProfileByApprovalToken_profile_addresses_edges | null)>;
}

export interface YouthProfileByApprovalToken_youthProfileByApprovalToken_profile_primaryEmail {
  readonly __typename: "EmailNode";
  readonly email: string;
  readonly id: string;
}

export interface YouthProfileByApprovalToken_youthProfileByApprovalToken_profile_primaryPhone {
  readonly __typename: "PhoneNode";
  readonly phone: string | null;
  readonly id: string;
}

export interface YouthProfileByApprovalToken_youthProfileByApprovalToken_profile {
  readonly __typename: "ProfileNode";
  readonly firstName: string;
  readonly lastName: string;
  readonly language: Language | null;
  readonly id: string;
  readonly primaryAddress: YouthProfileByApprovalToken_youthProfileByApprovalToken_profile_primaryAddress | null;
  readonly addresses: YouthProfileByApprovalToken_youthProfileByApprovalToken_profile_addresses | null;
  readonly primaryEmail: YouthProfileByApprovalToken_youthProfileByApprovalToken_profile_primaryEmail | null;
  readonly primaryPhone: YouthProfileByApprovalToken_youthProfileByApprovalToken_profile_primaryPhone | null;
}

export interface YouthProfileByApprovalToken_youthProfileByApprovalToken_additionalContactPersons_edges_node {
  readonly __typename: "AdditionalContactPersonNode";
  readonly id: string;
  readonly firstName: string;
  readonly lastName: string;
  readonly phone: string;
  readonly email: string;
}

export interface YouthProfileByApprovalToken_youthProfileByApprovalToken_additionalContactPersons_edges {
  readonly __typename: "AdditionalContactPersonNodeEdge";
  readonly node: YouthProfileByApprovalToken_youthProfileByApprovalToken_additionalContactPersons_edges_node | null;
}

export interface YouthProfileByApprovalToken_youthProfileByApprovalToken_additionalContactPersons {
  readonly __typename: "AdditionalContactPersonNodeConnection";
  readonly edges: ReadonlyArray<(YouthProfileByApprovalToken_youthProfileByApprovalToken_additionalContactPersons_edges | null)>;
}

export interface YouthProfileByApprovalToken_youthProfileByApprovalToken {
  readonly __typename: "YouthProfileNode";
  readonly profile: YouthProfileByApprovalToken_youthProfileByApprovalToken_profile | null;
  readonly birthDate: any;
  readonly schoolName: string;
  readonly schoolClass: string;
  readonly languageAtHome: YouthLanguage;
  readonly photoUsageApproved: boolean | null;
  readonly approverFirstName: string;
  readonly approverLastName: string;
  readonly approverEmail: string;
  readonly approverPhone: string;
  readonly membershipNumber: string;
  readonly additionalContactPersons: YouthProfileByApprovalToken_youthProfileByApprovalToken_additionalContactPersons;
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

// ====================================================
// GraphQL fragment: MembershipDetailsFragment
// ====================================================

export interface MembershipDetailsFragment_profile_primaryAddress {
  readonly __typename: "AddressNode";
  readonly address: string;
  readonly postalCode: string;
  readonly city: string;
  readonly countryCode: string;
  readonly id: string;
  readonly addressType: AddressType | null;
  readonly primary: boolean;
}

export interface MembershipDetailsFragment_profile_addresses_edges_node {
  readonly __typename: "AddressNode";
  readonly primary: boolean;
  readonly id: string;
  readonly address: string;
  readonly postalCode: string;
  readonly city: string;
  readonly countryCode: string;
  readonly addressType: AddressType | null;
}

export interface MembershipDetailsFragment_profile_addresses_edges {
  readonly __typename: "AddressNodeEdge";
  readonly node: MembershipDetailsFragment_profile_addresses_edges_node | null;
}

export interface MembershipDetailsFragment_profile_addresses {
  readonly __typename: "AddressNodeConnection";
  readonly edges: ReadonlyArray<(MembershipDetailsFragment_profile_addresses_edges | null)>;
}

export interface MembershipDetailsFragment_profile_primaryEmail {
  readonly __typename: "EmailNode";
  readonly email: string;
  readonly id: string;
}

export interface MembershipDetailsFragment_profile_primaryPhone {
  readonly __typename: "PhoneNode";
  readonly phone: string | null;
  readonly id: string;
}

export interface MembershipDetailsFragment_profile {
  readonly __typename: "ProfileNode";
  readonly firstName: string;
  readonly lastName: string;
  readonly language: Language | null;
  readonly id: string;
  readonly primaryAddress: MembershipDetailsFragment_profile_primaryAddress | null;
  readonly addresses: MembershipDetailsFragment_profile_addresses | null;
  readonly primaryEmail: MembershipDetailsFragment_profile_primaryEmail | null;
  readonly primaryPhone: MembershipDetailsFragment_profile_primaryPhone | null;
}

export interface MembershipDetailsFragment_additionalContactPersons_edges_node {
  readonly __typename: "AdditionalContactPersonNode";
  readonly id: string;
  readonly firstName: string;
  readonly lastName: string;
  readonly phone: string;
  readonly email: string;
}

export interface MembershipDetailsFragment_additionalContactPersons_edges {
  readonly __typename: "AdditionalContactPersonNodeEdge";
  readonly node: MembershipDetailsFragment_additionalContactPersons_edges_node | null;
}

export interface MembershipDetailsFragment_additionalContactPersons {
  readonly __typename: "AdditionalContactPersonNodeConnection";
  readonly edges: ReadonlyArray<(MembershipDetailsFragment_additionalContactPersons_edges | null)>;
}

export interface MembershipDetailsFragment {
  readonly __typename: "YouthProfileNode";
  readonly profile: MembershipDetailsFragment_profile | null;
  readonly birthDate: any;
  readonly schoolName: string;
  readonly schoolClass: string;
  readonly languageAtHome: YouthLanguage;
  readonly photoUsageApproved: boolean | null;
  readonly approverFirstName: string;
  readonly approverLastName: string;
  readonly approverEmail: string;
  readonly approverPhone: string;
  readonly membershipNumber: string;
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

export interface CreateMyYouthProfileMutationInput {
  readonly youthProfile: CreateYouthProfileInput;
  readonly profileApiToken: string;
  readonly clientMutationId?: string | null;
}

export interface CreatePhoneInput {
  readonly primary?: boolean | null;
  readonly phone: string;
  readonly phoneType: PhoneType;
}

export interface CreateYouthProfileInput {
  readonly schoolName?: string | null;
  readonly schoolClass?: string | null;
  readonly languageAtHome?: YouthLanguage | null;
  readonly approverFirstName?: string | null;
  readonly approverLastName?: string | null;
  readonly approverPhone?: string | null;
  readonly approverEmail?: string | null;
  readonly birthDate: any;
  readonly photoUsageApproved?: boolean | null;
  readonly addAdditionalContactPersons?: ReadonlyArray<(CreateAdditionalContactPersonInput | null)> | null;
  readonly updateAdditionalContactPersons?: ReadonlyArray<(UpdateAdditionalContactPersonInput | null)> | null;
  readonly removeAdditionalContactPersons?: ReadonlyArray<(string | null)> | null;
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
