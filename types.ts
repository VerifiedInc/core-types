import { InputFormatEnum, MandatoryEnum } from './enums';

/****************************************
 *         DATA RESOLVER TYPES          *
 * TYPES FROM THE DATA RESOLVER SERVICE *
 ****************************************/
export type TokenData = string;

/**
 * Interface to encapsulate Tokenized data DTO
 */
export interface TokenDto {
  value: TokenData;
  uuid: string;
}

/***********************************
 *       CORE SERVICE TYPES        *
 * DTOS, ETC FROM THE CORE SERVICE *
 ***********************************/

/**
 * Options for creating a VerificationCode
 */
export interface VerificationCodeOptions {
  email?: string;
  phone?: string;
}

/**
 * Options for creating a VerificationCodeMessage
 */
export interface VerificationCodeMessageOptions {
  email?: string;
  phone?: string;
  verificationLinkParams?: string;
}

/**
 * Options for a Credential data
 */
export interface CredentialDataOptions {
  type: string;
  data: Record<string, any>;
  expirationDate?: number | null; // ms since epoch, unix timestamp
  id?: string;
}

/**
 * Options for creating Credentials via the Core Service's /credentials service
 */
export interface CredentialsOptions {
  email?: string;
  phone?: string;
  credentials: CredentialDataOptions[];
  partnerUuid?: string;
  trackingId?: string;
}

/**
 * Object returned by the core service when issuing credentials
 */
export interface CredentialsResult {
  credentials: CredentialDto[];
  email?: string;
  phone?: string;
  url?: string;
  trackingId?: string;
}

/**
 * The User object returned from the core service
 */
export interface UserDto {
  uuid: string;
  createdAt: string;
  updatedAt: string;
  phoneNumbers: string[];
  emailAddresses: string[];
}

/**
 * A generic success response from the core service
 * Returned from endpoints that don't have another mean
 */
export interface SuccessDto {
  success: boolean;
}

/**
 * Feathers jwt payload, included in authentication
 */
export interface JWTPayload {
  iat: number;
  exp: number;
  sub: string;
  jti: string;
}

/**
 * The result of successfully authenticating a user with the core service
 */
export interface AuthenticationResult {
  accessToken: string;
  authentication: {
    strategy: string;
    payload: JWTPayload;
  };
  user: UserDto;
}

/**
 * Represents a credential request in a presentation request
 */
export interface CredentialRequestDto {
  type: string;
  issuers: string[];
  // @deprecated - Use Instead *mandatory* field.
  required?: boolean;
  mandatory?: MandatoryEnum;
  description?: string;
  allowUserInput?: boolean;
  children?: CredentialRequestDto[];
}

/**
 * The customer object returned from the core service
 */
export interface CustomerDto {
  uuid: string;
  createdAt: string; // ms since epoch, unix timestamp
  updatedAt: string; // ms since epoch, unix timestamp
  name: string;
}

/**
 * The brand object returned from the core service
 */
export interface BrandDto {
  uuid: string;
  createdAt: string; // ms since epoch, unix timestamp
  updatedAt: string; // ms since epoch, unix timestamp
  issuerName: string;
  receiverName: string;
  cardImageUrl: string;
  logoImageUrl: string | null;
  homepageUrl: string | null;
  termsUrl: string | null;
  privacyUrl: string | null;
  customer: CustomerDto;
  clientUrl: string | null;
  isConciergeEnabled: boolean
  isPartnerEnabled: boolean
}

/**
 * The presentation request object returned from the core service
 */
export interface PresentationRequestDto {
  uuid: string;
  id: string;
  createdAt: string; // ms since epoch, unix timestamp
  updatedAt: string; // ms since epoch, unix timestamp
  credentialRequests: CredentialRequestDto[];
  expirationDate: string | null; // ms since epoch, unix timestamp
  requestingBrand: BrandDto;
  issuingBrands: BrandDto[];
  description?: string | null;
}

/**
 * Non-sensitive metadata about a presentation request, accessible to non-authenticated users
 */
export interface PresentationRequestMetadataDto {
  uuid: string;
  id: string;
  createdAt: string; // ms since epoch, unix timestamp
  updatedAt: string; // ms since epoch, unix timestamp
  expirationDate: string | null; // ms since epoch, unix timestamp
  requestingBrand: BrandDto;
  issuingBrands: BrandDto[];
}

/**
 * The credential object returned from the core service
 */
