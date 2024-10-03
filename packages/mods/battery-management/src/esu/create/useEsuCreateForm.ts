import { EsuStatus, FlightPermits, TechnicalStatus } from "@voloiq-typescript-api/battery-management-types";
import { useMemo } from "react";
import { createFormControl, datetime, number, object, select, string } from "@voloiq/form";
import { useGetBatteries } from "../../api-hooks/useBatteryService";
import { useGetChargingProfiles } from "../../api-hooks/useChargingProfileService";
import { useGetEsuTypes } from "../../api-hooks/useEsuTypeService";
import { useGetLocations } from "../../api-hooks/useLocationService";
import { useResourcesTranslation } from "../../translations/useResourcesTranslation";

export const useEsuCreateForm = () => {
    const { t } = useResourcesTranslation();
    const { data: esuTypes } = useGetEsuTypes(1);
    const { data: chargingProfiles } = useGetChargingProfiles(1);
    const { data: batteries } = useGetBatteries(1);
    const { data: locations } = useGetLocations(1);
    const createEsuSchema = useMemo(
        () =>
            object({
                name: string().required(t("generic.required error")).label(t("esu.model.name")),
                validFrom: datetime().required(t("generic.required error")).label(t("esu.model.validFrom")),
                validTo: datetime().label(t("esu.model.validTo")),
                status: select({
                    placeholder: t("generic.dropdown placeholder"),
                    options: Object.values(EsuStatus).map((esuStatus) => ({
                        // @ts-ignore
                        label: t(`esu.status.${esuStatus.toLocaleLowerCase()}`),
                        value: EsuStatus[esuStatus],
                    })),
                    errorMessage: t("generic.dropdown error"),
                })
                    .required(t("generic.required error"))
                    .label(t("esu.model.status")),
                technicalStatus: select<TechnicalStatus>({
                    placeholder: t("generic.dropdown placeholder"),
                    options: Object.values(TechnicalStatus).map((technicalStatus) => ({
                        // @ts-ignore
                        label: t(`esu.technicalStatus.${technicalStatus.toLocaleLowerCase()}`),
                        value: TechnicalStatus[technicalStatus],
                    })),
                    errorMessage: t("generic.dropdown error"),
                })
                    .required(t("generic.required error"))
                    .label(t("esu.model.technicalStatus")),
                manufacturer: string().required(t("generic.required error")).label(t("esu.model.manufacturer")),
                batch: string().required(t("generic.required error")).label(t("esu.model.batch")),
                serial: string().required(t("generic.required error")).label(t("esu.model.serial")),
                weight: number().required(t("generic.required error")).label(t("esu.model.weight")),
                chargingCycles: number().required(t("generic.required error")).label(t("esu.model.chargingCycles")),
                usageCycles: number().required(t("generic.required error")).label(t("esu.model.usageCycles")),
                position: string().required(t("generic.required error")).label(t("esu.model.position")),
                flightPermits: select<FlightPermits>({
                    placeholder: t("generic.dropdown placeholder"),
                    options: Object.values(FlightPermits).map((flightPermit) => ({
                        // @ts-ignore
                        label: t(`esu.flightPermits.${flightPermit.toLocaleLowerCase()}`),
                        value: FlightPermits[flightPermit],
                    })),
                    errorMessage: t("generic.dropdown error"),
                })
                    .required(t("generic.required error"))
                    .label(t("esu.model.flightPermits")),
                battery: select({
                    placeholder: t("generic.dropdown placeholder"),
                    options: batteries.map((battery) => ({
                        label: battery.name,
                        value: battery.id.toString(),
                    })),
                    errorMessage: t("generic.dropdown error"),
                }).label(t("esu.model.battery")),
                type: select({
                    placeholder: t("generic.dropdown placeholder"),
                    options: esuTypes.map((esuType) => ({
                        label: esuType.name,
                        value: esuType.id.toString(),
                    })),
                    errorMessage: t("generic.dropdown error"),
                })
                    .required(t("generic.required error"))
                    .label(t("esu.model.type")),
                location: select({
                    placeholder: t("generic.dropdown placeholder"),
                    options: locations.map((location) => ({
                        label: location.name,
                        value: location.id.toString(),
                    })),
                    errorMessage: t("generic.dropdown error"),
                })
                    .required(t("generic.required error"))
                    .label(t("esu.model.location")),
                chargingProfile: select({
                    placeholder: t("generic.dropdown placeholder"),
                    options: chargingProfiles.map((chargingProfile) => ({
                        label: chargingProfile.name,
                        value: chargingProfile.id.toString(),
                    })),
                    errorMessage: t("generic.dropdown error"),
                })
                    .required(t("generic.required error"))
                    .label(t("esu.model.chargingProfile")),
            }),
        [t, esuTypes, chargingProfiles, batteries, locations]
    );
    const FormControl = createFormControl<typeof createEsuSchema>();
    return { FormControl, createEsuSchema };
};
