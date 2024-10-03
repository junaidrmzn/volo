import { ChargingStationStatus } from "@voloiq-typescript-api/battery-management-types";
import type { Vertiport } from "@voloiq-typescript-api/battery-management-types";
import { datetime, number, object, select, string } from "@voloiq/form";
import { useResourcesTranslation } from "../../translations/useResourcesTranslation";

type UseChargingStationFormSchemaProps = {
    vertiports?: Vertiport[];
};

export const useChargingStationFormSchema = (props: UseChargingStationFormSchemaProps) => {
    const { vertiports = [] } = props;
    const { t } = useResourcesTranslation();

    return object({
        name: string().required(t("generic.required error")).label(t("charging-station.model.name")),
        validFrom: datetime().required(t("generic.required error")).label(t("charging-station.model.validFrom")),
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
        facilityId: string().required(t("generic.required error")).label(t("charging-station.model.facilityId")),
        edgeDeviceId: string().required(t("generic.required error")).label(t("charging-station.model.edgeDeviceId")),
        transferTimeVtol: number()
            .required(t("generic.required error"))
            .label(t("charging-station.model.transferTimeVtol"))
            .min(2, t("charging-station.model.transferTimeVtolTooLow")),
        transferTimeStorage: number()
            .required(t("generic.required error"))
            .label(t("charging-station.model.transferTimeStorage"))
            .min(2, t("charging-station.model.transferTimeStorageTooLow")),
        maxPower: number()
            .required(t("generic.required error"))
            .label(t("charging-station.model.maxPower"))
            .min(0, t("charging-station.edit.maxPower-negative")),
        nrSlots: number()
            .required(t("generic.required error"))
            .label(t("charging-station.model.nrSlots"))
            .min(0, t("charging-station.edit.nrSlots-negative")),
    });
};
