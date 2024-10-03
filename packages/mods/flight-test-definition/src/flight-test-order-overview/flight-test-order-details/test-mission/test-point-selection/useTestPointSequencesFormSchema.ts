import { useMemo } from "react";
import { fileToBase64 } from "@voloiq/flight-test-definition-utils";
import { object, string, textEditor } from "@voloiq/form";
import { useTestPointSelectionTranslation } from "./translations/useTestPointSelectionTranslation";

export const useTestPointSequencesFormSchema = () => {
    const { t } = useTestPointSelectionTranslation();

    const formSchema = useMemo(
        () =>
            object({
                type: string().label(t("Type")).default(""),
                testPoint: textEditor({ createImageSource: fileToBase64 }).label(t("Test Point")).default(""),
                successCriteria: textEditor({ createImageSource: fileToBase64 })
                    .label(t("Success Criteria"))
                    .default(""),
            }),
        [t]
    );

    return { formSchema };
};

export type TestPointSequencesFormSchema = ReturnType<typeof useTestPointSequencesFormSchema>["formSchema"];
