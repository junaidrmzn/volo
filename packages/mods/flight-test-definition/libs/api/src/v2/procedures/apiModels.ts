import { TestPointParameter } from "../test-point-parameters";

export type ProcedureInsert = {
    title: string;
    sequenceIndex?: number;
};

export type ProcedureStatus =
    | "DRAFT"
    | "FLIGHT TEST REVIEW"
    | "ENGINEERING REVIEW"
    | "TECHNICAL APPROVAL"
    | "SAFETY APPROVAL";

export type ProcedureSafetyApprovalLevel = "LOW" | "MEDIUM" | "HIGH";

export type ProcedurePatch = {
    id: string;
    title?: string;
    testPointParameters?: string[];
    objectives?: string;
    prerequisites?: string;
    passFailCriteria?: string;
    stepSetup?: string;
    stepProcedure?: string;
    stepRecovery?: string;
    status?: ProcedureStatus;
    safetyApprovalLevel?: ProcedureSafetyApprovalLevel;
    testPointTolerance?: string;
    sequenceIndex?: number;
};

export type Procedure = {
    id: string;
    testPointParameters: TestPointParameter[];
    procedureId: string;
    definitionId: string;
    objectives?: string;
    prerequisites?: string;
    passFailCriteria?: string;
    stepSetup?: string;
    stepProcedure?: string;
    stepRecovery?: string;
    title: string;
    status: ProcedureStatus;
    safetyApprovalLevel?: ProcedureSafetyApprovalLevel;
    testPointTolerance?: string;
    sequenceIndex?: number;
    createTime: string;
    updateTime: string;
};
