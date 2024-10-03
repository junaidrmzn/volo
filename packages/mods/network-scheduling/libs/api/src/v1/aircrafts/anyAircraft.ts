import { add, sub } from "date-fns";
import { Aircraft } from "./apiModel";

export const anyAircraft = (overwrites?: Partial<Aircraft>): Aircraft => ({
    aircraftId: "ce118b6e-d8e1-11e7-9296-cec278b6b50a",
    registration: "D-VOLO",
    msn: "12345",
    services: ["PASSENGER"],
    aircraftTypeId: "8b473847-28d4-4a12-b586-66d76d1ab4d0",
    aircraftTypeName: "ABC",
    technicalStatus: "SERVICEABLE",
    homebaseId: "2b0e41d6-340c-44e0-812f-40ff25637c8d",
    homebaseName: "Paris",
    crewConfiguration: "CREWED",
    reservations: [
        {
            id: "127fc68a-9ec9-4a6d-9975-683725203327",
            reservationType: "MISSION",
            startDateTime: new Date().toISOString(),
            endDateTime: add(new Date(), { minutes: 30 }).toISOString(),
            alternativeIdentifier: "VC-01",
            reservationModel: {
                id: "fdc4b480-066e-4cbb-a5dc-503d3aec15cf",
                flightNumber: "VC-0097",
                scheduledDepartureVertiportCode: "BRU",
                scheduledArrivalVertiportCode: "KAR",
                scheduledDepartureDateTime: new Date().toISOString(),
                scheduledArrivalDateTime: add(new Date(), { minutes: 30 }).toISOString(),
                assignedAircraftId: "10c725eb-983d-4ff4-a7d5-2112d370589a",
                assignedPilotId: "asd123-983d-4ff4-a7d5-2112d370589a",
            },
        },
        {
            id: "127fc68a-9ec9-4a6d-9975-683725203327",
            reservationType: "EVENT",
            startDateTime: sub(new Date(), { hours: 1 }).toISOString(),
            endDateTime: add(new Date(), { days: 2 }).toISOString(),
            alternativeIdentifier: "VC-01",
            reservationModel: {
                id: "09b11eb3-323c-4a62-99ff-a797db1d35b1",
                name: "Rome Demo",
                isBlockedForMission: false,
                startDateTime: sub(new Date(), { hours: 1 }).toISOString(),
                endDateTime: add(new Date(), { days: 2 }).toISOString(),
            },
        },
    ],
    massAndBalanceData: {
        cgPosition: {
            x: 2,
            y: 2,
        },
        bem: 2,
        mtom: 2,
        longCgEnvelopePoints: [
            {
                m: 4,
                kg: 4,
            },
            {
                m: 3,
                kg: 5,
            },
        ],
        latCgEnvelopePoints: [
            {
                m: 1,
                kg: 1,
            },
        ],
    },
    aircraftResources: [
        {
            name: "Pilot Seat",
            type: "PILOT_SEAT",
            position: {
                x: 5,
                y: 5,
            },
            weight: 50,
        },
        {
            name: "Passenger Seat",
            type: "PASSENGER_SEAT",
            position: {
                x: 1,
                y: 2,
            },
            weight: 50,
        },
    ],
    ...overwrites,
});
