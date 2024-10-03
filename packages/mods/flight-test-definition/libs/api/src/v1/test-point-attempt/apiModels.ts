export type PlanningStatus = "IN WORK" | "READY" | "PLANNED";
export type FlightStatus = "ATTEMPTED" | "NOT EXECUTED" | "EXECUTED";
export type FlightTestStatus = "FAIL" | "DATA ANALYSIS" | "PASS";
export type EngineeringStatus = "NOT ACCEPTED" | "COMPLETED - PASS" | "COMPLETED - FAIL";
export type EngineeringAction = "REPEAT TEST POINT" | "CANCEL";

export type TestPointAttemptInsert = {
    ftoId: string;
    date: string;
    planningStatus?: PlanningStatus;
    flightStatus?: FlightStatus;
    flightTestStatus?: FlightTestStatus;
    engineeringStatus?: EngineeringStatus;
    engineeringAction?: EngineeringAction;
};

export type TestPointAttemptPatch = {
    planningStatus?: PlanningStatus;
    flightStatus?: FlightStatus;
    flightTestStatus?: FlightTestStatus;
    engineeringStatus?: EngineeringStatus;
    engineeringAction?: EngineeringAction;
};

export type TestPointAttempt = TestPointAttemptInsert & {
    id: string;
    createTime: string;
    updateTime: string;
};
