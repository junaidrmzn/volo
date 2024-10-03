import type { HazardApplicability, HazardGroup, RiskLevel } from "@voloiq/flight-test-definition-api/v1";
import { object, select, string } from "@voloiq/form";
import { useBulkCreateTestHazardAssessmentTranslations } from "./translations/useBulkCreateTestHazardAssessmentTranslations";

type SelectOptionsType<T> = {
    label: string;
    value: T;
};

const RiskLevelOptions: SelectOptionsType<RiskLevel>[] = [
    { label: "Low", value: "LOW" },
    { label: "Medium", value: "MEDIUM" },
    { label: "High", value: "HIGH" },
    { label: "Very High", value: "VERY_HIGH" },
];

const ApplicabilityOptions: SelectOptionsType<HazardApplicability>[] = [
    { label: "Manned", value: "MANNED" },
    { label: "Unmanned", value: "UNMANNED" },
];

const HazardGroupOptions: SelectOptionsType<HazardGroup>[] = [
    { label: "Generic Hazards", value: "GENERIC_HAZARDS" },
    { label: "Test Point Specific Hazards", value: "TEST_POINT_SPECIFIC_HAZARDS" },
];

export const useTestHazardAssessmentFormSchema = () => {
    const { t } = useBulkCreateTestHazardAssessmentTranslations();

    const sharedSelectProps = {
        placeholder: t("form.select.placeholder"),
        errorMessage: t("form.select.requiredErrorMessage"),
    };

    return object({
        hazard: string().required().label(t("form.hazard-title")),
        preMitigationRiskLevel: select({
            options: RiskLevelOptions,
            ...sharedSelectProps,
        })
            .required()
            .label(t("form.preMitigationRiskLevel")),
        residualRiskLevel: select({
            options: RiskLevelOptions,
            ...sharedSelectProps,
        })
            .required()
            .label(t("form.residualRiskLevel")),
        hazardGroup: select({
            options: HazardGroupOptions,
            ...sharedSelectProps,
        })
            .required()
            .label(t("form.hazardGroup")),
        applicability: select({
            options: ApplicabilityOptions,
            ...sharedSelectProps,
        })
            .required()
            .label(t("form.applicability")),
    });
};

export type TestHazardAssessmentFormSchema = ReturnType<typeof useTestHazardAssessmentFormSchema>;
