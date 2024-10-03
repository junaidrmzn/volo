import { ChargingStationSlotStatus } from "@voloiq-typescript-api/battery-management-types";
import { useMemo } from "react";
import { createFormControl, datetime, multiselect, number, object, select, string } from "@voloiq/form";
import { useGetChargingStations } from "../../api-hooks/useChargingStationService";
import { useGetEsuTypes } from "../../api-hooks/useEsuTypeService";
import { useResourcesTranslation } from "../../translations/useResourcesTranslation";

export const useChargingStationSlotCreateForm = () => {
    const { t } = useResourcesTranslation();
    const { data: esuTypes } = useGetEsuTypes(1, 100);
    const { data: chargingStations } = useGetChargingStations();

    const createChargingStationSlotSchema = useMemo(
        () =>
            object({
                name: string().required(t("generic.required error")).label(t("charging-station-slot.model.name")),
                validFrom: datetime()
                    .required(t("generic.required error"))
                    .label(t("charging-station-slot.model.validFrom")),
                validTo: datetime().label(t("charging-station-slot.model.validTo")),
                chargingStationSlotStatus: select<ChargingStationSlotStatus>({
                    placeholder: t("generic.dropdown placeholder"),
                    options: Object.values(ChargingStationSlotStatus).map((chargingStationSlotStatus) => ({
                        // @ts-ignore
                        label: t(`charging-station-slot.status.${chargingStationSlotStatus.toLocaleLowerCase()}`),
                        value: ChargingStationSlotStatus[chargingStationSlotStatus],
                    })),
                    errorMessage: t("generic.dropdown error"),
                })
                    .required(t("generic.required error"))
                    .label(t("charging-station-slot.model.status")),
                nrChargeEsu: number()
                    .required(t("generic.required error"))
                    .label(t("charging-station-slot.model.max-number-esus-charged-parallel"))
                    .min(1, t("charging-station-slot.model.minimal-number-error-esus-parallel")),
                slotNumber: number()
                    .required(t("generic.required error"))
                    .label(t("charging-station-slot.model.charging-station-slot-unique-number")),
                supportedEsuTypes: multiselect({
                    placeholder: t("generic.dropdown placeholder"),
                    options: esuTypes.map((esuType) => ({
                        label: esuType.name,
                        value: esuType.id.toString(),
                    })),
                    errorMessage: t("generic.dropdown error"),
                })
                    .required(t("generic.required error"))
                    .label(t("esu.model.type")),
                chargingStation: select({
                    placeholder: t("generic.dropdown placeholder"),
                    options: chargingStations.map((chargingStation) => ({
                        label: chargingStation.name,
                        value: chargingStation.id.toString(),
                    })),
                    errorMessage: t("generic.dropdown error"),
                })
                    .required(t("generic.required error"))
                    .label(t("charging-station-slot.model.charging-station")),
            }),

        [chargingStations, esuTypes, t]
    );
    const FormControl = createFormControl<typeof createChargingStationSlotSchema>();
    return { FormControl, createChargingStationSlotSchema };
};
