import type { Aircraft, AircraftBase, AircraftCreate, AircraftCreateAllOf } from "@voloiq/aircraft-management-api/v1";

export const anyAircraft = (overwrites?: Partial<AircraftBase & AircraftCreate & AircraftCreateAllOf>): Aircraft => ({
    id: "9d1b8fd2-80e3-45ba-9553-780afd74b6dd",
    msn: "12345",
    technicalStatus: "SERVICEABLE_WITH_LIMITATIONS",
    validFrom: "2024-01-01T07:00:00.000Z",
    crewConfiguration: "UNCREWED",
    services: ["PASSENGER", "TEST"],
    aircraftTypeId: "ef52b93a-f2b2-49ba-bd20-c40d837e3771",
    createTime: "2023-09-22T11:28:24.246Z",
    updateTime: "2024-05-07T10:42:22.412Z",
    aircraftTypeName: "Diamond 62",
    version: 20,
    registration: "D-IVAS",
    validTo: "2025-03-01T07:00:00.000Z",
    colorAndMarkingCharacteristics: [],
    survivalEquipmentClassifications: [],
    lifeJacketEquipment: [],
    surveillanceTransponderTypes: [],
    communicationCapabilities: [],
    navigationCapabilities: [],
    emergencyRadioTypes: [],
    performanceBasedNavigationCapabilities: [],
    massAndBalanceData: {
        cgPosition: {
            x: 0,
            y: 0,
        },
        bem: 0,
        mtom: 2300,
        longCgEnvelopePoints: [],
        latCgEnvelopePoints: [],
    },
    aircraftResources: [],
    pilotSeats: 0,
    passengerSeats: 0,
    batterySlots: 0,
    luggageCompartments: 0,
    otherResources: 0,
    synchronizedWithLeon: true,
    createdBy: "KafkaTask",
    updatedBy: "regis.martin@lhind.dlh.de",
    ...overwrites,
});

export const anyAircraftCreate = (
    overwrites?: Partial<AircraftBase & AircraftCreate & AircraftCreateAllOf>
): AircraftCreate => ({
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
    ...overwrites,
});
