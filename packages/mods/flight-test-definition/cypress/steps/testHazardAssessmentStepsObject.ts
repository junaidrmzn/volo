import { TestHazardAssessmentPage } from "../pages/test-hazard-analysis-overview/TestHazardAssessmentPageObjects";
import { Select } from "../pages/utils/select";

export const TestHazardAssessmentStepsObject = {
    addTestHazardAssessment: (parameterData: {
        hazard: string;
        residualRiskLevel: string;
        preMitigationRiskLevel: string;
        applicability: string;
        hazardGroup: string;
    }) => {
        const { applicability, hazard, hazardGroup, preMitigationRiskLevel, residualRiskLevel } = parameterData;

        TestHazardAssessmentPage.testHazardAssessmentTitleTextbox().clear().type(hazard);
        Select.selectByOptionName("Risk Level (Pre-Mitigation):*", preMitigationRiskLevel);
        Select.selectByOptionName("Risk Level (Residual):*", residualRiskLevel);
        Select.selectByOptionName("Hazard Group:*", hazardGroup);
        Select.selectByOptionName("Applicability:*", applicability);

        TestHazardAssessmentPage.saveButton().click();
    },

    editTestHazardAssessment: (parameterData: {
        hazard?: string;
        residualRiskLevel?: string;
        preMitigationRiskLevel?: string;
        applicability?: string;
        hazardGroup?: string;
    }) => {
        const { applicability, hazard, hazardGroup, preMitigationRiskLevel, residualRiskLevel } = parameterData;

        if (applicability) {
            Select.selectByOptionName("Applicability:*", applicability);
        }

        if (hazard) {
            TestHazardAssessmentPage.testHazardAssessmentTitleTextbox().clear().type(hazard);
        }
        if (hazardGroup) {
            Select.selectByOptionName("Hazard Group:*", hazardGroup);
        }
        if (preMitigationRiskLevel) {
            Select.selectByOptionName("Risk Level (Pre-Mitigation):*", preMitigationRiskLevel);
        }
        if (residualRiskLevel) {
            Select.selectByOptionName("Risk Level (Residual):*", residualRiskLevel);
        }

        TestHazardAssessmentPage.saveButton().click();
    },
};
