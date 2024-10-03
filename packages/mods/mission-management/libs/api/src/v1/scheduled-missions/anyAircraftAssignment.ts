import { AircraftAssignment } from "./apiModels";

export const anyAircraftAssignment = (overwrites?: Partial<AircraftAssignment>): AircraftAssignment => ({
    aircraftId: "ae161360-743a-41c8-8bc5-a40196dc8692",
    aircraftMSN: "216",
    aircraftRegistration: "F-ELIX",
    aircraftTypeName: "VCFelix",
    aircraftTechnicalStatus: "SERVICEABLE",
    missionsList: [
        {
            missionId: "67971e70-6483-4a4d-b871-ae7228465f8b",
            flightNumber: "VC1111",
            statusOfMission: "PLANNED",
            departureVertiportCode: "XRJ",
            arrivalVertiportCode: "FCO",
            actualDepartureDateTime: "2022-11-06T17:39:41.000Z",
            actualArrivalDateTime: "2022-11-06T17:39:41.000Z",
            estimatedDepartureDateTime: "2022-11-06T17:39:41.000Z",
            estimatedArrivalDateTime: "2022-11-06T17:39:41.000Z",
            departureDateTime: "2022-11-06T17:39:41.000Z",
            arrivalDateTime: "2022-11-06T17:39:41.000Z",
            checkLists: [
                {
                    name: "AIRCRAFT",
                    severity: "UNKNOWN",
                    checkListItems: [],
                },
                {
                    name: "BATTERY",
                    severity: "UNKNOWN",
                    checkListItems: [],
                },
                {
                    name: "CREW",
                    severity: "UNKNOWN",
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
            isInConflict: false,
            service: "TEST",
        },
    ],
    groundEventList: [
        {
            id: "67971e70-6483-4a4d-b871-ae7228465f90",
            startTime: "2023-12-12T16:34:41.000Z",
            endTime: "2023-12-12T17:34:41.000Z",
            inboundMissionId: "67971e70-6483-4a4d-b871-ae7228465f8b",
            vertiportCode: "XRJ",
        },
    ],
    ...overwrites,
});
