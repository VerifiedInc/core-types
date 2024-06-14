/**
 * Type of possible options for mandatory field a credential request.
 */
export enum MandatoryEnum {
  YES = 'yes',
  NO = 'no',
  IF_AVAILABLE = 'if_available'
}

export enum DisplayFormatEnum {
  Image = 'Image',
  Phone = 'Phone',
  Ssn = 'SSN',
  Date = 'Date',
  Address = 'Address',
  CurrencyRange = 'CurrencyRange',
  String = 'String',
  State = 'State',
  Number = 'Number',
  CurrencyAmount = 'CurrencyAmount'
}

/**
 * Possible input format that user can provide.
 */
export enum InputFormatEnum {
  Text = 'Text',
  Date = 'Date',
  Select = 'Select',
  Email = 'Email',
  Phone = 'Phone',
  SSN = 'SSN',
  Image = 'Image'
}

/**
 * Possible values for credential verification method
 */
export enum CredentialVerificationMethodEnum {
  SELF_ATTESTED = 'self_attested',
  PHONE_CARRIER = 'phone_carrier',
  OTP = 'otp',
  MIXED = 'mixed',
  CREDIT_BUREAU = 'credit_bureau'
}

export enum UserIdentifierTypeEnum {
  EMAIL = 'EMAIL',
  PHONE = 'PHONE'
}
