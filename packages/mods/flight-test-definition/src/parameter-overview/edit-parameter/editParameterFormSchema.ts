import { object, string } from "@voloiq/form";
import type { EditParameterTranslationFunction } from "./translations/useEditParameterTranslation";

export type EditParameterFormSchemaOptions = {
    t: EditParameterTranslationFunction;
};
export const editParameterFormSchema = (options: EditParameterFormSchemaOptions) => {
    const { t } = options;

    return object({
        name: string().required().label(t("Name")),
        unit: string().required().label(t("Unit")),
        acronym: string().required().label(t("Acronym")),
    });
};

export type EditParameterFormSchema = ReturnType<typeof editParameterFormSchema>;
