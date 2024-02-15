export enum Gender {
  Male = "Male",
  Female = "Female",
}

export const isValidBelgianRijksregisternummer = (
  rijksregisternummer: string
): boolean => {
  const formatRegex =
    /^[0-9]{2}(0[1-9]|1[0-2])(0[1-9]|[12][0-9]|3[01])[0-9]{3}[0-9]{2}$/;
  if (!formatRegex.test(rijksregisternummer)) {
    return false; // Not in the correct format
  }

  const checksumString = rijksregisternummer.slice(0, -2);
  const checksum = parseInt(checksumString, 10) % 97;

  const controlDigits = parseInt(rijksregisternummer.slice(-2), 10);
  const expectedChecksum = 97 - checksum;
  return controlDigits === expectedChecksum;
};

export const extractDateOfBirthFromRijksregisternummer = (
  rijksregisternummer: string
): Date | null => {
  if (!isValidBelgianRijksregisternummer(rijksregisternummer)) {
    return null; // Not in the correct format
  }

  const year = parseInt(rijksregisternummer.slice(0, 2), 10);
  const month = parseInt(rijksregisternummer.slice(2, 4), 10);
  const day = parseInt(rijksregisternummer.slice(4, 6), 10);

  const firstDigit = parseInt(rijksregisternummer[0], 10);
  const century = firstDigit < 2 ? 2000 : 1900;
  const fullYear = century + year;

  return new Date(fullYear, month - 1, day);
};

export const extractGenderFromRijksregisternummer = (
  rijksregisternummer: string
): Gender | null => {
  // Check if the provided string matches the required format
  const formatRegex =
    /^[0-9]{2}(0[1-9]|1[0-2])(0[1-9]|[12][0-9]|3[01])[0-9]{3}[0-9]{2}$/;
  if (!formatRegex.test(rijksregisternummer)) {
    return null; // Not in the correct format
  }

  // Extract the gender indicator
  const genderIndicator = parseInt(rijksregisternummer.slice(-2, -1), 10);

  // Determine the gender based on the gender indicator
  if (genderIndicator % 2 === 0) {
    return Gender.Female;
  } else {
    return Gender.Male;
  }
};
