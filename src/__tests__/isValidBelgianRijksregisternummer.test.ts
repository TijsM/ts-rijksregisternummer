import {
  extractDateOfBirthFromRijksregisternummer,
  isValidBelgianRijksregisternummer,
} from "../index";

const valid2000 = "00020200179"; //02-02-2000
const validWithSeparators2000 = "00.02.02-001.79"; //02-02-2000

const valid2014 = "14040300166"; //03-04-2014
const validWithSeparators2004 = "14.04.03-001.66"; //03-04-2014

const valid1980 = "80040300165"; //03-04-1980
const validWithSeparators1980 = "80.04.03-001.65"; //03-04-1980

const valid1996 = "96040300113"; //03-04-96
const validWithSeparators1996 = "96.04.03-001.13"; //03-04-96

describe("isValidBelgianRijksregisternummer", () => {
  it("returns true for a valid Belgian rijksregisternummer", () => {
    expect(isValidBelgianRijksregisternummer(valid2000)).toBe(true);
  });

  it("returns true for a valid Belgian rijksregisternummer", () => {
    expect(isValidBelgianRijksregisternummer(validWithSeparators2000)).toBe(
      true
    );
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
    expect(extractDateOfBirthFromRijksregisternummer(valid2000)).toEqual(
      expectedDate
    );
  });
  it("should correctly extract date of birth from valid input that is formatted with . and -", () => {
    const expectedDate = new Date(2000, 1, 2);
    expect(
      extractDateOfBirthFromRijksregisternummer(validWithSeparators2000)
    ).toEqual(expectedDate);
  });

  it("should handle years in the 2000s correctly", () => {
    const expectedDate = new Date(2014, 3, 3);
    expect(extractDateOfBirthFromRijksregisternummer(valid2014)).toEqual(
      expectedDate
    );
  });

  it("should handle years in the 2000s correctly formatted with . and -", () => {
    const expectedDate = new Date(2014, 3, 3);
    expect(
      extractDateOfBirthFromRijksregisternummer(validWithSeparators2004)
    ).toEqual(expectedDate);
  });

  it("should handle years in the 1900s correctly", () => {
    const expectedDate = new Date(1980, 3, 3);
    expect(extractDateOfBirthFromRijksregisternummer(valid1980)).toEqual(
      expectedDate
    );
  });

  it("should handle leap years correctly", () => {
    const expectedDate = new Date(1996, 3, 3);
    expect(extractDateOfBirthFromRijksregisternummer(valid1996)).toEqual(
      expectedDate
    );
  });
});
