import { useMemo } from "react";
import { fileToBase64 } from "@voloiq/flight-test-definition-utils";
import { object, textEditor } from "@voloiq/form";
import { useTolerancesSectionTranslation } from "./translations/useTolerancesSectionTranslation";

export const useTolerancesSectionFormSchema = () => {
    const { t } = useTolerancesSectionTranslation();

    const formSchema = useMemo(
        () =>
            object({
                testPointTolerance: textEditor({ createImageSource: fileToBase64 }).label(t("Tolerance")),
            }),
        [t]
    );

    return { formSchema };
};
