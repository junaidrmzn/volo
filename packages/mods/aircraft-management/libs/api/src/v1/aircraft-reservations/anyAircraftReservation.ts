import type { AircraftWithReservations } from "./apiModels";

export const anyAircraftReservation = (overwrites?: Partial<AircraftWithReservations>): AircraftWithReservations => ({
    aircraftId: "62ade664-ed93-47a2-a738-e01421a0e355",
    registration: "F-ELIX",
    msn: "216",
    technicalStatus: "SERVICEABLE",
    aircraftTypeId: "fdb42098-d215-4acc-9736-1a8188415d15",
    aircraftTypeName: "VCFelix",
    reservations: [
        {
            id: "127fc68a-9ec9-4a6d-9975-683725203327",
            reservationType: "MISSION",
            startDateTime: "2023-09-07T07:00:00.000Z",
            endDateTime: "2023-09-09T07:00:00.000Z",
            alternativeIdentifier: "VC-01",
        },
        {
            id: "c60e76d8-ce91-4da0-971f-7647e1f39c5c",
            reservationType: "MISSION",
            startDateTime: "2023-09-05T14:00:00.000Z",
            endDateTime: "2023-09-05T14:15:00.000Z",
            alternativeIdentifier: "VC-02",
        },
        {
            id: "8d37fe39-32ae-4fb2-858d-b0b87671a526",
            reservationType: "MISSION",
            startDateTime: "2023-09-02T17:00:00.000Z",
            endDateTime: "2023-09-02T17:20:00.000Z",
            alternativeIdentifier: "VC-03",
        },
    ],
    ...overwrites,
});
