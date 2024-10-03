import { object, string } from "@voloiq/form";
import type { AddParameterTranslationFunction } from "./translations/useAddParameterTranslation";

export type AddParameterFormSchemaOptions = {
    t: AddParameterTranslationFunction;
};
export const addParameterFormSchema = (options: AddParameterFormSchemaOptions) => {
    const { t } = options;

    return object({
        name: string().required().label(t("Name")),
        unit: string().required().label(t("Unit")),
        acronym: string().required().label(t("Acronym")),
    });
};

export type AddParameterFormSchema = ReturnType<typeof addParameterFormSchema>;
