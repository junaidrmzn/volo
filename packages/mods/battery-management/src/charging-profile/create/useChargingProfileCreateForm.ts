import { ChargingType } from "@voloiq-typescript-api/battery-management-types";
import { useMemo } from "react";
import { createFormControl, datetime, number, object, select, string } from "@voloiq/form";
import { useResourcesTranslation } from "../../translations/useResourcesTranslation";

export const useChargingProfileCreateForm = () => {
    const { t } = useResourcesTranslation();
    const createChargingProfileSchema = useMemo(
        () =>
            object({
                name: string().required(t("generic.required error")).label(t("charging-profile.model.name")),
                validFrom: datetime()
                    .required(t("generic.required error"))
                    .label(t("charging-profile.model.validFrom")),
                validTo: datetime().label(t("charging-profile.model.validTo")),
                currentCharMax: number()
                    .required(t("generic.required error"))
                    .label(t("charging-profile.model.currentCharMax")),
                currentCharMin: number()
                    .required(t("generic.required error"))
                    .label(t("charging-profile.model.currentCharMin")),
                currentDiscMax: number()
                    .required(t("generic.required error"))
                    .label(t("charging-profile.model.currentDiscMax")),
                currentDiscMin: number()
                    .required(t("generic.required error"))
                    .label(t("charging-profile.model.currentDiscMin")),
                voltageCellBal: number()
                    .required(t("generic.required error"))
                    .label(t("charging-profile.model.voltageCellBal")),
                voltageCellMax: number()
                    .required(t("generic.required error"))
                    .label(t("charging-profile.model.voltageCellMax")),
                voltageCellHigh: number()
                    .required(t("generic.required error"))
                    .label(t("charging-profile.model.voltageCellHigh")),
                voltageCellLow: number()
                    .required(t("generic.required error"))
                    .label(t("charging-profile.model.voltageCellLow")),
                voltageCellMin: number()
                    .required(t("generic.required error"))
                    .label(t("charging-profile.model.voltageCellMin")),
                tempCellMax: number()
                    .required(t("generic.required error"))
                    .label(t("charging-profile.model.tempCellMax")),
                tempCellHigh: number()
                    .required(t("generic.required error"))
                    .label(t("charging-profile.model.tempCellHigh")),
                tempCellLow: number()
                    .required(t("generic.required error"))
                    .label(t("charging-profile.model.tempCellLow")),
                tempCellMin: number()
                    .required(t("generic.required error"))
                    .label(t("charging-profile.model.tempCellMin")),
                chargingType: select<ChargingType>({
                    placeholder: t("generic.dropdown placeholder"),
                    options: Object.values(ChargingType).map((chargingType) => ({
                        label: chargingType,
                        value: ChargingType[chargingType],
                    })),
                    errorMessage: t("generic.dropdown error"),
                })
                    .required(t("generic.required error"))
                    .label(t("charging-profile.model.chargingType")),
            }),
        [t]
    );
    const FormControl = createFormControl<typeof createChargingProfileSchema>();
    return { FormControl, createChargingProfileSchema };
};
