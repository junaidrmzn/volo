export type CrewMemberInitialValues = {
    firstName: string | undefined;
    surName: string | undefined;
    weight: number | undefined;
    licenseValidUntil: Date | undefined;
    medicalCertificateValidUntil: Date | undefined;
    languageProficiencyValidUntil: Date | undefined;
    licensedRemotePilotedFlights: boolean | undefined;
    licensedPilotedFlights: boolean | undefined;
    email: string | undefined;
    homeBase: {
        value: string | undefined;
        label: string | undefined;
    };
    roles: string[] | undefined;
    validFrom: Date | undefined;
    validTo: Date | undefined;
};
