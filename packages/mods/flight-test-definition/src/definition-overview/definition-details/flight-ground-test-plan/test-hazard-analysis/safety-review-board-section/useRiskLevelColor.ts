import { TagProps } from "@volocopter/design-library-react";
import { match } from "ts-pattern";
import { RiskLevel } from "@voloiq/flight-test-definition-api/v1";

export const riskLevelKeys: Readonly<RiskLevel[]> = ["VERY_HIGH", "HIGH", "MEDIUM", "LOW"] as const;
export type RiskLevelKey = typeof riskLevelKeys[number];

const getRiskLevelDotColor = (riskLevelKey: RiskLevelKey) =>
    match(riskLevelKey)
        .with("VERY_HIGH", () => "semanticUnknownBasic")
        .with("HIGH", () => "semanticErrorBasic")
        .with("MEDIUM", () => "semanticWarningBasic")
        .with("LOW", () => "semanticSuccessBasic")
        .exhaustive();

const getRiskLevelTagColor = (riskLevelKey: RiskLevelKey): TagProps["colorScheme"] => {
    switch (riskLevelKey) {
        case "VERY_HIGH":
            return "base-subtle";
        case "HIGH":
            return "error-subtle";
        case "MEDIUM":
            return "warning-subtle";
        case "LOW":
            return "success-subtle";
        default:
            return undefined;
    }
};

export const useRiskLevelColor = () => {
    return { getRiskLevelDotColor, getRiskLevelTagColor };
};
