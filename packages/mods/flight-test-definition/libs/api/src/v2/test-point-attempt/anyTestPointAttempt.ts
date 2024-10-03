import type { TestPointAttempt } from "./apiModels";

export const anyTestPointAttempt = (overwrites?: Partial<TestPointAttempt>): TestPointAttempt => ({
    ftoId: "FTO-V21-27-55-A00",
    date: "2023-03-31T04:50:21.089822+00:00",
    engineeringAction: "REPEAT TEST POINT",
    engineeringStatus: "COMPLETED - FAIL",
    flightTestStatus: "PASS",
    createTime: new Date("2024-04-03").toISOString(),
    id: "e7ad28d3-20c6-4447-8f07-d4071f53a538",
    updateTime: new Date("2024-04-03").toISOString(),
    processingStatus: "EXECUTED",
    attemptId: "AT-VC2-01-001-A00",
    ...overwrites,
});
