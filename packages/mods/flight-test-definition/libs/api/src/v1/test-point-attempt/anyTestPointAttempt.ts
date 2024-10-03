import { v4 as uuidV4 } from "uuid";
import type { TestPointAttempt } from "./apiModels";

export const anyTestPointAttempt = (overwrites?: Partial<TestPointAttempt>): TestPointAttempt => ({
    ftoId: "FTO-V21-27-55-A00",
    date: "2023-03-31T04:50:21.089822+00:00",
    engineeringAction: "REPEAT TEST POINT",
    engineeringStatus: "COMPLETED - FAIL",
    flightTestStatus: "PASS",
    flightStatus: "EXECUTED",
    planningStatus: "PLANNED",
    createTime: new Date().toISOString(),
    id: uuidV4(),
    updateTime: new Date().toISOString(),
    ...overwrites,
});
