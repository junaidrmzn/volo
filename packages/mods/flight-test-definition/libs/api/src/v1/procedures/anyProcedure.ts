import { v4 as uuidV4 } from "uuid";
import { anyTestPointParameter } from "../test-point-parameters/anyTestPointParameter";
import type {
    Procedure,
    ProcedureInsertWithParameters,
    ProcedurePatch,
    ProcedurePatchBulk,
    ProcedureRead,
} from "./apiModels";

export const anyProcedure = (overwrites?: Partial<Procedure & ProcedureRead>): ProcedureRead => ({
    id: uuidV4(),
    procedureId: "FTD-V21-27-041-A00",
    title: "Hover Turn",
    testPointParameters: [anyTestPointParameter()],
    status: "DRAFT",
    objectives: "Test Text",
    testPointCount: 2,
    testPointTolerance: "Test Text",
    stepProcedure: "Test Text",
    definitionId: "0b99d474-99ca-4151-b968-d84c8eee39fa",
    passFailCriteria: "Test Text",
    prerequisites: "Test Text",
    safetyApprovalLevel: "LOW",
    stepRecovery: "Test Text",
    stepSetup: "Test Text",
    ...overwrites,
});

export const anyProcedureInsertWithParameters = (
    overwrites?: Partial<ProcedureInsertWithParameters>
): ProcedureInsertWithParameters => ({
    title: "Hover Turn",
    testPointParameters: ["testPointParameter"],
    ...overwrites,
});

export const anyProcedurePatchBulk = (overwrites?: Partial<ProcedurePatchBulk>): ProcedurePatchBulk => ({
    id: uuidV4(),
    title: "Hover Turn",
    testPointParameters: ["testPointParameter"],
    ...overwrites,
});

export const anyProcedurePatch = (overwrites?: Partial<ProcedurePatch>): ProcedurePatch => ({
    title: "Hover Turn",
    ...overwrites,
});
