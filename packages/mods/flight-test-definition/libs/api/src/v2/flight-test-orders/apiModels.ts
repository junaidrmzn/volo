import type {
    AircraftReleaseConfiguration,
    FlightTestCategory,
    FlightTestCrew,
    FlightTestOrderInsert,
    RiskLevel,
    TestPointAssociatedProcedure,
} from "../../v1";

export type FlightTestOrderStatus = "DRAFT" | "AWAITING_APPROVAL" | "APPROVED" | "EXECUTED" | "CANCELLED" | "RELEASED";

export type TestAircraftApplicability = "Manned" | "Unmanned";

export type LinkedDefinition = {
    id: string;
    ftdId: string;
    title: string;
};

export type FlightTestOrder = FlightTestOrderInsert & {
    id: string;
    createTime: string;
    updateTime: string;

    // Part 1 - Test Mission > General > General Information
    ftoId: string;
    flightNumber?: string;
    riskLevel?: RiskLevel;
    flightTestCategory?: FlightTestCategory;
    createdBy: string;
    missionObjective?: string;
    flightTestPlanIds?: string[];
    linkedDefinitions: LinkedDefinition[];

    // Part 1 - Test Mission > General > Test Aircraft
    model?: string;
    applicability?: TestAircraftApplicability;
    aircraftCallsign?: string;
    flightConditions?: string;
    revision?: string;
    issueDateFlightConditions?: string;
    permitToFly?: string;
    issueDatePermitToFly?: string;
    validUntil?: string;

    // Part 1 - Test Mission > General > Aircraft Configuration
    allUpMass?: string;
    centerOfGravity?: string;
    massAndBalanceCategory?: string;
    charging?: string;
    ballasts?: string;
    bingo?: string;
    totalDuration?: string;
    setupSheet?: string;
    notesToAircraft?: string;

    // Part 1 - Test Mission > General > Flight Test Crew & Occupants
    flightTestCrew: FlightTestCrew[];

    // Part 1 - Test Mission > General > Test Mission & Weather
    maxTestAltitude?: string;
    flightRule?: string;
    departure?: string;
    arrival?: string;
    frequencyOperations?: string;
    frequencyTower?: string;
    optionalFrequency?: string;
    airspaceRequested?: string;
    weatherLimits?: string;
    weatherObserved?: string;

    // Part 1 - Test Mission > Associated Procedures
    associatedProcedures?: TestPointAssociatedProcedure[];

    // Part 2 - Aircraft Release for Flight > Configurations
    aircraftReleaseConfigurations: AircraftReleaseConfiguration[];

    // Part 2 - Aircraft Release for Flight > General Information
    aircraftConfigurationStatus?: string;
    date?: Date;
    issuedApprovedLimitations?: string;

    testPointSequenceCounter: number;
    testPointCounter: number;

    status: FlightTestOrderStatus;
};

export type FlightTestOrderPatch = Partial<Omit<FlightTestOrder, "id" | "createTime" | "updateTime" | "createdBy">>;
