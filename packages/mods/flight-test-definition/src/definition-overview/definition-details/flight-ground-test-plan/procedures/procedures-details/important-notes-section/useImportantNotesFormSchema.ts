import { useMemo } from "react";
import { fileToBase64 } from "@voloiq/flight-test-definition-utils";
import { object, string, textEditor } from "@voloiq/form";
import { useImportantNotesSectionTranslation } from "./translations/useImportantNotesTranslation";

export const useImportantNotesFormSchema = () => {
    const { t } = useImportantNotesSectionTranslation();

    const formSchema = useMemo(
        () =>
            object({
                title: string().required().label(t("Title")),
                note: textEditor({ createImageSource: fileToBase64 }).required().label(t("Description")),
            }),
        [t]
    );

    return { formSchema };
};

export type ImportantNotesFormSchema = ReturnType<typeof useImportantNotesFormSchema>["formSchema"];
