import {
  extractDateOfBirthFromRijksregisternummer,
  isValidBelgianRijksregisternummer,
} from "../index";

const valid2000_male = "00020200179"; //02-02-2000
const validWithSeparators2000_male = "00.02.02-001.79"; //02-02-2000

const valid2014_male = "14040300166"; //03-04-2014
const validWithSeparators2004_male = "14.04.03-001.66"; //03-04-2014

const valid1980_female = "80040300264"; //03-04-1980
const validWithSeparators1980_female = "80.04.03-002.64"; //03-04-1980

const valid1996_male = "96040300113"; //03-04-96
const validWithSeparators1996_male = "96.04.03-001.13"; //03-04-96

describe("isValidBelgianRijksregisternummer", () => {
  it("returns true for a valid Belgian rijksregisternummer", () => {
    expect(isValidBelgianRijksregisternummer(valid2000_male)).toBe(true);
  });

  it("returns true for a valid Belgian rijksregisternummer", () => {
    expect(
      isValidBelgianRijksregisternummer(validWithSeparators2000_male)
    ).toBe(true);
  });

  it("returns false for a rijksregisternummer with incorrect checksum", () => {
    expect(isValidBelgianRijksregisternummer("95010224714")).toBe(false);
  });

  it("returns false for a rijksregisternummer with incorrect format", () => {
    expect(isValidBelgianRijksregisternummer("95010224")).toBe(false);
  });
});

describe("extractDateOfBirthFromRijksregisternummer", () => {
  it("should return null for invalid input", () => {
    const invalidRijksregisternummer = "123456-789-01";
    expect(
      extractDateOfBirthFromRijksregisternummer(invalidRijksregisternummer)
    ).toBe(null);
  });

  it("should correctly extract date of birth from valid input", () => {
    const expectedDate = new Date(2000, 1, 2);
    expect(extractDateOfBirthFromRijksregisternummer(valid2000_male)).toEqual(
      expectedDate
    );
  });
  it("should correctly extract date of birth from valid input that is formatted with . and -", () => {
    const expectedDate = new Date(2000, 1, 2);
    expect(
      extractDateOfBirthFromRijksregisternummer(validWithSeparators2000_male)
    ).toEqual(expectedDate);
  });

  it("should handle years in the 2000s correctly", () => {
    const expectedDate = new Date(2014, 3, 3);
    expect(extractDateOfBirthFromRijksregisternummer(valid2014_male)).toEqual(
      expectedDate
    );
  });

  it("should handle years in the 2000s correctly formatted with . and -", () => {
    const expectedDate = new Date(2014, 3, 3);
    expect(
      extractDateOfBirthFromRijksregisternummer(validWithSeparators2004_male)
    ).toEqual(expectedDate);
  });

  it("should handle years in the 1900s correctly", () => {
    const expectedDate = new Date(1980, 3, 3);
    expect(extractDateOfBirthFromRijksregisternummer(valid1980_female)).toEqual(
      expectedDate
    );
  });

  it("should handle leap years correctly", () => {
    const expectedDate = new Date(1996, 3, 3);
    expect(extractDateOfBirthFromRijksregisternummer(valid1996_male)).toEqual(
      expectedDate
    );
  });
});

import { extractGenderFromRijksregisternummer, Gender } from "../index";

describe("extractGenderFromRijksregisternummer", () => {
  it("should return Male for a valid male Belgian rijksregisternummer", () => {
    expect(extractGenderFromRijksregisternummer(valid2014_male)).toEqual(
      Gender.Male
    );
  });

  it("should return Female for a valid male Belgian rijksregisternummer", () => {
    expect(extractGenderFromRijksregisternummer(valid1980_female)).toEqual(
      Gender.Female
    );
  });

  it("should return Male for a valid male Belgian rijksregisternummer", () => {
    expect(extractGenderFromRijksregisternummer(valid1996_male)).toEqual(
      Gender.Male
    );
  });

  it("should return Female for a valid male Belgian rijksregisternummer", () => {
    expect(
      extractGenderFromRijksregisternummer(validWithSeparators1980_female)
    ).toEqual(Gender.Female);
  });

  it("should return Male for a valid male Belgian rijksregisternummer", () => {
    expect(
      extractGenderFromRijksregisternummer(validWithSeparators2000_male)
    ).toEqual(Gender.Male);
  });
});
