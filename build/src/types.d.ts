import { InputFormatEnum, MandatoryEnum, UserIdentifierTypeEnum } from './enums';
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
 * Minified text response from core-service
 */
export interface MinifiedText {
    text: string;
    uuid: string;
    expiresAt: number;
}
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
    expirationDate?: number | null;
    id?: string;
    verificationMethod?: string;
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
    issuers?: string[];
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
    createdAt: string;
    updatedAt: string;
    name: string;
}
/**
 * The brand object returned from the core service
 */
export interface BrandDto {
    uuid: string;
    createdAt: string;
    updatedAt: string;
    issuerName: string;
    receiverName: string;
    cardImageUrl: string;
    logoImageUrl: string | null;
    homepageUrl: string | null;
    termsUrl: string | null;
    privacyUrl: string | null;
    customer: CustomerDto;
    clientUrl: string | null;
    isConciergeEnabled: boolean;
    isPartnerEnabled: boolean;
    primaryColor: string | null;
    createdBy: string | null;
}
/**
 * The presentation request object returned from the core service
 */
export interface PresentationRequestDto {
    uuid: string;
    id: string;
    createdAt: string;
    updatedAt: string;
    credentialRequests: CredentialRequestDto[];
    expirationDate: string | null;
    requestingBrand: BrandDto;
    brand: BrandDto;
    issuingBrands: BrandDto[];
    description?: string | null;
    title?: string | null;
    redirectUrl?: string | null;
    isOneClick: boolean;
}
/**
 * Non-sensitive metadata about a presentation request, accessible to non-authenticated users
 */
export interface PresentationRequestMetadataDto {
    uuid: string;
    id: string;
    createdAt: string;
    updatedAt: string;
    expirationDate: string | null;
    requestingBrand: BrandDto;
    issuingBrands: BrandDto[];
}
/**
 * The credential object returned from the core service
 */
export interface CredentialDto {
    id: string;
    createdAt: string;
    updatedAt: string;
    type: string;
    issuanceDate: string;
    expirationDate: string | null;
    data: Record<string, any>;
    issuerUuid: string;
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
    credentials: PresentationCredentialOption;
    presentationRequestUuid: string;
    expirationDate?: string | null;
    verifiedTrackingParam?: string;
}
/**
 * Options for creating a Presentation with a one-click uuid.
 */
export interface PresentationOneClickOptions extends Omit<PresentationOptions, 'presentationRequestUuid'> {
    oneClickUuid: string;
}
/**
 * The presentation object returned from the core service
 */
export interface PresentationDto {
    uuid: string;
    createdAt: string;
    updatedAt: string;
    userUuid: string;
    brandUuid: string;
    presentationRequestUuid: string;
    credentialIds: string[];
    expirationDate: string | null;
    brand: BrandDto;
    user: UserDto;
    presentationRequest: PresentationRequestDto;
    credentials: CredentialDto[];
    verifiedTrackingParam?: string;
}
export type ReceiptType = 'CredentialCreated' | 'PresentationRequestCreated' | 'PresentationRequestShared' | 'PresentationCreated' | 'PresentationShared' | 'CredentialStatusUpdated';
export type ReceiptData = CredentialCreatedReceiptData | PresentationRequestCreatedReceiptData | PresentationCreatedReceiptData | PresentationCreatedReceiptData | PresentationSharedReceiptData;
/**
 * The Receipt object returned from the core service
 */
export interface ReceiptDto<ReceiptData> {
    uuid: string;
    createdAt: string;
    updatedAt: string;
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
    credentialUuid: string;
    credentialId: string;
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
        uuid: string;
        id: string;
        type: string;
        issuer: string;
    }[];
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
        uuid: string;
        id: string;
        type: string;
        issuer: string;
    }[];
    verifiedTrackingParam?: string;
}
/**
 * "Card" object representing a brand that has issued one or more credentials to the user
 */
export interface CardDto {
    issuerUuid: string;
    issuerName: string;
    cardImageUrl: string;
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
    issuerUuid: string;
    issuerName: string;
    cardImageUrl: string;
    createdAt: string;
    updatedAt: string;
    credentials: CredentialDto[];
    offers: PartnerOfferDto[];
}
export interface OfferDto {
    uuid: string;
    id: string;
    createdAt: string;
    updatedAt: string;
    reward: string | null;
    description: string | null;
    isActiveOffer: boolean;
    receiverBrand: BrandDto;
    presentationRequest: PresentationRequestDto;
}
export interface UserIdentifierDto {
    uuid: string;
    createdAt: string;
    updatedAt: string;
    type: UserIdentifierTypeEnum;
    value: string;
    userUuid: string;
    credentialUuid: string | null;
    isIssued: boolean;
    isVerified: boolean;
    issuedPhoneCarrierCredentials: boolean | null;
}
export interface OneClickDto {
    identifiers: {
        phone: string;
    } | {
        email: string;
    };
    credentials: Record<string, any>;
    metadata: {
        id: Record<string, any>;
        verificationMethod: Record<string, any>;
        status: Record<string, any>;
        expirationDate: Record<string, any>;
        issuanceDate: Record<string, any>;
        issuerUuid: Record<string, any>;
        identifiers: {
            verificationMethod: Record<string, any>;
        };
    };
}
export interface OneClickDBDto {
    uuid: string;
    id: string;
    createdAt: string;
    updatedAt: string;
    userIdentifierUuid: string;
    presentationRequestUuid: string;
    presentationUuid: string | null;
    status: 'CREATED' | 'USER_OPTED_OUT' | 'SHARED_CREDENTIALS';
    presentationRequest: PresentationRequestDto;
    userIdentifier: UserIdentifierDto;
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
    type: InputFormatEnum;
    options?: Array<string | {
        value: string;
        label: string;
    }>;
    pattern?: string;
    default?: string;
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
    if: {
        type: string;
        properties: {
            [property: string]: {
                type: string;
                const: string;
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
    allOf: {
        $ref: string;
    }[];
}
export interface CompositeCredentialSchema extends CredentialSchemaId, CredentialSchemaRequired, CredentialSchemaUnevaluatedProperties {
    anyOf?: (CredentialSchemaCompositeProperties | CredentialSchemaCompositeReference)[];
    oneOf?: CredentialSchemaCompositeProperties[];
}
export interface AtomicCredentialSchema extends CredentialSchemaId, CredentialSchemaType, CredentialSchemaProperties, CredentialSchemaRequired {
}
export type CredentialSchemaDto = {
    schemas: {
        [credential: string]: CompositeCredentialSchema | AtomicCredentialSchema;
    };
};
//# sourceMappingURL=types.d.ts.map