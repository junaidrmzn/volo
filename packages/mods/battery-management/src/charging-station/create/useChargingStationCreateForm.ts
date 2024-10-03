import { ChargingStationStatus } from "@voloiq-typescript-api/battery-management-types";
import { useMemo } from "react";
import { createFormControl, datetime, number, object, select, string } from "@voloiq/form";
import { useGetAllVertiportWithinValidity } from "../../api-hooks/useVertiportService";
import { useResourcesTranslation } from "../../translations/useResourcesTranslation";

export const useChargingStationCreateForm = () => {
    const { t } = useResourcesTranslation();
    const { data: vertiports } = useGetAllVertiportWithinValidity();

    const createChargingStationSchema = useMemo(
        () =>
            object({
                name: string().required(t("generic.required error")).label(t("charging-station.model.name")),
                validFrom: datetime()
                    .required(t("generic.required error"))
                    .label(t("charging-station.model.validFrom")),
                validTo: datetime().label(t("charging-station.model.validTo")),
                chargingStationStatus: select<ChargingStationStatus>({
                    placeholder: t("generic.dropdown placeholder"),
                    options: Object.values(ChargingStationStatus).map((chargingStationStatus) => ({
                        // @ts-ignore
                        label: t(`charging-station.status.${chargingStationStatus.toLocaleLowerCase()}`),
                        value: ChargingStationStatus[chargingStationStatus],
                    })),
                    errorMessage: t("generic.dropdown error"),
                })
                    .required(t("generic.required error"))
                    .label(t("charging-station.model.status")),
                vertiport: select({
                    placeholder: t("generic.dropdown placeholder"),
                    options: vertiports.map((vertiport) => ({
                        label: vertiport.name,
                        value: vertiport.id.toString(),
                    })),
                    errorMessage: t("generic.dropdown error"),
                })
                    .required(t("generic.required error"))
                    .label(t("charging-station.model.vertiport")),
                facilityId: string()
                    .required(t("generic.required error"))
                    .label(t("charging-station.model.facilityId")),
                edgeDeviceId: string()
                    .required(t("generic.required error"))
                    .label(t("charging-station.model.edgeDeviceId")),
                transferTimeVtol: number()
                    .required(t("generic.required error"))
                    .label(t("charging-station.model.transferTimeVtol"))
                    .min(2, t("charging-station.model.transferTimeVtolTooLow")),
                transferTimeStorage: number()
                    .required(t("generic.required error"))
                    .label(t("charging-station.model.transferTimeStorage"))
                    .min(2, t("charging-station.model.transferTimeStorageTooLow")),
                maxPower: number().required(t("generic.required error")).label(t("charging-station.model.maxPower")),
                nrSlots: number().required(t("generic.required error")).label(t("charging-station.model.nrSlots")),
            }),

        [t, vertiports]
    );
    const FormControl = createFormControl<typeof createChargingStationSchema>();
    return { FormControl, createChargingStationSchema };
};
