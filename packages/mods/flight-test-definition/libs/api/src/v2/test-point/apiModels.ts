import type { TestPointAttempt } from "../test-point-attempt";
import type { TestPointParameterInsert, TestPointParameterResponse } from "../test-point-parameters";

export type TestPointStatus = "IN WORK" | "READY";
export type TestPointApplicability = "DEVELOPMENT" | "CERTIFICATION" | "AGENCY" | "BUILD_UP" | "UNASSIGNED";

export type TestPoint = {
    id: string;
    attempts: TestPointAttempt[];
    testPointParameters: TestPointParameterResponse[];
    isApplicableForDevelopment: boolean;
    isApplicableForCertification: boolean;
    isApplicableForAgency: boolean;
    isApplicableForBuildUp: boolean;
    isApplicableForUnassigned: boolean;
    applicability: TestPointApplicability;
    grossWeight?: string;
    centerOfGravity?: string;
    comments?: string;
    testPointId: string;
    status?: TestPointStatus;
    definitionId?: string;
    procedureId?: string;
};

export type TestPointInsert = {
    isApplicableForDevelopment?: boolean;
    isApplicableForCertification?: boolean;
    isApplicableForAgency?: boolean;
    isApplicableForBuildUp?: boolean;
    isApplicableForUnassigned?: boolean;
    applicability?: TestPointApplicability;
    grossWeight?: string;
    centerOfGravity?: string;
    testPointParameters?: TestPointParameterInsert[];
    comments?: string;
    sequenceIndex?: number;
};

export type TestPointPatch = {
    id: string;
    isApplicableForDevelopment?: boolean;
    isApplicableForCertification?: boolean;
    isApplicableForAgency?: boolean;
    isApplicableForBuildUp?: boolean;
    isApplicableForUnassigned?: boolean;
    applicability?: TestPointApplicability;
    grossWeight?: string;
    centerOfGravity?: string;
    testPointParameters?: TestPointParameterInsert[];
    comments?: string;
};

// TestPointList in the backend
export type TestPointGroup = {
    id: string;
    ata: number;
    definitions: TestPointModifiedDefinitionLevel[];
};

export type TestPointModifiedDefinitionLevel = {
    definitionId: string;
    procedures: TestPointModifiedProcedureLevel[];
};

export type TestPointModifiedProcedureLevel = {
    procedureId: string;
    procedureTitle: string;
    testPoints: TestPoint[];
};
