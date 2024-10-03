import { useMemo } from "react";
import { fileToBase64 } from "@voloiq/flight-test-definition-utils";
import { object, textEditor } from "@voloiq/form";
import { useAdditionalInformationTranslation } from "./translations/useAdditionalInformationTranslation";

export const useAdditionalInformationFormSchema = () => {
    const { t } = useAdditionalInformationTranslation();

    const formSchema = useMemo(
        () =>
            object({
                specialEquipment: textEditor({ createImageSource: fileToBase64 }).label(t("Special Equipment")),
                dataAnalysisPlan: textEditor({ createImageSource: fileToBase64 }).label(t("Data Analysis Plan")),
                safetyRecommendations: textEditor({ createImageSource: fileToBase64 }).label(
                    t("Safety Recommendations")
                ),
            }),
        [t]
    );

    return { formSchema };
};
