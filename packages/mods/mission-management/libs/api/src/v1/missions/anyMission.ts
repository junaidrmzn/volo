import {
    AircraftTechnicalStatus,
    MissionBoardingStatus,
    ReservationStatus,
} from "@voloiq-typescript-api/network-scheduling-types";
import { Mission } from "./apiModel";

export const anyMission = (overwrites?: Partial<Mission>): Mission => ({
    id: "2679f481-1517-4df6-a8e9-debe126fb5a0",
    flightNumber: "VC123",
    departureVertiportId: "97468050-19df-4c12-a751-b8a23da56121",
    departureVertiportCode: "XRJ",
    arrivalVertiportId: "f5cf2755-0eb0-484a-bef6-67f0f604e8d5",
    arrivalVertiportCode: "JCJ",
    actualArrivalVertiportCode: "OYI",
    service: "TEST",
    missionBoardingStatus: MissionBoardingStatus.BOARDING_OPEN,
    typeOfOperation: "PILOTED",
    statusOfMission: "PERFORMED",
    departureDateTime: "2022-11-06T16:34:41.000Z",
    actualDepartureDateTime: "2022-11-06T16:34:41.000Z",
    estimatedDepartureDateTime: "2022-11-06T17:39:41.000Z",
    estimatedArrivalDateTime: "2022-11-06T17:39:41.000Z",
    arrivalDateTime: "2022-11-06T17:39:41.000Z",
    actualArrivalDateTime: "2022-11-06T17:39:41.000Z",
    missionConflicts: ["PILOT_WITHOUT_PILOT_SEAT_ASSIGNMENT"],
    subProcess: {
        resourceAssignmentDone: false,
        batteryAssignmentDone: true,
        pilotAcceptanceDone: true,
        operationalFlightPlanDone: true,
        groundOpsReadyDone: true,
        utmClearanceDone: true,
        actualDepartureTimeDone: false,
        actualArrivalTimeDone: false,
        groundOpsCompletionDone: true,
        flightClosedDone: true,
        telemetryDataUploadDone: true,
        createTime: "2023-04-06T09:42:30.030Z",
        updateTime: "2023-04-06T09:42:30.030Z",
        id: "998e751c-da2f-4989-8794-f7643cc2a900",
        pilotDiaryDone: true,
        airlineAcceptanceDone: false,
        paxCheckedInDone: false,
        pilotBriefingAcceptanceDone: false,
    },
    missionAssignmentConfirmed: true,
    scheduleItemId: "3fa85f64-5717-4562-b3fc-2c963f66afa6",
    assignments: {
        id: "998e751c-da2f-4989-8794-f7643cc2a900",
        createTime: "2023-04-06T09:42:29.991Z",
        updateTime: "2023-04-12T08:15:13.438Z",
        aircraftId: "647101a1-3b79-452a-868b-2d15073285a6",
        aircraftMSN: "1112",
        aircraftRegistration: "TEST",
        aircraftTypeName: "TEST",
        batteryId: "291627c0-27e8-4361-b5d4-4d7e79238a46",
        batteryName: "todo",
        aircraftReservationStatus: ReservationStatus.UNKNOWN,
        aircraftTechnicalStatus: AircraftTechnicalStatus.SERVICEABLE,
        pilotReservationStatus: ReservationStatus.ACCEPTED,
        pilotId: "3679f481-1517-4df6-a8e9-debe126fb5a0",
        pilotFirstName: "Simon",
        pilotMiddleName: "L",
        pilotSurName: "Bayer",
        crewMemberAssignments: [
            {
                crewMemberId: "9623fe4e-560b-4e00-8efc-794c66aa6155",
                crewMemberRole: "FTE",
                firstName: "Crew",
                middleName: undefined,
                surName: "one",
            },
        ],
    },
    version: 1,
    createTime: "2023-04-11T19:00:00Z",
    updateTime: "2023-04-11T19:00:00Z",
    bookings: [
        {
            bookingId: "3d26cb7c-d810-4793-974c-5f",
            scheduleItemId: "3d26cb7c-d810-4793-974c-5f8bd",
            customerId: "3d26cb7c-d810-4793-974c-5f874bd49d8994",
            bookingCode: "BOOKED",
        },
    ],
    aircraftReservationStartDateTime: "2023-05-04T08:00:00ZZ",
    aircraftReservationEndDateTime: "2023-05-04T09:00:00Z",
    crewReservationStartDateTime: "2023-05-04T08:00:00Z",
    crewReservationEndDateTime: "2023-05-04T09:00:00Z",
    clearance: true,
    isClosable: true,
    createdOperationalFlightPlans: 10,
    checkLists: [
        {
            name: "AIRCRAFT",
            severity: "ERROR",
            checkListItems: [],
        },
        {
            name: "BATTERY",
            severity: "UNKNOWN",
            checkListItems: [],
        },
        {
            name: "CREW",
            severity: "ERROR",
            checkListItems: [],
        },
        {
            name: "FLIGHT_PLAN",
            severity: "UNKNOWN",
            checkListItems: [],
        },
        {
            name: "GENERAL",
            severity: "UNKNOWN",
            checkListItems: [],
        },
        {
            name: "GROUND_OPERATION",
            severity: "UNKNOWN",
            checkListItems: [],
        },
        {
            name: "PASSENGER",
            severity: "UNKNOWN",
            checkListItems: [],
        },
        {
            name: "NOTAMS",
            severity: "UNKNOWN",
            checkListItems: [],
        },
        {
            name: "WEATHER",
            severity: "UNKNOWN",
            checkListItems: [],
        },
    ],
    synchronizedWithLeon: false,
    notam: {
        type: "FeatureCollection",
        features: [
            {
                id: 1,
                type: "Feature",
                geometry: {
                    geometries: [
                        {
                            type: "POLYGON",
                            pointCoordinates: null,
                            lineCoordinates: null,
                            polygonCoordinates: {
                                polygon: [
                                    {
                                        line: [
                                            {
                                                longitude: 2.3833,
                                                latitude: 48.85,
                                                height: 0,
                                            },
                                            {
                                                longitude: 2.3784,
                                                latitude: 48.8496,
                                                height: 0,
                                            },
                                        ],
                                    },
                                    {
                                        line: [
                                            {
                                                longitude: 2.3784,
                                                latitude: 48.8496,
                                                height: 0,
                                            },
                                            {
                                                longitude: 2.3736,
                                                latitude: 48.8487,
                                                height: 0,
                                            },
                                        ],
                                    },
                                    {
                                        line: [
                                            {
                                                longitude: 2.3736,
                                                latitude: 48.8487,
                                                height: 0,
                                            },
                                            {
                                                longitude: 2.3693,
                                                latitude: 48.8471,
                                                height: 0,
                                            },
                                        ],
                                    },
                                    {
                                        line: [
                                            {
                                                longitude: 2.3693,
                                                latitude: 48.8471,
                                                height: 0,
                                            },
                                            {
                                                longitude: 2.3655,
                                                latitude: 48.8451,
                                                height: 0,
                                            },
                                        ],
                                    },
                                    {
                                        line: [
                                            {
                                                longitude: 2.3655,
                                                latitude: 48.8451,
                                                height: 0,
                                            },
                                            {
                                                longitude: 2.3623,
                                                latitude: 48.8426,
                                                height: 0,
                                            },
                                        ],
                                    },
                                    {
                                        line: [
                                            {
                                                longitude: 2.3623,
                                                latitude: 48.8426,
                                                height: 0,
                                            },
                                            {
                                                longitude: 2.36,
                                                latitude: 48.8397,
                                                height: 0,
                                            },
                                        ],
                                    },
                                    {
                                        line: [
                                            {
                                                longitude: 2.36,
                                                latitude: 48.8397,
                                                height: 0,
                                            },
                                            {
                                                longitude: 2.3586,
                                                latitude: 48.8365,
                                                height: 0,
                                            },
                                        ],
                                    },
                                    {
                                        line: [
                                            {
                                                longitude: 2.3586,
                                                latitude: 48.8365,
                                                height: 0,
                                            },
                                            {
                                                longitude: 2.3581,
                                                latitude: 48.8333,
                                                height: 0,
                                            },
                                        ],
                                    },
                                    {
                                        line: [
                                            {
                                                longitude: 2.3581,
                                                latitude: 48.8333,
                                                height: 0,
                                            },
                                            {
                                                longitude: 2.3586,
                                                latitude: 48.83,
                                                height: 0,
                                            },
                                        ],
                                    },
                                    {
                                        line: [
                                            {
                                                longitude: 2.3586,
                                                latitude: 48.83,
                                                height: 0,
                                            },
                                            {
                                                longitude: 2.36,
                                                latitude: 48.8269,
                                                height: 0,
                                            },
                                        ],
                                    },
                                    {
                                        line: [
                                            {
                                                longitude: 2.36,
                                                latitude: 48.8269,
                                                height: 0,
                                            },
                                            {
                                                longitude: 2.3623,
                                                latitude: 48.824,
                                                height: 0,
                                            },
                                        ],
                                    },
                                    {
                                        line: [
                                            {
                                                longitude: 2.3623,
                                                latitude: 48.824,
                                                height: 0,
                                            },
                                            {
                                                longitude: 2.3655,
                                                latitude: 48.8215,
                                                height: 0,
                                            },
                                        ],
                                    },
                                    {
                                        line: [
                                            {
                                                longitude: 2.3655,
                                                latitude: 48.8215,
                                                height: 0,
                                            },
                                            {
                                                longitude: 2.3693,
                                                latitude: 48.8195,
                                                height: 0,
                                            },
                                        ],
                                    },
                                    {
                                        line: [
                                            {
                                                longitude: 2.3693,
                                                latitude: 48.8195,
                                                height: 0,
                                            },
                                            {
                                                longitude: 2.3736,
                                                latitude: 48.8179,
                                                height: 0,
                                            },
                                        ],
                                    },
                                    {
                                        line: [
                                            {
                                                longitude: 2.3736,
                                                latitude: 48.8179,
                                                height: 0,
                                            },
                                            {
                                                longitude: 2.3784,
                                                latitude: 48.817,
                                                height: 0,
                                            },
                                        ],
                                    },
                                    {
                                        line: [
                                            {
                                                longitude: 2.3784,
                                                latitude: 48.817,
                                                height: 0,
                                            },
                                            {
                                                longitude: 2.3833,
                                                latitude: 48.8166,
                                                height: 0,
                                            },
                                        ],
                                    },
                                    {
                                        line: [
                                            {
                                                longitude: 2.3833,
                                                latitude: 48.8166,
                                                height: 0,
                                            },
                                            {
                                                longitude: 2.3882,
                                                latitude: 48.817,
                                                height: 0,
                                            },
                                        ],
                                    },
                                    {
                                        line: [
                                            {
                                                longitude: 2.3882,
                                                latitude: 48.817,
                                                height: 0,
                                            },
                                            {
                                                longitude: 2.393,
                                                latitude: 48.8179,
                                                height: 0,
                                            },
                                        ],
                                    },
                                    {
                                        line: [
                                            {
                                                longitude: 2.393,
                                                latitude: 48.8179,
                                                height: 0,
                                            },
                                            {
                                                longitude: 2.3973,
                                                latitude: 48.8195,
                                                height: 0,
                                            },
                                        ],
                                    },
                                    {
                                        line: [
                                            {
                                                longitude: 2.3973,
                                                latitude: 48.8195,
                                                height: 0,
                                            },
                                            {
                                                longitude: 2.4011,
                                                latitude: 48.8215,
                                                height: 0,
                                            },
                                        ],
                                    },
                                    {
                                        line: [
                                            {
                                                longitude: 2.4011,
                                                latitude: 48.8215,
                                                height: 0,
                                            },
                                            {
                                                longitude: 2.4043,
                                                latitude: 48.824,
                                                height: 0,
                                            },
                                        ],
                                    },
                                    {
                                        line: [
                                            {
                                                longitude: 2.4043,
                                                latitude: 48.824,
                                                height: 0,
                                            },
                                            {
                                                longitude: 2.4066,
                                                latitude: 48.8269,
                                                height: 0,
                                            },
                                        ],
                                    },
                                    {
                                        line: [
                                            {
                                                longitude: 2.4066,
                                                latitude: 48.8269,
                                                height: 0,
                                            },
                                            {
                                                longitude: 2.408,
                                                latitude: 48.83,
                                                height: 0,
                                            },
                                        ],
                                    },
                                    {
                                        line: [
                                            {
                                                longitude: 2.408,
                                                latitude: 48.83,
                                                height: 0,
                                            },
                                            {
                                                longitude: 2.4085,
                                                latitude: 48.8333,
                                                height: 0,
                                            },
                                        ],
                                    },
                                    {
                                        line: [
                                            {
                                                longitude: 2.4085,
                                                latitude: 48.8333,
                                                height: 0,
                                            },
                                            {
                                                longitude: 2.408,
                                                latitude: 48.8365,
                                                height: 0,
                                            },
                                        ],
                                    },
                                    {
                                        line: [
                                            {
                                                longitude: 2.408,
                                                latitude: 48.8365,
                                                height: 0,
                                            },
                                            {
                                                longitude: 2.4066,
                                                latitude: 48.8397,
                                                height: 0,
                                            },
                                        ],
                                    },
                                    {
                                        line: [
                                            {
                                                longitude: 2.4066,
                                                latitude: 48.8397,
                                                height: 0,
                                            },
                                            {
                                                longitude: 2.4043,
                                                latitude: 48.8426,
                                                height: 0,
                                            },
                                        ],
                                    },
                                    {
                                        line: [
                                            {
                                                longitude: 2.4043,
                                                latitude: 48.8426,
                                                height: 0,
                                            },
                                            {
                                                longitude: 2.4011,
                                                latitude: 48.8451,
                                                height: 0,
                                            },
                                        ],
                                    },
                                    {
                                        line: [
                                            {
                                                longitude: 2.4011,
                                                latitude: 48.8451,
                                                height: 0,
                                            },
                                            {
                                                longitude: 2.3973,
                                                latitude: 48.8471,
                                                height: 0,
                                            },
                                        ],
                                    },
                                    {
                                        line: [
                                            {
                                                longitude: 2.3973,
                                                latitude: 48.8471,
                                                height: 0,
                                            },
                                            {
                                                longitude: 2.393,
                                                latitude: 48.8487,
                                                height: 0,
                                            },
                                        ],
                                    },
                                    {
                                        line: [
                                            {
                                                longitude: 2.393,
                                                latitude: 48.8487,
                                                height: 0,
                                            },
                                            {
                                                longitude: 2.3882,
                                                latitude: 48.8496,
                                                height: 0,
                                            },
                                        ],
                                    },
                                    {
                                        line: [
                                            {
                                                longitude: 2.3882,
                                                latitude: 48.8496,
                                                height: 0,
                                            },
                                            {
                                                longitude: 2.3833,
                                                latitude: 48.85,
                                                height: 0,
                                            },
                                        ],
                                    },
                                ],
                            },
                            multiPolygonCoordinates: null,
                        },
                    ],
                    type: "GeometryCollection",
                },
                properties: {
                    lat: 48.8333,
                    lon: 2.3833,
                    title: "2 CRANES OPR RDL 094/4.39NM ARP:",
                    description: "PSN: 484938N 0022302E\nHGT 191FT\nELEV 296FT\nLGT DAY NGT",
                    radius: 1,
                    effectiveStart: "2024-04-24T15:39:00.000Z",
                    effectiveEnd: "2024-05-31T18:00:00.000Z",
                    schedule: null,
                    purpose: "M",
                    affectedFIR: "LFFF",
                },
            },
        ],
    },
    weatherLastUpdated: "2024-05-31T18:00:00.000Z",
    delayCodes: ["01", "02"],
    ...overwrites,
});
