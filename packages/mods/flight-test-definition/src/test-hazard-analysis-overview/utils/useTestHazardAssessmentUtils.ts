import { match } from "ts-pattern";
import { HazardApplicability, HazardGroup, RiskLevel } from "@voloiq/flight-test-definition-api/v1";
import { useTestHazardAssessmentUtilsTranslations } from "./translations/useTestHazardAssessmentUtilsTranslations";

export const useTestHazardAssessmentUtils = () => {
    const { t } = useTestHazardAssessmentUtilsTranslations();
    const getTestHazardLevel = (riskLevels: RiskLevel) =>
        match(riskLevels)
            .with("LOW", () => t("risk-levels.low"))
            .with("MEDIUM", () => t("risk-levels.medium"))
            .with("HIGH", () => t("risk-levels.high"))
            .with("VERY_HIGH", () => t("risk-levels.very-high"))
            .exhaustive();

    const getTestHazardApplicability = (applicability: HazardApplicability) =>
        match(applicability)
            .with("MANNED", () => t("applicability.manned"))
            .with("UNMANNED", () => t("applicability.unmanned"))
            .exhaustive();

    const getTestHazardGroup = (hazardGroup: HazardGroup) =>
        match(hazardGroup)
            .with("GENERIC_HAZARDS", () => t("hazard-group.generic-hazard"))
            .with("TEST_POINT_SPECIFIC_HAZARDS", () => t("hazard-group.test-point-specific-hazards"))
            .exhaustive();

    return { getTestHazardLevel, getTestHazardApplicability, getTestHazardGroup };
};
