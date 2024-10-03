import { FlightTestOrder } from "@voloiq/flight-test-definition-api/v2";

export type GeneralInformationType = Required<
    Pick<
        FlightTestOrder,
        | "missionTitle"
        | "ftoId"
        | "flightNumber"
        | "riskLevel"
        | "flightTestCategory"
        | "createTime"
        | "createdBy"
        | "missionObjective"
        | "flightTestPlanIds"
        | "linkedDefinitions"
    >
>;

export type TestAircraftType = Required<
    Pick<
        FlightTestOrder,
        | "masterModel"
        | "model"
        | "msn"
        | "applicability"
        | "aircraftCallsign"
        | "flightConditions"
        | "revision"
        | "issueDateFlightConditions"
        | "permitToFly"
        | "issueDatePermitToFly"
        | "validUntil"
    >
>;

export type AircraftConfigurationType = Required<
    Pick<
        FlightTestOrder,
        | "allUpMass"
        | "centerOfGravity"
        | "massAndBalanceCategory"
        | "ballasts"
        | "charging"
        | "bingo"
        | "totalDuration"
        | "setupSheet"
        | "notesToAircraft"
    >
>;

export type TestMissionAndWeatherType = Required<
    Pick<
        FlightTestOrder,
        | "maxTestAltitude"
        | "flightRule"
        | "departure"
        | "arrival"
        | "frequencyOperations"
        | "frequencyTower"
        | "optionalFrequency"
        | "airspaceRequested"
        | "weatherLimits"
        | "weatherObserved"
    >
>;
