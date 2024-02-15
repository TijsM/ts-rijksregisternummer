export enum Gender {
  Male = "Male",
  Female = "Female",
  Unknown = "Unkown",
}
export const isValidBelgianRijksregisternummer = (
  rijksregisternummer: string
): boolean => {
  const trimmedRrn = cleanRrn(rijksregisternummer);

  const formatRegex =
    /^[0-9]{2}[.\- ]?[0-9]{2}[.\- ]?[0-9]{2}[.\- ]?[0-9]{3}[.\- ]?[0-9]{2}$/;

  if (!formatRegex.test(trimmedRrn)) {
    return false;
  }

  const birthPart = trimmedRrn.substr(0, 9);
  const controlPart = trimmedRrn.substr(9, 2);

  const century = parseInt(birthPart.substr(0, 2)) < 20 ? 2000000000 : 0;
  const number = parseInt(birthPart) + century;

  const controlNumber = 97 - (number % 97);
  const calculatedControlPart = controlNumber.toString().padStart(2, "0");

  return controlPart === calculatedControlPart;
};

export const extractDateOfBirthFromRijksregisternummer = (
  rijksregisternummer: string
): Date | null => {
  if (!isValidBelgianRijksregisternummer(rijksregisternummer)) {
    return null;
  }

  const trimmedRrn = cleanRrn(rijksregisternummer);

  const year = parseInt(trimmedRrn.slice(0, 2), 10);
  const month = parseInt(trimmedRrn.slice(2, 4), 10);
  const day = parseInt(trimmedRrn.slice(4, 6), 10);

  const firstDigit = parseInt(trimmedRrn[0], 10);
  const century = firstDigit < 2 ? 2000 : 1900;
  const fullYear = century + year;

  return new Date(fullYear, month - 1, day);
};

export const extractGenderFromRijksregisternummer = (
  rijksregisternummer: string
): Gender | null => {
  // Controleer of het rijksregisternummer de juiste lengte heeft
  if (!isValidBelgianRijksregisternummer(rijksregisternummer)) {
    return Gender.Unknown;
  }

  const trimmedRrn = cleanRrn(rijksregisternummer);

  const genderPart = trimmedRrn.substring(6, 9);

  // Bepaal geslacht op basis van het tweede groepscijfer
  if (parseInt(genderPart) % 2 === 0) {
    return Gender.Female;
  } else {
    return Gender.Male;
  }
};

const cleanRrn = (rrn: string) => {
  return rrn.split(".").join("").split("-").join("").split(" ").join("");
};
