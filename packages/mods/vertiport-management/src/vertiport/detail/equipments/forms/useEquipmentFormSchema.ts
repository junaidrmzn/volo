import { useMemo } from "react";
import { datetime, object, string } from "@voloiq/form";
import { useVertiportTranslation } from "../../../../translations/useVertiportTranslation";

export const useEquipmentFormSchema = () => {
    const { t } = useVertiportTranslation();
    const equipmentsFormSchema = useMemo(
        () =>
            object({
                deviceId: string().required(t("generic.required error")).label(t("equipment.model.deviceId")),
                name: string().required(t("generic.required error")).label(t("equipment.model.name")),
                location: string().required(t("generic.required error")).label(t("equipment.model.location")),
                validFrom: datetime().required(t("generic.required error")).label(t("equipment.model.validFrom")),
                validTo: datetime().label(t("equipment.model.validTo")),
            }),
        [t]
    );
    return { equipmentsFormSchema };
};

export type EquipmentFormSchema = ReturnType<typeof useEquipmentFormSchema>["equipmentsFormSchema"];