export interface CredentialDto {
  id: string;
  createdAt: string; // ms since epoch, unix timestamp
  updatedAt: string; // ms since epoch, unix timestamp
  type: string;
  issuanceDate: string; // ms since epoch, unix timestamp
  expirationDate: string | null; // ms since epoch, unix timestamp
  data: Record<string, any>;
  issuerUuid: string; // brand uuid
}

/**
 * Option for credentials, part of PresentationOptions
 */
export type PresentationCredentialOption = {
  id: string;
  children?: PresentationCredentialOption;
  type?: string;
  value?: string;
  isNewCredential?: boolean;
}[];

/**
 * Options for creating a Presentation
 */
export interface PresentationOptions {
  // userUuid will be inferred from the auth token
  // brandUuid will be inferred from the presentationRequest
  credentials: PresentationCredentialOption;
  presentationRequestUuid: string;
  expirationDate?: string | null; // ms since epoch, unix timestamp
  // param used by acceptors to track conversions
  // named like this because the query param is named `verified`
  verifiedTrackingParam?: string;
}

/**
 * The presentation object returned from the core service
 */
export interface PresentationDto {
  uuid: string;
  createdAt: string; // ms since epoch, unix timestamp
  updatedAt: string; // ms since epoch, unix timestamp
  userUuid: string;
  brandUuid: string;
  presentationRequestUuid: string;
  credentialIds: string[];
  expirationDate: string | null; // ms since epoch, unix timestamp
  brand: BrandDto;
  user: UserDto;
  presentationRequest: PresentationRequestDto;
  credentials: CredentialDto[];
  // param used by acceptors to track conversions
  // named like this because the query param is named `verified`
  verifiedTrackingParam?: string;
}

export type ReceiptType =
  | 'CredentialCreated'
  | 'PresentationRequestCreated'
  | 'PresentationRequestShared'
  | 'PresentationCreated'
  | 'PresentationShared'
  | 'CredentialStatusUpdated';

export type ReceiptData =
  | CredentialCreatedReceiptData
  | PresentationRequestCreatedReceiptData
  | PresentationCreatedReceiptData
  | PresentationCreatedReceiptData
  | PresentationSharedReceiptData;

/**
 * The Receipt object returned from the core service
 */
export interface ReceiptDto<ReceiptData> {
  uuid: string;
  createdAt: string; // ms since epoch, unix timestamp
  updatedAt: string; // ms since epoch, unix timestamp
  type: ReceiptType;
  userUuid: string;
  brandUuid: string;
  data: ReceiptData;
}

/**
 * Interface to encapsulate a CredentialCreated receipt data
 */
export interface CredentialCreatedReceiptData {
  /**
   * persisting both in case of future versioning and the exact credential uuid is needed.
   * however, the id is what is really used in the wallet and throughout referencing credentials
   */
  credentialUuid: string; // credential uuid
  credentialId: string; // credential id
  credentialType: string;
}

/**
 * Interface to encapsulate a PresentationRequestCreated receipt data
 */
export interface PresentationRequestCreatedReceiptData {
  match: boolean;
  requestId: string;
}

/**
 * Interface to encapsulate a PresentationRequestShared receipt data
 */
export interface PresentationRequestSharedReceiptData {
  id: string;
  uuid: string;
}

/**
 * Interface to encapsulate a PresentationCreated receipt data
 */
export interface PresentationCreatedReceiptData {
  uuid: string;
  presentationRequestUuid: string;
  credentials: {
    /**
     * persisting both in case of future versioning and the exact credential uuid is needed.
     * however, the id is what is really used in the wallet and throughout referencing credentials
     */
    uuid: string; // credential uuid
    id: string; // credential id
    type: string;
    issuer: string;
  }[];
  // param used by acceptors to track conversions
  // named like this because the query param is named `verified`
  verifiedTrackingParam?: string;
}

/**
 * Interface to encapsulate a PresentationShared receipt data
 */
export interface PresentationSharedReceiptData {
  uuid: string;
  credentials: {
    /**
     * persisting both in case of future versioning and the exact credential uuid is needed.
     * however, the id is what is really used in the wallet and throughout referencing credentials
     */
    uuid: string; // credential uuid
    id: string; // credential id
    type: string;
    issuer: string;
  }[];
  // param used by acceptors to track conversions
  // named like this because the query param is named `verified`
  verifiedTrackingParam?: string;
}

/**
 * "Card" object representing a brand that has issued one or more credentials to the user
 */
export interface CardDto {
  issuerUuid: string; // uuid of the issuing brand
  issuerName: string; // issuerName of the issuing brand
  cardImageUrl: string; // cardImageUrl of the issuing brand
}

