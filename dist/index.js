"use strict";
function isValidBelgianRijksregisternummer(rijksregisternummer) {
    // Check if the provided string matches the required format
    var formatRegex = /^[0-9]{2}(0[1-9]|1[0-2])(0[1-9]|[12][0-9]|3[01])[0-9]{3}[0-9]{2}$/;
    if (!formatRegex.test(rijksregisternummer)) {
        return false; // Not in the correct format
    }
    // Calculate the checksum
    var checksumString = rijksregisternummer.slice(0, -2);
    var checksum = parseInt(checksumString, 10) % 97;
    // Check if the checksum is valid
    var controlDigits = parseInt(rijksregisternummer.slice(-2), 10);
    var expectedChecksum = 97 - checksum;
    return controlDigits === expectedChecksum;
}
