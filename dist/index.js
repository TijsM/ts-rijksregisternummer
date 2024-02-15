"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.extractGenderFromRijksregisternummer = exports.extractDateOfBirthFromRijksregisternummer = exports.isValidBelgianRijksregisternummer = exports.Gender = void 0;
var Gender;
(function (Gender) {
    Gender["Male"] = "Male";
    Gender["Female"] = "Female";
})(Gender || (exports.Gender = Gender = {}));
var isValidBelgianRijksregisternummer = function (rijksregisternummer) {
    var formatRegex = /^[0-9]{2}(0[1-9]|1[0-2])(0[1-9]|[12][0-9]|3[01])[0-9]{3}[0-9]{2}$/;
    if (!formatRegex.test(rijksregisternummer)) {
        return false; // Not in the correct format
    }
    var checksumString = rijksregisternummer.slice(0, -2);
    var checksum = parseInt(checksumString, 10) % 97;
    var controlDigits = parseInt(rijksregisternummer.slice(-2), 10);
    var expectedChecksum = 97 - checksum;
    return controlDigits === expectedChecksum;
};
exports.isValidBelgianRijksregisternummer = isValidBelgianRijksregisternummer;
var extractDateOfBirthFromRijksregisternummer = function (rijksregisternummer) {
    if (!(0, exports.isValidBelgianRijksregisternummer)(rijksregisternummer)) {
        return null; // Not in the correct format
    }
    var year = parseInt(rijksregisternummer.slice(0, 2), 10);
    var month = parseInt(rijksregisternummer.slice(2, 4), 10);
    var day = parseInt(rijksregisternummer.slice(4, 6), 10);
    var firstDigit = parseInt(rijksregisternummer[0], 10);
    var century = firstDigit < 2 ? 2000 : 1900;
    var fullYear = century + year;
    return new Date(fullYear, month - 1, day);
};
exports.extractDateOfBirthFromRijksregisternummer = extractDateOfBirthFromRijksregisternummer;
var extractGenderFromRijksregisternummer = function (rijksregisternummer) {
    // Check if the provided string matches the required format
    var formatRegex = /^[0-9]{2}(0[1-9]|1[0-2])(0[1-9]|[12][0-9]|3[01])[0-9]{3}[0-9]{2}$/;
    if (!formatRegex.test(rijksregisternummer)) {
        return null; // Not in the correct format
    }
    // Extract the gender indicator
    var genderIndicator = parseInt(rijksregisternummer.slice(-2, -1), 10);
    // Determine the gender based on the gender indicator
    if (genderIndicator % 2 === 0) {
        return Gender.Female;
    }
    else {
        return Gender.Male;
    }
};
exports.extractGenderFromRijksregisternummer = extractGenderFromRijksregisternummer;
