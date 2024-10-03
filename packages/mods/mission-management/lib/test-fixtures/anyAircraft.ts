import type {
    Aircraft,
    AircraftBase,
    AircraftCreate,
    AircraftCreateAllOf,
} from "@voloiq-typescript-api/aircraft-management-types";

export const anyAircraft = (overwrites?: Partial<AircraftBase & AircraftCreate & AircraftCreateAllOf>): Aircraft => ({
    id: "ce118b6e-d8e1-11e7-9296-cec278b6b50a",
    registration: "D-VOLO",
    msn: "12345",
    services: ["PASSENGER"],
    aircraftTypeId: "8b473847-28d4-4a12-b586-66d76d1ab4d0",
    technicalStatus: "SERVICEABLE",
    homebaseVertiportId: "2b0e41d6-340c-44e0-812f-40ff25637c8d",
    crewConfiguration: "CREWED",
    validFrom: "2023-09-01T06:01:00.000Z",
    validTo: "2023-11-02T07:00:00.000Z",
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
    batterySlots: 13,
    colorAndMarkingCharacteristics: [],
    communicationCapabilities: [],
    createTime: "2020-11-06T16:34:41.000Z",
    emergencyRadioTypes: [],
    lifeJacketEquipment: [],
    luggageCompartments: 13,
    navigationCapabilities: [],
    otherResources: 13,
    passengerSeats: 13,
    performanceBasedNavigationCapabilities: [],
    pilotSeats: 13,
    surveillanceTransponderTypes: [],
    survivalEquipmentClassifications: [],
    updateTime: "2020-11-06T16:34:41.000Z",
    ...overwrites,
});
