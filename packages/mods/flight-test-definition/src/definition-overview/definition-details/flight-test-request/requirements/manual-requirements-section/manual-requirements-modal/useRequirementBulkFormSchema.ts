import { useMemo } from "react";
import { fileToBase64 } from "@voloiq/flight-test-definition-utils";
import { object, string, textEditor } from "@voloiq/form";
import { useManualRequirementsModalTranslation } from "./translations/useManualRequirementsModalTranslation";

export const useRequirementBulkFormSchema = () => {
    const { t } = useManualRequirementsModalTranslation();
    const requirementsBulkFormSchema = useMemo(
        () =>
            object({
                title: string().required().label(t("Title")),
                description: textEditor({ createImageSource: fileToBase64 }).required().label(t("Description")),
                passOrFailCriteria: textEditor({ createImageSource: fileToBase64 }).label(t("Pass / Fail Criteria")),
            }),
        [t]
    );
    return { requirementsBulkFormSchema };
};

export type RequirementsBulkFormSchema = ReturnType<typeof useRequirementBulkFormSchema>["requirementsBulkFormSchema"];
