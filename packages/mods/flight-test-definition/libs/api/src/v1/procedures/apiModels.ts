import type { AdditionalComment, ApplicableRequirement, ImportantNote, TestPoint } from "..";
import type { TestPointParameter } from "../test-point-parameters/apiModels";

export declare type ProcedureStatus =
    | "DRAFT"
    | "FLIGHT TEST REVIEW"
    | "ENGINEERING REVIEW"
    | "TECHNICAL APPROVAL"
    | "SAFETY APPROVAL";

export declare type SafetyLevel = "LOW" | "MEDIUM" | "HIGH";

export type ProcedureInsertWithParameters = {
    title: string;
    testPointParameters: string[];
};

export type Procedure = {
    id: string;
    title: string;
    procedureId: string;
    testPointParameters: TestPointParameter[];
    status: ProcedureStatus;
    objectives?: string;
    testPointTolerance?: string;
    stepSetup?: string;
    stepProcedure?: string;
    stepRecovery?: string;
    definitionId: string;
    safetyApprovalLevel?: SafetyLevel;
    prerequisites?: string;
    passFailCriteria?: string;
};

export type ProcedurePatchBulk = {
    id: string;
    title?: string;
    testPointParameters?: string[];
};

export type ProcedureRead = Procedure & {
    testPointCount: number;
};

export type ProcedurePatch = {
    title?: string;
    testPointTolerance?: string;
    objectives?: string;
    prerequisites?: string;
    passFailCriteria?: string;
    safetyApprovalLevel?: SafetyLevel;
};

export type ProceduresChangesOverview = ProcedureRead & {
    prerequisites?: string;
    createTime: string;
    updateTime: string;

    testPoints: TestPoint[];
    importantNotes: ImportantNote[];
    applicableRequirements: ApplicableRequirement[];
    additionalComments: AdditionalComment[];
};

export type ProcedureRevision = {
    ftdId: string;
    released: boolean;
    revision: string;
    available: boolean;
};
