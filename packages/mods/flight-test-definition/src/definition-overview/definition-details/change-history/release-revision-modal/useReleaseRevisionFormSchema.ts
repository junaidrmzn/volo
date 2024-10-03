import { fileToBase64 } from "@voloiq/flight-test-definition-utils";
import { date, object, string, textEditor } from "@voloiq/form";

export const useReleaseRevisionFormSchema = () => {
    return object({
        revision: string().required().label("Rev"),
        date: date().required().label("Date"),
        revisionDescription: textEditor({ createImageSource: fileToBase64 }).required().label("Revision Description"),
    });
};

export type ReleaseRevisionFormSchema = ReturnType<typeof useReleaseRevisionFormSchema>;
