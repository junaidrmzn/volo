import type { CrewMemberWithReservations } from "@voloiq-typescript-api/crew-api-types";

export const anyAvailableCrewMember = (
    overwrites?: Partial<CrewMemberWithReservations>
): Required<CrewMemberWithReservations> => ({
    id: "d351d5c6-4395-404a-8921-23678473299d",
    firstName: "Paul",
    middleName: "",
    surName: "Stone",
    email: "abc@volocopter.com",
    flightHours: 6.3,
    roleAssignments: ["FTE", "PIL", "TES"],
    available: true,
    reservations: [
        {
            id: "834793458934-483593854",
            alternativeIdentifier: "VC-2044",
            startDateTime: "2023-05-04T09:30:00Z",
            endDateTime: "2023-05-04T09:50:00Z",
            reservationType: "UNKNOWN",
        },
    ],
    languageProficiencyValidUntil: "2023-05-04T09:30:00Z",
    licenseValidUntil: "2023-05-04T09:30:00Z",
    medicalCertificateValidUntil: "2023-05-04T09:30:00Z",
    licensedPilotedFlights: true,
    licensedRemotePilotedFlights: true,
    phoneNumber: "73388-848944",
    synchronizedWithLeon: true,
    lastSynchronizedAt: "2023-05-04T09:30:00Z",
    ...overwrites,
});
