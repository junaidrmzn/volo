import { useMemo } from "react";
import type { SafetyLevel } from "@voloiq/flight-test-definition-api/v1";
import { fileToBase64 } from "@voloiq/flight-test-definition-utils";
import type { SelectOption } from "@voloiq/form";
import { object, select, textEditor } from "@voloiq/form";
import { useGeneralSectionTranslation } from "./translations/useGeneralSectionTranslation";

export const useGeneralSectionFormSchema = () => {
    const { t } = useGeneralSectionTranslation();

    const formSchema = useMemo(() => {
        const safetyApprovalLevelOptions: SelectOption<SafetyLevel>[] = [
            {
                label: t("Low"),
                value: "LOW",
            },
            {
                label: t("Medium"),
                value: "MEDIUM",
            },
            {
                label: t("High"),
                value: "HIGH",
            },
        ];

        return object({
            safetyApprovalLevel: select<SafetyLevel>({
                options: safetyApprovalLevelOptions,
                placeholder: " ",
                errorMessage: t("Please select a valid safety approval category"),
            }).label(t("Safety Approval")),
            objectives: textEditor({ createImageSource: fileToBase64 }).label(t("Objectives")),
            prerequisites: textEditor({ createImageSource: fileToBase64 }).label(t("Prerequisites")),
            passFailCriteria: textEditor({ createImageSource: fileToBase64 }).label(t("Pass/Fail Criteria")),
        });
    }, [t]);

    return { formSchema };
};
