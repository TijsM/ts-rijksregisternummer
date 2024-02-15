"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.extractGenderFromRijksregisternummer = exports.extractDateOfBirthFromRijksregisternummer = exports.isValidBelgianRijksregisternummer = exports.Gender = void 0;
var Gender;
(function (Gender) {
    Gender["Male"] = "Male";
    Gender["Female"] = "Female";
    Gender["Unknown"] = "Unkown";
})(Gender || (exports.Gender = Gender = {}));
var isValidBelgianRijksregisternummer = function (rijksregisternummer) {
    var trimmedRrn = cleanRrn(rijksregisternummer);
    var formatRegex = /^[0-9]{2}[.\- ]?[0-9]{2}[.\- ]?[0-9]{2}[.\- ]?[0-9]{3}[.\- ]?[0-9]{2}$/;
    if (!formatRegex.test(trimmedRrn)) {
        return false;
    }
    var birthPart = trimmedRrn.substr(0, 9);
    var controlPart = trimmedRrn.substr(9, 2);
    var century = parseInt(birthPart.substr(0, 2)) < 20 ? 2000000000 : 0;
    var number = parseInt(birthPart) + century;
    var controlNumber = 97 - (number % 97);
    var calculatedControlPart = controlNumber.toString().padStart(2, "0");
    return controlPart === calculatedControlPart;
};
exports.isValidBelgianRijksregisternummer = isValidBelgianRijksregisternummer;
var extractDateOfBirthFromRijksregisternummer = function (rijksregisternummer) {
    if (!(0, exports.isValidBelgianRijksregisternummer)(rijksregisternummer)) {
        return null;
    }
    var trimmedRrn = cleanRrn(rijksregisternummer);
    var year = parseInt(trimmedRrn.slice(0, 2), 10);
    var month = parseInt(trimmedRrn.slice(2, 4), 10);
    var day = parseInt(trimmedRrn.slice(4, 6), 10);
    var firstDigit = parseInt(trimmedRrn[0], 10);
    var century = firstDigit < 2 ? 2000 : 1900;
    var fullYear = century + year;
    return new Date(fullYear, month - 1, day);
};
exports.extractDateOfBirthFromRijksregisternummer = extractDateOfBirthFromRijksregisternummer;
var extractGenderFromRijksregisternummer = function (rijksregisternummer) {
    // Controleer of het rijksregisternummer de juiste lengte heeft
    if (!(0, exports.isValidBelgianRijksregisternummer)(rijksregisternummer)) {
        return Gender.Unknown;
    }
    var trimmedRrn = cleanRrn(rijksregisternummer);
    var genderPart = trimmedRrn.substring(6, 9);
    // Bepaal geslacht op basis van het tweede groepscijfer
    if (parseInt(genderPart) % 2 === 0) {
        return Gender.Female;
    }
    else {
        return Gender.Male;
    }
};
exports.extractGenderFromRijksregisternummer = extractGenderFromRijksregisternummer;
var cleanRrn = function (rrn) {
    return rrn.split(".").join("").split("-").join("").split(" ").join("");
};
