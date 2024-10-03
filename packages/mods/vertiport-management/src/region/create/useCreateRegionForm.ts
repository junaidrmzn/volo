import { useMemo } from "react";
import type { FieldName } from "@voloiq/form";
import { array, createFormControl, datetime, number, object, string } from "@voloiq/form";
import type { ResourcesTranslationFunction } from "../../translations/useVertiportTranslation";
import { useVertiportTranslation } from "../../translations/useVertiportTranslation";

const createRegionSchemaFactory = (t: ResourcesTranslationFunction) =>
    object({
        name: string()
            .required(t("generic.required error"))
            .max(200, t("generic.maxLength error"))
            .min(3, t("generic.minLength error"))
            .label(t("region.model.name")),
        validFrom: datetime().required(t("generic.required error")).label(t("region.model.validFrom")),
        validTo: datetime().label(t("region.model.validTo")),
        publicFrom: datetime().label(t("region.model.publicFrom")),
        publicTo: datetime().label(t("region.model.publicTo")),
        coordinates: array(),
        center: number(),
    });

type CreateRegionSchema = ReturnType<typeof createRegionSchemaFactory>;

export const useRegionCreateForm = () => {
    const { t } = useVertiportTranslation();
    const createRegionSchema = useMemo(() => createRegionSchemaFactory(t), [t]);
    const isCreateRegionFieldName = (attribute: unknown): attribute is FieldName<CreateRegionSchema> =>
        Object.keys(createRegionSchema.describe().fields).includes(attribute as FieldName<CreateRegionSchema>);
    const FormControl = createFormControl<typeof createRegionSchema>();
    return { FormControl, createRegionSchema, isCreateRegionFieldName };
};
