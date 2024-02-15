import { isValidBelgianRijksregisternummer } from "../index";

describe("isValidBelgianRijksregisternummer", () => {
  it("returns true for a valid Belgian rijksregisternummer", () => {
    expect(isValidBelgianRijksregisternummer("00020200179")).toBe(true);
  });

  it("returns true for a valid Belgian rijksregisternummer", () => {
    expect(isValidBelgianRijksregisternummer("00.02.02-001.79")).toBe(true);
  });

  it("returns false for a rijksregisternummer with incorrect checksum", () => {
    expect(isValidBelgianRijksregisternummer("95010224714")).toBe(false);
  });

  it("returns false for a rijksregisternummer with incorrect format", () => {
    expect(isValidBelgianRijksregisternummer("95010224")).toBe(false);
  });
});
