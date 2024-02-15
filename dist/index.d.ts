export declare enum Gender {
    Male = "Male",
    Female = "Female",
    Unknown = "Unkown"
}
export declare const isValidBelgianRijksregisternummer: (rijksregisternummer: string) => boolean;
export declare const extractDateOfBirthFromRijksregisternummer: (rijksregisternummer: string) => Date | null;
export declare const extractGenderFromRijksregisternummer: (rijksregisternummer: string) => Gender | null;
//# sourceMappingURL=index.d.ts.map