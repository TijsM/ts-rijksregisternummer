"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var index_1 = require("../index");
var valid2000_male = "00020200179"; //02-02-2000
var validWithSeparators2000_male = "00.02.02-001.79"; //02-02-2000
var valid2014_male = "14040300166"; //03-04-2014
var validWithSeparators2004_male = "14.04.03-001.66"; //03-04-2014
var valid1980_female = "80040300264"; //03-04-1980
var validWithSeparators1980_female = "80.04.03-002.64"; //03-04-1980
var valid1996_male = "96040300113"; //03-04-96
var validWithSeparators1996_male = "96.04.03-001.13"; //03-04-96
describe("isValidBelgianRijksregisternummer", function () {
    it("returns true for a valid Belgian rijksregisternummer", function () {
        expect((0, index_1.isValidBelgianRijksregisternummer)(valid2000_male)).toBe(true);
    });
    it("returns true for a valid Belgian rijksregisternummer", function () {
        expect((0, index_1.isValidBelgianRijksregisternummer)(validWithSeparators2000_male)).toBe(true);
    });
    it("returns false for a rijksregisternummer with incorrect checksum", function () {
        expect((0, index_1.isValidBelgianRijksregisternummer)("95010224714")).toBe(false);
    });
    it("returns false for a rijksregisternummer with incorrect format", function () {
        expect((0, index_1.isValidBelgianRijksregisternummer)("95010224")).toBe(false);
    });
});
describe("extractDateOfBirthFromRijksregisternummer", function () {
    it("should return null for invalid input", function () {
        var invalidRijksregisternummer = "123456-789-01";
        expect((0, index_1.extractDateOfBirthFromRijksregisternummer)(invalidRijksregisternummer)).toBe(null);
    });
    it("should correctly extract date of birth from valid input", function () {
        var expectedDate = new Date(2000, 1, 2);
        expect((0, index_1.extractDateOfBirthFromRijksregisternummer)(valid2000_male)).toEqual(expectedDate);
    });
    it("should correctly extract date of birth from valid input that is formatted with . and -", function () {
        var expectedDate = new Date(2000, 1, 2);
        expect((0, index_1.extractDateOfBirthFromRijksregisternummer)(validWithSeparators2000_male)).toEqual(expectedDate);
    });
    it("should handle years in the 2000s correctly", function () {
        var expectedDate = new Date(2014, 3, 3);
        expect((0, index_1.extractDateOfBirthFromRijksregisternummer)(valid2014_male)).toEqual(expectedDate);
    });
    it("should handle years in the 2000s correctly formatted with . and -", function () {
        var expectedDate = new Date(2014, 3, 3);
        expect((0, index_1.extractDateOfBirthFromRijksregisternummer)(validWithSeparators2004_male)).toEqual(expectedDate);
    });
    it("should handle years in the 1900s correctly", function () {
        var expectedDate = new Date(1980, 3, 3);
        expect((0, index_1.extractDateOfBirthFromRijksregisternummer)(valid1980_female)).toEqual(expectedDate);
    });
    it("should handle leap years correctly", function () {
        var expectedDate = new Date(1996, 3, 3);
        expect((0, index_1.extractDateOfBirthFromRijksregisternummer)(valid1996_male)).toEqual(expectedDate);
    });
});
var index_2 = require("../index");
describe("extractGenderFromRijksregisternummer", function () {
    it("should return Male for a valid male Belgian rijksregisternummer", function () {
        expect((0, index_2.extractGenderFromRijksregisternummer)(valid2014_male)).toEqual(index_2.Gender.Male);
    });
    it("should return Female for a valid male Belgian rijksregisternummer", function () {
        expect((0, index_2.extractGenderFromRijksregisternummer)(valid1980_female)).toEqual(index_2.Gender.Female);
    });
    it("should return Male for a valid male Belgian rijksregisternummer", function () {
        expect((0, index_2.extractGenderFromRijksregisternummer)(valid1996_male)).toEqual(index_2.Gender.Male);
    });
    it("should return Female for a valid male Belgian rijksregisternummer", function () {
        expect((0, index_2.extractGenderFromRijksregisternummer)(validWithSeparators1980_female)).toEqual(index_2.Gender.Female);
    });
    it("should return Male for a valid male Belgian rijksregisternummer", function () {
        expect((0, index_2.extractGenderFromRijksregisternummer)(validWithSeparators2000_male)).toEqual(index_2.Gender.Male);
    });
});
