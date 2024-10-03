import { useMemo } from "react";
import { fileToBase64 } from "@voloiq/flight-test-definition-utils";
import { object, textEditor } from "@voloiq/form";
import { useSpecialCommentsTranslation } from "./translations/useSpecialCommentsTranslation";

export const useSpecialCommentFormSchema = () => {
    const { t } = useSpecialCommentsTranslation();
    const specialCommentFormSchema = useMemo(
        () =>
            object({
                comment: textEditor({ createImageSource: fileToBase64 }).required().label(t("Comment")),
            }),
        [t]
    );
    return { specialCommentFormSchema };
};

export type SpecialCommentFormSchema = ReturnType<typeof useSpecialCommentFormSchema>["specialCommentFormSchema"];
