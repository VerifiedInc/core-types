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
  required?: boolean;
}

/**
 * The customer object returned from the core service
 */
export interface CustomerDto {
  uuid: string;
  createdAt: string; // unix timestamp
  updatedAt: string; // unix timestamp
  name: string;
}

/**
 * The brand object returned from the core service
 */
export interface BrandDto {
  uuid: string;
  createdAt: string; // unix timestamp
  updatedAt: string; // unix timestamp
  issuerName: string;
  receiverName: string;
  cardImageUrl: string;
  customer: CustomerDto;
}

/**
 * The presentation request object returned from the core service
 */
export interface PresentationRequestDto {
  uuid: string;
  id: string;
  createdAt: string; // unix timestamp
  updatedAt: string; // unix timestamp
  credentialRequests: CredentialRequestDto[];
  expirationDate: string | null; // unix timestamp
  requestingBrand: BrandDto;
  issuingBrands: BrandDto[];
  user: UserDto;
}

/**
 * Non-sensitive metadata about a presentation request, accessible to non-authenticated users
 */
export interface PresentationRequestMetadataDto {
  uuid: string;
  id: string;
  createdAt: string; // unix timestamp
  updatedAt: string; // unix timestamp
  expirationDate: string | null; // unix timestamp
  requestingBrand: BrandDto;
  issuingBrands: BrandDto[];
}

/**
 * The credential object returned from the core service
 */
export interface CredentialDto {
  id: string;
  createdAt: string; // unix timestamp
  updatedAt: string; // unix timestamp
  type: string;
  issuanceDate: string; // unix timestamp
  expirationDate: string | null; // unix timestamp
  data: Record<string, any>;
  issuer: string; // brand uuid
}

/**
 * Options for creating a Presentation
 */
export interface PresentationOptions {
  // userUuid will be inferred from the auth token
  // brandUuid will be inferred from the presentationRequest
  credentialIds: string[];
  presentationRequestUuid: string;
  expirationDate?: string | null; // unix timestamp
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
}

export interface SchemaPresentationDto {
  groupings: SchemaGroupings | undefined;
}
