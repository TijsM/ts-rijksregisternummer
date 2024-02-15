# ts-rijksregisternummer

A package with helper functions for a Belgian rijksregisternummer, also known as Belgian social security number (SSN) or INSZ number.

## Installation

You can install this package via npm:

```
npm install ts-rijksregisternummer
```

## Usage

```
import {
  isValidBelgianRijksregisternummer,
  extractDateOfBirthFromRijksregisternummer,
  extractGenderFromRijksregisternummer,
  Gender,
} from 'ts-rijksregisternummer';

// Check if a Belgian rijksregisternummer is valid
const isValid = isValidBelgianRijksregisternummer('XXXXXXXXXX');
console.log(isValid); // true or false

// Extract date of birth from a Belgian rijksregisternummer
const dob = extractDateOfBirthFromRijksregisternummer('XXXXXXXXXX');
console.log(dob); // Date object or null if invalid

// Extract gender from a Belgian rijksregisternummer
const gender = extractGenderFromRijksregisternummer('XXXXXXXXXX');
console.log(gender); // Gender enum (Male, Female) or null if invalid
```

## API

`isValidBelgianRijksregisternummer(rijksregisternummer: string): boolean`
Checks if the provided Belgian rijksregisternummer is valid.

`extractDateOfBirthFromRijksregisternummer(rijksregisternummer: string): Date | null`
Extracts the date of birth from the provided Belgian rijksregisternummer.

`extractGenderFromRijksregisternummer(rijksregisternummer: string): Gender | null`
Extracts the gender from the provided Belgian rijksregisternummer.
