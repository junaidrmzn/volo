import { useMemo } from "react";
import type { FieldName } from "@voloiq/form";
import { array, createFormControl, datetime, object, string } from "@voloiq/form";
import type { Region } from "@voloiq/vertiport-management-api/v1";
import type { ResourcesTranslationFunction } from "../../translations/useVertiportTranslation";
import { useVertiportTranslation } from "../../translations/useVertiportTranslation";

const editRegionSchemaFactory = (t: ResourcesTranslationFunction) =>
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
    });

type EditRegionSchema = ReturnType<typeof editRegionSchemaFactory>;

export const useRegionEditForm = (region: Region) => {
    const { t } = useVertiportTranslation();

    const editRegionSchema = useMemo(() => editRegionSchemaFactory(t), [t]);

    const isRegionFieldName = (attribute: unknown): attribute is FieldName<EditRegionSchema> =>
        Object.keys(editRegionSchema.describe().fields).includes(attribute as FieldName<EditRegionSchema>);

    const regionInitialValues = {
        ...region,
        validFrom: region?.validFrom ? new Date(region?.validFrom) : undefined,
        validTo: region?.validTo ? new Date(region?.validTo) : undefined,
        publicFrom: region?.publicFrom ? new Date(region?.publicFrom) : undefined,
        publicTo: region?.publicTo ? new Date(region?.publicTo) : undefined,
        coordinates: region?.coordinates.points,
    };

    const FormControl = createFormControl<typeof editRegionSchema>();
    return { FormControl, regionInitialValues, editRegionSchema, isRegionFieldName, version: region.version };
};
