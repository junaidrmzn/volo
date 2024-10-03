import type { RiskLevel } from "../common";

export type HazardApplicability = "MANNED" | "UNMANNED";
export type HazardGroup = "GENERIC_HAZARDS" | "TEST_POINT_SPECIFIC_HAZARDS";
export type LinkedDefinitionType = {
    id: string;
    ftdId: string;
};

export type TestHazardAssessmentInsert = {
    hazard: string;
    residualRiskLevel: RiskLevel;
    preMitigationRiskLevel: RiskLevel;
    applicability: HazardApplicability;
    hazardGroup: HazardGroup;
};

export type TestHazardAssessmentPatch = Partial<TestHazardAssessmentInsert>;

export type TestHazardAssessment = {
    id: string;
    inactive: boolean;
    linkedDefinitions: LinkedDefinitionType[];
} & TestHazardAssessmentInsert;
