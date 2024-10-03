import { match } from "ts-pattern";
import { useTestPointCardTranslation } from "./translations/useTestPointCardTranslation";

export const allApplicabilities = ["DEVELOPMENT", "CERTIFICATION", "AGENCY", "BUILD_UP", "UNASSIGNED"] as const;
export type Applicability = typeof allApplicabilities[number];

export const useGetApplicabilityAbbreviation = () => {
    const { t } = useTestPointCardTranslation();

    const getApplicabilityAbbreviation = (applicability: Applicability) =>
        match(applicability)
            .with("AGENCY", () => t("Agency"))
            .with("BUILD_UP", () => t("Build Up"))
            .with("CERTIFICATION", () => t("Certification"))
            .with("DEVELOPMENT", () => t("Development"))
            .with("UNASSIGNED", () => t("Unassigned"))
            .exhaustive()
            .charAt(0);

    return { getApplicabilityAbbreviation };
};
