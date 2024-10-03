import { useMemo } from "react";
import { fileToBase64 } from "@voloiq/flight-test-definition-utils";
import { object, textEditor } from "@voloiq/form";
import { useAdditionalCommentsSectionTranslation } from "./translations/useAdditionalCommentsTranslation";

export const useAdditionalCommentsFormSchema = () => {
    const { t } = useAdditionalCommentsSectionTranslation();

    const formSchema = useMemo(
        () =>
            object({
                comment: textEditor({ createImageSource: fileToBase64 }).required().label(t("Comment")),
            }),
        [t]
    );

    return { formSchema };
};

export type AdditionalCommentsFormSchema = ReturnType<typeof useAdditionalCommentsFormSchema>["formSchema"];
