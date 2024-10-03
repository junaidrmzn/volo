import { useMemo } from "react";
import type { FieldName } from "@voloiq/form";
import { boolean, createFormControl, datetime, object, string } from "@voloiq/form";
import type { ResourcesTranslationFunction } from "../../translations/useCrewApiTranslation";
import { useCrewApiTranslation } from "../../translations/useCrewApiTranslation";

const editCrewRoleSchemaFactory = (t: ResourcesTranslationFunction) =>
    object({
        roleKey: string().required(t("generic.required error")).label(t("crewRole.model.roleKey")),
        description: string().max(300, t("generic.maxLength error")).label(t("crewRole.model.description")),
        requiresAircraftType: boolean().label(t("crewRole.model.requiresAircraftType")),
        requiresWeight: boolean().label(t("crewRole.model.requiresWeight")),
        requiresLicense: boolean().label(t("crewRole.model.requiresLicense")),
        canBecomePilotInCharge: boolean().label(t("crewRole.model.canBecomePilotInCharge")),
        createdBy: string().label(t("crewRole.model.createdBy")),
        updatedBy: string().label(t("crewRole.model.updatedBy")),
        validFrom: datetime().required(t("generic.required error")).label(t("crewRole.model.validFrom")),
        validTo: datetime().label(t("crewRole.model.validTo")),
    });

type EditCrewRoleSchema = ReturnType<typeof editCrewRoleSchemaFactory>;

export const useCrewRoleEditForm = () => {
    const { t } = useCrewApiTranslation();

    const editCrewRoleSchema = useMemo(() => editCrewRoleSchemaFactory(t), [t]);

    const isEditCrewRoleFieldName = (attribute: unknown): attribute is FieldName<EditCrewRoleSchema> =>
        Object.keys(editCrewRoleSchema.describe().fields).includes(attribute as FieldName<EditCrewRoleSchema>);

    const FormControl = createFormControl<typeof editCrewRoleSchema>();
    return { FormControl, editCrewRoleSchema, isEditCrewRoleFieldName };
};
