export enum Gender {
  Male = "Male",
  Female = "Female",
}
export const isValidBelgianRijksregisternummer = (
  rijksregisternummer: string
): boolean => {
  const trimmedRrn = cleanRrn(rijksregisternummer);

  const formatRegex =
    /^[0-9]{2}[.\- ]?[0-9]{2}[.\- ]?[0-9]{2}[.\- ]?[0-9]{3}[.\- ]?[0-9]{2}$/;

  if (!formatRegex.test(trimmedRrn)) {
    return false; // Not in the correct format
  }

  // Extracteer gegevens uit het rijksregisternummer
  const birthPart = trimmedRrn.substr(0, 9);
  const controlPart = trimmedRrn.substr(9, 2);

  // Voeg 2000000000 toe aan het geboortedeel als het rijksregisternummer verwijst naar een persoon geboren vanaf 2000
  const century = parseInt(birthPart.substr(0, 2)) < 20 ? 2000000000 : 0;
  const number = parseInt(birthPart) + century;

  // Controleer of het controlegetal geldig is
  const controlNumber = 97 - (number % 97);
  const calculatedControlPart = controlNumber.toString().padStart(2, "0");

  return controlPart === calculatedControlPart;
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

const cleanRrn = (rrn: string) => {
  return rrn.split(".").join("").split("-").join("").split(" ").join("");
};
