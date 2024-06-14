"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserIdentifierTypeEnum = exports.CredentialVerificationMethodEnum = exports.InputFormatEnum = exports.DisplayFormatEnum = exports.MandatoryEnum = void 0;
/**
 * Type of possible options for mandatory field a credential request.
 */
var MandatoryEnum;
(function (MandatoryEnum) {
    MandatoryEnum["YES"] = "yes";
    MandatoryEnum["NO"] = "no";
    MandatoryEnum["IF_AVAILABLE"] = "if_available";
})(MandatoryEnum = exports.MandatoryEnum || (exports.MandatoryEnum = {}));
var DisplayFormatEnum;
(function (DisplayFormatEnum) {
    DisplayFormatEnum["Image"] = "Image";
    DisplayFormatEnum["Phone"] = "Phone";
    DisplayFormatEnum["Ssn"] = "SSN";
    DisplayFormatEnum["Date"] = "Date";
    DisplayFormatEnum["Address"] = "Address";
    DisplayFormatEnum["CurrencyRange"] = "CurrencyRange";
    DisplayFormatEnum["String"] = "String";
    DisplayFormatEnum["State"] = "State";
    DisplayFormatEnum["Number"] = "Number";
    DisplayFormatEnum["CurrencyAmount"] = "CurrencyAmount";
})(DisplayFormatEnum = exports.DisplayFormatEnum || (exports.DisplayFormatEnum = {}));
/**
 * Possible input format that user can provide.
 */
var InputFormatEnum;
(function (InputFormatEnum) {
    InputFormatEnum["Text"] = "Text";
    InputFormatEnum["Date"] = "Date";
    InputFormatEnum["Select"] = "Select";
    InputFormatEnum["Email"] = "Email";
    InputFormatEnum["Phone"] = "Phone";
    InputFormatEnum["SSN"] = "SSN";
    InputFormatEnum["Image"] = "Image";
})(InputFormatEnum = exports.InputFormatEnum || (exports.InputFormatEnum = {}));
/**
 * Possible values for credential verification method
 */
var CredentialVerificationMethodEnum;
(function (CredentialVerificationMethodEnum) {
    CredentialVerificationMethodEnum["SELF_ATTESTED"] = "self_attested";
    CredentialVerificationMethodEnum["PHONE_CARRIER"] = "phone_carrier";
    CredentialVerificationMethodEnum["OTP"] = "otp";
    CredentialVerificationMethodEnum["MIXED"] = "mixed";
    CredentialVerificationMethodEnum["CREDIT_BUREAU"] = "credit_bureau";
})(CredentialVerificationMethodEnum = exports.CredentialVerificationMethodEnum || (exports.CredentialVerificationMethodEnum = {}));
var UserIdentifierTypeEnum;
(function (UserIdentifierTypeEnum) {
    UserIdentifierTypeEnum["EMAIL"] = "EMAIL";
    UserIdentifierTypeEnum["PHONE"] = "PHONE";
})(UserIdentifierTypeEnum = exports.UserIdentifierTypeEnum || (exports.UserIdentifierTypeEnum = {}));
//# sourceMappingURL=enums.js.map