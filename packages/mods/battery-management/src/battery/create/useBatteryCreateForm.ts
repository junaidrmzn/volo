import { BatStatus, FlightPermits, TechnicalStatus } from "@voloiq-typescript-api/battery-management-types";
import { useMemo } from "react";
import { createFormControl, datetime, number, object, select, string } from "@voloiq/form";
import { useGetEsuTypes } from "../../api-hooks/useEsuTypeService";
import { useGetLocations } from "../../api-hooks/useLocationService";
import { useResourcesTranslation } from "../../translations/useResourcesTranslation";

export const useBatteryCreateForm = () => {
    const { t } = useResourcesTranslation();
    const { data: esuTypes } = useGetEsuTypes(1);
    const { data: locations } = useGetLocations(1);
    const createBatterySchema = useMemo(
        () =>
            object({
                name: string().required(t("generic.required error")).label(t("battery.model.name")),
                validFrom: datetime().required(t("generic.required error")).label(t("battery.model.validFrom")),
                validTo: datetime().label(t("battery.model.validTo")),
                actStatus: select<BatStatus>({
                    placeholder: t("generic.dropdown placeholder"),
                    options: Object.values(BatStatus).map((batStatus) => ({
                        // @ts-ignore
                        label: t(`battery.status.${batStatus.toLocaleLowerCase()}`),
                        value: BatStatus[batStatus],
                    })),
                    errorMessage: t("generic.dropdown error"),
                })
                    .required(t("generic.required error"))
                    .label(t("battery.model.actstatus")),
                flightPermits: select<FlightPermits>({
                    placeholder: t("generic.dropdown placeholder"),
                    options: Object.values(FlightPermits).map((flightPermit) => ({
                        // @ts-ignore
                        label: t(`battery.flightPermits.${flightPermit.toLocaleLowerCase()}`),
                        value: FlightPermits[flightPermit],
                    })),
                    errorMessage: t("generic.dropdown error"),
                })
                    .required(t("generic.required error"))
                    .label(t("battery.model.flightpermits")),
                location: select({
                    placeholder: t("generic.dropdown placeholder"),
                    options: locations.map((location) => ({
                        label: location.name,
                        value: location.id.toString(),
                    })),
                    errorMessage: t("generic.dropdown error"),
                })
                    .required(t("generic.required error"))
                    .label(t("battery.model.location")),
                technicalStatus: select<TechnicalStatus>({
                    placeholder: t("generic.dropdown placeholder"),
                    options: Object.values(TechnicalStatus).map((technicalStatus) => ({
                        // @ts-ignore
                        label: t(`battery.technicalStatus.${technicalStatus.toLocaleLowerCase()}`),
                        value: TechnicalStatus[technicalStatus],
                    })),
                    errorMessage: t("generic.dropdown error"),
                })
                    .required(t("generic.required error"))
                    .label(t("battery.model.technicalStatus")),
                batteryType: select({
                    placeholder: t("generic.dropdown placeholder"),
                    options: esuTypes.map((esuType) => ({
                        label: esuType.name,
                        value: esuType.id.toString(),
                    })),
                    errorMessage: t("generic.dropdown error"),
                })
                    .required(t("generic.required error"))
                    .label(t("battery.model.batterytypeid")),
                maxCellVoltage: number().required(t("generic.required error")).label(t("battery.model.maxcellvoltage")),
                minCellVoltage: number().required(t("generic.required error")).label(t("battery.model.mincellvoltage")),
                nrEsu: number().required(t("generic.required error")).label(t("battery.model.numberofesus")),
                nrChargingCycles: number()
                    .required(t("generic.required error"))
                    .label(t("battery.model.nrchargingcycles")),
                nrUsageCycles: number().required(t("generic.required error")).label(t("battery.model.nrusagecycles")),
                weight: number().required(t("generic.required error")).label(t("battery.model.weight")),
                firstUsageTime: datetime()
                    .required(t("generic.required error"))
                    .label(t("battery.model.firstusagetime")),
                lastChargeTime: datetime()
                    .required(t("generic.required error"))
                    .label(t("battery.model.lastchargetime")),
                maxChargingTime: number()
                    .required(t("generic.required error"))
                    .label(t("battery.model.maxchargingtime")),
            }),
        [t, locations, esuTypes]
    );
    const FormControl = createFormControl<typeof createBatterySchema>();
    return { FormControl, createBatterySchema };
};
