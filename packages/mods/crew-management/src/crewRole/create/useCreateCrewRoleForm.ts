import { useMemo } from "react";
import type { FieldName } from "@voloiq/form";
import { boolean, createFormControl, object, string } from "@voloiq/form";
import type { ResourcesTranslationFunction } from "../../translations/useCrewApiTranslation";
import { useCrewApiTranslation } from "../../translations/useCrewApiTranslation";

const createCrewRoleSchemaFactory = (t: ResourcesTranslationFunction) =>
    object({
        roleKey: string()
            .required(t("generic.required error"))
            .max(5, t("generic.maxLength error"))
            .min(1, t("generic.minLength error"))
            .label(t("crewRole.model.roleKey")),
        description: string().max(300, t("generic.maxLength error")).label(t("crewRole.model.description")),
        requiresAircraftType: boolean().label(t("crewRole.model.requiresAircraftType")),
        requiresWeight: boolean().label(t("crewRole.model.requiresWeight")),
        requiresLicense: boolean().label(t("crewRole.model.requiresLicense")),
        canBecomePilotInCharge: boolean().label(t("crewRole.model.canBecomePilotInCharge")),
    });

type CreateCrewRoleSchema = ReturnType<typeof createCrewRoleSchemaFactory>;

export const useCrewRoleCreateForm = () => {
    const { t } = useCrewApiTranslation();
    const createCrewRoleSchema = useMemo(() => createCrewRoleSchemaFactory(t), [t]);
    const isCreateCrewRoleFieldName = (attribute: unknown): attribute is FieldName<CreateCrewRoleSchema> =>
        // eslint-disable-next-line @typescript-eslint/no-unnecessary-type-assertion
        Object.keys(createCrewRoleSchema.describe().fields).includes(attribute as FieldName<CreateCrewRoleSchema>);
    const FormControl = createFormControl<typeof createCrewRoleSchema>();
    return { FormControl, createCrewRoleSchema, isCreateCrewRoleFieldName };
};
