import { useMemo } from "react";
import { createFormControl, datetime, multiselect, object, select, string } from "@voloiq/form";
import { useGetAircraftTypes } from "../../api-hooks/useBatteryManagementAircraftTypeService";
import { useResourcesTranslation } from "../../translations/useResourcesTranslation";

export const useEsuTypeCreateForm = () => {
    const { t } = useResourcesTranslation();
    const { data: aircraftTypes } = useGetAircraftTypes(1);

    const createEsuTypeSchema = useMemo(
        () =>
            object({
                name: string().required(t("generic.required error")).label(t("esu-type.model.name")),
                validFrom: datetime().required(t("generic.required error")).label(t("esu-type.model.validFrom")),
                validTo: datetime().label(t("esu-type.model.validTo")),
                chargingMode: select<"manual" | "automatic">({
                    placeholder: t("generic.dropdown placeholder"),
                    options: [
                        { value: "manual", label: t("esu-type.model.chargingMode.manual") },
                        { value: "automatic", label: t("esu-type.model.chargingMode.automatic") },
                    ],
                    errorMessage: t("generic.dropdown error"),
                })
                    .required(t("generic.required error"))
                    .label(t("esu-type.model.chargingMode.label")),
                aircraftTypes: multiselect({
                    placeholder: t("generic.dropdown placeholder"),
                    options: aircraftTypes.map((aircraftType) => ({
                        label: aircraftType.name,
                        value: aircraftType.id.toString(),
                    })),
                    errorMessage: t("generic.dropdown error"),
                })
                    .required(t("generic.required error"))
                    .label(t("esu-type.model.aircraftTypes")),
            }),
        [t, aircraftTypes]
    );
    const FormControl = createFormControl<typeof createEsuTypeSchema>();
    return { FormControl, createEsuTypeSchema };
};
