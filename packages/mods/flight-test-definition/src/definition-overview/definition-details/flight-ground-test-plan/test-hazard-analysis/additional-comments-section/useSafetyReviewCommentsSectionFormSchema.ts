import { useMemo } from "react";
import { fileToBase64 } from "@voloiq/flight-test-definition-utils";
import { object, textEditor } from "@voloiq/form";
import { useSafetyReviewCommentsTranslation } from "./translations/useSafetyReviewCommentsTranslation";

export const useSafetyReviewCommentsFormSchema = () => {
    const { t } = useSafetyReviewCommentsTranslation();

    const formSchema = useMemo(
        () =>
            object({
                additionalComments: textEditor({ createImageSource: fileToBase64 }).label(t("Additional Comments")),
            }),
        [t]
    );

    return { formSchema };
};