/**
 * Object representing an offer from a brand relationship
 */
export interface PartnerOfferDto {
  reward: string;
  description: string;
  presentationRequestId: string;
  receiverBrand: BrandDto;
}

/**
 * "CardDetails" object representing the details of all credentials issued by a brand to the user
 */
export interface CardDetailsDto {
  issuerUuid: string; // uuid of the issuing brand
  issuerName: string; // issuerName of the issuing brand
  cardImageUrl: string; // cardImageUrl of the issuing brand
  createdAt: string; // ms since epoch, unix timestamp of the first credential issued by the brand
  updatedAt: string; // ms since epoch, unix timestamp of the last credential updated by the brand
  credentials: CredentialDto[]; // credentials issued by the brand to the user
  offers: PartnerOfferDto[]; // offers from the brand's relationships
}

export interface OfferDto {
  uuid: string
  id: string
  createdAt: string
  updatedAt: string
  reward: string | null
  description: string | null
  isActiveOffer: boolean
  receiverBrand: BrandDto
  presentationRequest: PresentationRequestDto
}

/******************************************
 *         SCHEMA RESOLVER TYPES          *
 * TYPES FROM THE SCHEMA RESOLVER SERVICE *
 ******************************************/

export interface PresentationSchemaAttributes {
  /** credential value key */
  key: string;
  /** label for the credential value */
  label: string;
  /** comment for the credential value */
  comment: string;
  /** display format for the credential value */
  displayFormat: string;
}

export interface PresentationSchema {
  /** credentialType */
  type: string;
  attributes: PresentationSchemaAttributes[];
}

export interface CredentialSchemaData {
  /** human readable GroupingHeaders */
  heading: string;
  credentials: PresentationSchema[];
}

export interface SchemaGroupings {
  name?: CredentialSchemaData | undefined;
  contactInfo?: CredentialSchemaData | undefined;
  miscellaneous?: CredentialSchemaData | undefined;
  document?: CredentialSchemaData | undefined;
  [key: string]: CredentialSchemaData | undefined;
}

export interface SchemaPresentationDto {
  groupings: SchemaGroupings | undefined;
}

/*********************************************
 *         SCHEMA RESOLVER V2 TYPES          *
 * TYPES FROM THE SCHEMA RESOLVER V2 SERVICE *
 *********************************************/

/**
 * Describes the input to use to collect a credential value from the user
 */
export interface CredentialSchemaInput {
  type: InputFormatEnum; // input type (text, select, etc.)
  options?: Array<string | { value: string; label: string }>; // options for select inputs
  pattern?: string; // regex pattern for text inputs
}

export interface CredentialSchemaProperty {
  format?: string;
  description?: string;
  examples?: string[];
  title: string;
  displayFormat: string;
  type: string;
  input?: CredentialSchemaInput;
}

export interface CredentialSchemaProperties {
  properties: {
    [property: string]: CredentialSchemaProperty;
  };
  // if the value of the named property is the value of const, use the then schema
  // otherwise use the top level schema
  if: {
    type: string;
    properties: {
      [property: string]: {
        type: string;
        const: string; // the value to match
        description: string;
      };
    };
    required: string[];
  };
  then: {
    type: string;
    properties: {
      [property: string]: CredentialSchemaProperty;
    };
    required: string[];
  };
}

export interface CredentialSchemaUnevaluatedProperties {
  unevaluatedProperties: boolean;
}

export interface CredentialSchemaRequired {
  required: string[];
}

export interface CredentialSchemaType {
  type: string;
}

export interface CredentialSchemaId {
  $id: string;
}

export interface CredentialSchemaCompositeProperties extends CredentialSchemaProperties {
  additionalProperties: boolean;
}

export interface CredentialSchemaCompositeReference extends CredentialSchemaProperties {
  allOf: { $ref: string }[];
}

export interface CompositeCredentialSchema
  extends CredentialSchemaId,
    CredentialSchemaRequired,
    CredentialSchemaUnevaluatedProperties {
  anyOf?: (CredentialSchemaCompositeProperties | CredentialSchemaCompositeReference)[];
  oneOf?: CredentialSchemaCompositeProperties[];
}

export interface AtomicCredentialSchema
  extends CredentialSchemaId,
    CredentialSchemaType,
    CredentialSchemaProperties,
    CredentialSchemaRequired {}

export type CredentialSchemaDto = {
  schemas: { [credential: string]: CompositeCredentialSchema | AtomicCredentialSchema };
};
