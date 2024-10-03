import { PassengerCheckinType } from "@voloiq-typescript-api/vertiport-management-types";
import { useMemo } from "react";
import type { FieldName } from "@voloiq/form";
import {
    coordinate,
    createFormControl,
    datetime,
    multiselect,
    number,
    object,
    select,
    string,
    unit,
} from "@voloiq/form";
import type { Region, StringPair } from "@voloiq/vertiport-management-api/v1";
import { useGetRegions } from "../../api-hooks/useRegionService";
import { useGetVertiportServices } from "../../api-hooks/useVertiportServicesService";
import type { ResourcesTranslationFunction } from "../../translations/useVertiportTranslation";
import { useVertiportTranslation } from "../../translations/useVertiportTranslation";
import type { UnitBaseValues } from "./useUnitBaseValues";
import { useUnitBaseValues } from "./useUnitBaseValues";

const createVertiportSchemaFactory = (
    t: ResourcesTranslationFunction,
    regions: Region[],
    vertiportServices: StringPair[],
    baseValues: UnitBaseValues,
    handleBaseValueUpdate: (key: keyof UnitBaseValues, value: string) => void
) =>
    object({
        name: string()
            .required(t("generic.required error"))
            .max(200, t("generic.maxLength error"))
            .min(3, t("generic.minLength error"))
            .label(t("vertiport.model.name")),
        validFrom: datetime().required(t("generic.required error")).label(t("vertiport.model.validFrom")),
        validTo: datetime().label(t("vertiport.model.validTo")),
        publicFrom: datetime().label(t("vertiport.model.publicFrom")),
        publicTo: datetime().label(t("vertiport.model.publicTo")),
        iataCode: string()
            .max(3, t("generic.iataCodeLength error", { length: 3 }))
            .label(t("vertiport.model.iataCode")),
        icaoCode: string()
            .max(4, t("generic.icaoCodeLength error", { length: 4 }))
            .label(t("vertiport.model.icaoCode")),
        code: string()
            .label(t("vertiport.model.code"))
            .required(t("generic.required error"))
            .matches(/^[A-Z]\w{2}$|^[A-Z]\w{2}-[A-Z]\w{2}$/),
        shortName: string().required(t("generic.required error")).label(t("vertiport.model.shortName")),
        coordinates: coordinate({
            coordinateInfoLabels: {
                latitudeLabel: t("vertiport.model.latitude"),
                longitudeLabel: t("vertiport.model.longitude"),
                cancelButtonLabel: t("buttons.cancel"),
                applyButtonLabel: t("buttons.apply"),
                iconButtonLabel: t("vertiport.model.coordinates"),
            },
        })
            .matches(
                /^-?\d+(\.\d+)?, -?\d+(\.\d+)?$|([\d.]+)°\s*([\d.]+)'\s*([\d.]+)"\s*([ENSW])\s*([\d.]+)°\s*([\d.]+)'\s*([\d.]+)"\s*([ENSW])|([\d.]+)\s*([\d.]+)\s*,\s*([\d.]+)\s*([\d.]+)/,
                t("error.errorMessages.commaSeparatedValues")
            )
            .required(t("generic.required error"))
            .label(t("vertiport.model.longitude")),
        regionId: select({
            placeholder: t("generic.dropdown placeholder"),
            options: regions.map((region) => ({
                label: region.name,
                value: region.id,
            })),
            errorMessage: t("generic.dropdown error"),
        })
            .required(t("generic.required error"))
            .label(t("vertiport.model.regionId")),
        timeZone: string().label(t("vertiport.model.timeZone")),
        elevation: unit({
            baseUnit: "m",
            unitType: "altitude",
            defaultBaseValue: baseValues.elevation,
            onChangeBaseValue: (value: string) => {
                handleBaseValueUpdate("elevation", value);
            },
        })
            .required(t("generic.required error"))
            .label(t("vertiport.model.elevation")),
        services: multiselect({
            placeholder: t("generic.dropdown placeholder"),
            options:
                vertiportServices?.map((vertiportService) => ({
                    label: vertiportService.key,
                    value: vertiportService.value,
                })) || [],
            errorMessage: t("generic.dropdown error"),
        }).label(t("vertiport.model.services")),
        preBatterySwap: unit({
            baseUnit: "seconds",
            unitType: "time",
            defaultBaseValue: baseValues.preBatterySwap,
            onChangeBaseValue: (value: string) => {
                handleBaseValueUpdate("preBatterySwap", value);
            },
        })
            .label(t("vertiport.model.preFlightBatteryHandling"))
            .min(0),
        prePassengerHandling: unit({
            baseUnit: "seconds",
            unitType: "time",
            defaultBaseValue: baseValues.prePassengerHandling,
            onChangeBaseValue: (value: string) => {
                handleBaseValueUpdate("prePassengerHandling", value);
            },
        })
            .label(t("vertiport.model.preFlightPassengerHandling"))
            .min(0),
        prePilotBriefing: unit({
            baseUnit: "seconds",
            unitType: "time",
            defaultBaseValue: baseValues.prePilotBriefing,
            onChangeBaseValue: (value: string) => {
                handleBaseValueUpdate("prePilotBriefing", value);
            },
        })
            .label(t("vertiport.model.preFlightPilotBriefing"))
            .min(0),
        preVtolHandling: unit({
            baseUnit: "seconds",
            unitType: "time",
            defaultBaseValue: baseValues.preVtolHandling,
            onChangeBaseValue: (value: string) => {
                handleBaseValueUpdate("preVtolHandling", value);
            },
        })
            .label(t("vertiport.model.preFlightAircraftHandling"))
            .min(0),
        postBatterySwap: unit({
            baseUnit: "seconds",
            unitType: "time",
            defaultBaseValue: baseValues.postBatterySwap,
            onChangeBaseValue: (value: string) => {
                handleBaseValueUpdate("postBatterySwap", value);
            },
        })
            .label(t("vertiport.model.postFlightBatteryHandling"))
            .min(0),
        postPassengerHandling: unit({
            baseUnit: "seconds",
            unitType: "time",
            defaultBaseValue: baseValues.postPassengerHandling,
            onChangeBaseValue: (value: string) => {
                handleBaseValueUpdate("postPassengerHandling", value);
            },
        })
            .label(t("vertiport.model.postFlightPassengerHandling"))
            .min(0),
        postPilotBriefing: unit({
            baseUnit: "seconds",
            unitType: "time",
            defaultBaseValue: baseValues.postPilotBriefing,
            onChangeBaseValue: (value: string) => {
                handleBaseValueUpdate("postPilotBriefing", value);
            },
        })
            .label(t("vertiport.model.postFlightPilotBriefing"))
            .min(0),
        postVtolHandling: unit({
            baseUnit: "seconds",
            unitType: "time",
            defaultBaseValue: baseValues.postVtolHandling,
            onChangeBaseValue: (value: string) => {
                handleBaseValueUpdate("postVtolHandling", value);
            },
        })
            .label(t("vertiport.model.postFlightAircraftHandling"))
            .min(0),
        fatoBlockingTimePre: unit({
            baseUnit: "seconds",
            unitType: "time",
            defaultBaseValue: baseValues.fatoBlockingTimePre,
            onChangeBaseValue: (value: string) => {
                handleBaseValueUpdate("fatoBlockingTimePre", value);
            },
        })
            .label(t("vertiport.model.fatoBlockingTimePre"))
            .min(0),
        fatoBlockingTimePost: unit({
            baseUnit: "seconds",
            unitType: "time",
            defaultBaseValue: baseValues.fatoBlockingTimePost,
            onChangeBaseValue: (value: string) => {
                handleBaseValueUpdate("fatoBlockingTimePost", value);
            },
        })
            .label(t("vertiport.model.fatoBlockingTimePost"))
            .min(0),
        additionalFiles: multiselect({
            placeholder: t("generic.dropdown placeholder"),
            options: [
                { label: "Vertiport Handbook", value: "path/to/file" },
                { label: "Other File", value: "path/to/file" },
            ],
            errorMessage: t("generic.dropdown error"),
        }).label(t("vertiport.model.additionalFiles")),
        serviceHours: string().label(t("vertiport.model.serviceHours")),
        country: string().label(t("vertiport.model.country")),
        state: string().label(t("vertiport.model.state")),
        city: string()
            .max(50, t("generic.cityLength error", { length: 50 }))
            .label(t("vertiport.model.city")),

        zipCode: string().label(t("vertiport.model.zipCode")),
        addressLine1: string().label(t("vertiport.model.addressLine1")),
        addressLine2: string().label(t("vertiport.model.addressLine2")),
        names: multiselect({
            placeholder: t("generic.dropdown placeholder"),
            options: [
                { label: "München", value: "de" },
                { label: "Munich", value: "en" },
            ],
            errorMessage: t("generic.dropdown error"),
        }).label(t("vertiport.model.names")),
        images: multiselect({
            placeholder: t("generic.dropdown placeholder"),
            options: [
                { label: "Vertiport Picture", value: "path/to/pic" },
                { label: "Welcome Area", value: "path/to/pic" },
            ],
            errorMessage: t("generic.dropdown error"),
        }).label(t("vertiport.model.images")),
        popularity: number().label(t("vertiport.model.popularity")),
        passengerCheckinType: select({
            placeholder: t("generic.dropdown placeholder"),
            options: [
                { label: t("vertiport.passengerCheckinType.BIOMETRIC"), value: PassengerCheckinType.BIOMETRIC },
                { label: t("vertiport.passengerCheckinType.NOT_ALLOWED"), value: PassengerCheckinType.NOT_ALLOWED },
            ],
            errorMessage: t("generic.dropdown error"),
        })
            .required(t("generic.required error"))
            .label(t("vertiport.model.passengerCheckinType")),
        countryCode: string()
            .matches(/^[A-Z]{2}$/, t("generic.countryCode error"))
            .label(t("vertiport.model.countryCode")),
    });

export type CreateVertiportSchema = ReturnType<typeof createVertiportSchemaFactory>;

export const useCreateVertiportFormFields = () => {
    const { t } = useVertiportTranslation();
    const { data: regions } = useGetRegions(1);
    const { data: vertiportServices } = useGetVertiportServices(1);
    const { baseValues, handleBaseValueUpdate } = useUnitBaseValues();
    const FormControl = createFormControl<typeof createVertiportSchema>();
    const createVertiportSchema = useMemo(
        () => createVertiportSchemaFactory(t, regions, vertiportServices, baseValues, handleBaseValueUpdate),
        [t, regions, vertiportServices, baseValues, handleBaseValueUpdate]
    );

    const isCreateVertiportFieldName = (attribute: unknown): attribute is FieldName<CreateVertiportSchema> =>
        Object.keys(createVertiportSchema.describe().fields).includes(attribute as FieldName<CreateVertiportSchema>);

    return { createVertiportSchema, regions, isCreateVertiportFieldName, baseValues, FormControl };
};
