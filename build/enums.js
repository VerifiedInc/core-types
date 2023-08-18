"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.DisplayFormatEnum = exports.MandatoryEnum = void 0;
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
//# sourceMappingURL=enums.js.map