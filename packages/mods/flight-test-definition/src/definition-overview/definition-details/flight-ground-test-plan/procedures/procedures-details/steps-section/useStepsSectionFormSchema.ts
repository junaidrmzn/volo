import { useMemo } from "react";
import { fileToBase64 } from "@voloiq/flight-test-definition-utils";
import { object, textEditor } from "@voloiq/form";
import { useStepsSectionTranslation } from "./translations/useStepsSectionTranslation";

export const useStepsSectionFormSchema = () => {
    const { t } = useStepsSectionTranslation();

    const formSchema = useMemo(
        () =>
            object({
                stepSetup: textEditor({ createImageSource: fileToBase64 }).label(t("Setup")),
                stepProcedure: textEditor({ createImageSource: fileToBase64 }).label(t("Procedure")),
                stepRecovery: textEditor({ createImageSource: fileToBase64 }).label(t("Recovery")),
            }),
        [t]
    );

    return { formSchema };
};

export type StepsFormSchema = ReturnType<typeof useStepsSectionFormSchema>["formSchema"];
