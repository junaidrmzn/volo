import { FlightTestCategory, RiskLevel } from "../common";

export type MasterModel = "2X" | "VC2-1" | "VD150" | "SIMX" | "SIMZERO";
export type Category = "1" | "2";

export type AircraftReleaseConfiguration = {
    type: string;
    required: string;
    status: string;
    commentOnDeviation?: string;
    accept: boolean;
};

export type FlightTestOrderInsert = {
    missionTitle: string;
    masterModel: MasterModel;
    msn: string;
};

export type TestPointAssociatedProcedure = {
    id: string;
    ftdId: string;
    title: string;
    testPointSequenceId: string;
    testPointSequenceType: string;
    testPointIds: string[];
};

export type FlightTestOrderPatch = Partial<
    FlightTestOrderInsert & {
        // general information
        flightTestCategory: FlightTestCategory;
        riskLevel: RiskLevel;
        missionScenarios: string;
        missionObjective: string;
        flightTestPlanIds: string[];
        aircraftCallsign: string;
        responsibleOperator: string;
        model: string;
        flightConditions: string;
        revision: string;
        issueDateForFlightConditions: string;
        permitToFly: string;
        issueDateForPermit: string;
        expiredDateForPermit: string;
        flightNumber: string;

        // responsible crews
        pilotInCommand: string;
        category: Category;
        testConductor: string;
        secondPilot: string;
        firstObserver: string;
        secondObserver: string;

        // aircraft setup
        flyingMass: number;
        plannedDuration: string;
        charge: number;
        minCellVolt: number;
        flyingLong: number;
        flyingLat: number;
        longRange: string;
        latRange: string;
        notesToAircraft: string;

        // limitations
        maxTestAlt: number;
        maxTestSpeed: number;
        vne: number;
        maxRoll: number;
        maxPitch: number;
        weatherLimits: string;
        weatherObserved: string;

        // misc. ops
        frequencyOps: number;
        frequencyTwr: number;
        frequencyApp: number;
        airspaceRequested: string;
        clearance: string;

        // aircraft release for flight configuration
        aircraftReleaseConfigurations: AircraftReleaseConfiguration[];

        // other information
        temporaryLimitationsAircraftConfiguration: string;
        referenceSubstantiation: string;

        // associated procedures
        associatedProcedures: TestPointAssociatedProcedure[];
    }
>;

export type FlightTestOrder = {
    id: string;
    ftoId: string;
    createTime: string;
    createdBy: string;
} & FlightTestOrderPatch &
    FlightTestOrderInsert;
