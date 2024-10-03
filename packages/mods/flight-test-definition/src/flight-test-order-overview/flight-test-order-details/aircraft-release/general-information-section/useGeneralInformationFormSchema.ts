import { useMemo } from "react";
import { fileToBase64 } from "@voloiq/flight-test-definition-utils";
import { object, textEditor } from "@voloiq/form";
import { useGeneralInformationSectionTranslation } from "./translations/useGeneralInformationSectionTranslation";

export const useGeneralInformationFormSchema = () => {
    const { t } = useGeneralInformationSectionTranslation();

    const formSchema = useMemo(
        () =>
            object({
                temporaryLimitationsAircraftConfiguration: textEditor({ createImageSource: fileToBase64 }).label(
                    t("Temporary Limitations due to Aircraft Configuration")
                ),
                referenceSubstantiation: textEditor({ createImageSource: fileToBase64 }).label(
                    t("Reference / Substantiation")
                ),
            }),
        [t]
    );

    return { formSchema };
};
