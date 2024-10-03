export type FlightTestStatus = "FAIL" | "DATA ANALYSIS" | "PASS";
export type EngineeringStatus = "NOT ACCEPTED" | "COMPLETED - PASS" | "COMPLETED - FAIL";
export type EngineeringAction = "REPEAT TEST POINT" | "CANCEL";
export type ProcessingStatus = "LINKED" | "PLANNED" | "EXECUTED" | "CANCELLED";

export type TestPointAttemptInsert = {
    ftoId: string;
    date: string;
    processingStatus?: ProcessingStatus;
    flightTestStatus?: FlightTestStatus;
    engineeringStatus?: EngineeringStatus;
    engineeringAction?: EngineeringAction;
};

export type TestPointAttemptPatch = {
    processingStatus?: ProcessingStatus;
    flightTestStatus?: FlightTestStatus;
    engineeringStatus?: EngineeringStatus;
    engineeringAction?: EngineeringAction;
};

export type TestPointAttempt = TestPointAttemptInsert & {
    id: string;
    createTime: string;
    updateTime: string;
    attemptId: string;
};
