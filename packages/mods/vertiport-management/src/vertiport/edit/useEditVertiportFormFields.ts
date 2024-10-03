import { PassengerCheckinType } from "@voloiq-typescript-api/vertiport-management-types";
import { useEffect, useMemo } from "react";
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
import type { Region, StringPair, Vertiport } from "@voloiq/vertiport-management-api/v1";
import { useGetRegions } from "../../api-hooks/useRegionService";
import { useGetVertiportServices } from "../../api-hooks/useVertiportServicesService";
import type { ResourcesTranslationFunction } from "../../translations/useVertiportTranslation";
import { useVertiportTranslation } from "../../translations/useVertiportTranslation";
import { useApproachDirections } from "../approach-directions/useApproachDirections";
import { useGoAroundEnergies } from "../go-around-energies/useGoAroundEnergies";
import type { UnitBaseValues } from "./useUnitBaseValues";
import { useUnitBaseValues } from "./useUnitBaseValues";

const editVertiportSchemaFactory = (
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
            options: vertiportServices.map((vertservice) => ({
                label: vertservice.key,
                value: vertservice.key,
            })),
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
            .nullable()
            .matches(/^[A-Z]{2}$/, t("generic.countryCode error"))
            .label(t("vertiport.model.countryCode")),
    });

export type EditVertiportSchema = ReturnType<typeof editVertiportSchemaFactory>;

export const useEditVertiportFormFields = (vertiport: Vertiport) => {
    const { t } = useVertiportTranslation();
    const { data: regions } = useGetRegions(1);
    const { data: vertiportServices } = useGetVertiportServices(1);
    const { baseValues, handleBaseValueUpdate } = useUnitBaseValues(vertiport);
    const {
        goAroundEnergies,
        goAroundEnergiesDisplayValues,
        setGoAroundEnergies,
        setGoAroundEnergiesDisplayValues,
        handleAdd,
        handleChange,
        handleDelete,
        toggleEditMode,
    } = useGoAroundEnergies();

    const {
        approachDirections,
        approachDirectionsDisplayValues,
        setApproachDirections,
        setApproachDirectionsDisplayValues,
        handleAdd: handleAddApproachDirection,
        handleChange: handleChangeApproachDirection,
        handleDelete: handleDeleteApproachDirection,
        toggleEditMode: toggleEditModeApproachDirection,
    } = useApproachDirections();

    useEffect(() => {
        if (!vertiport) {
            return;
        }

        if (vertiport.goAroundEnergies) {
            setGoAroundEnergiesDisplayValues(
                vertiport.goAroundEnergies.map((energy) => ({
                    direction: energy.direction.toString(),
                    goAroundEnergy: energy.goAroundEnergy.toString(),
                }))
            );
            setGoAroundEnergies(vertiport.goAroundEnergies.map((energy) => ({ ...energy, editMode: false })));
        }
        if (vertiport.approachDirections) {
            setApproachDirectionsDisplayValues(
                vertiport.approachDirections.map((approachDirection) => ({
                    direction: approachDirection.toString(),
                }))
            );
            setApproachDirections(
                vertiport.approachDirections.map((approachDirection) => ({
                    direction: approachDirection,
                    editMode: false,
                }))
            );
        }
    }, [
        vertiport,
        setGoAroundEnergies,
        setGoAroundEnergiesDisplayValues,
        setApproachDirectionsDisplayValues,
        setApproachDirections,
    ]);

    const editVertiportSchema = useMemo(
        () => editVertiportSchemaFactory(t, regions, vertiportServices, baseValues, handleBaseValueUpdate),
        [t, regions, vertiportServices, baseValues, handleBaseValueUpdate]
    );

    const isEditVertiportFieldName = (attribute: unknown): attribute is FieldName<EditVertiportSchema> =>
        Object.keys(editVertiportSchema.describe().fields).includes(attribute as FieldName<EditVertiportSchema>);

    const vertiportInitialValues = {
        ...vertiport,
        validFrom: vertiport?.validFrom ? new Date(vertiport?.validFrom) : undefined,
        validTo: vertiport?.validTo ? new Date(vertiport?.validTo) : undefined,
        publicFrom: vertiport?.publicFrom ? new Date(vertiport?.publicFrom) : undefined,
        publicTo: vertiport?.publicTo ? new Date(vertiport?.publicTo) : undefined,
        iataCode: vertiport?.iataCode || undefined,
        icaoCode: vertiport?.icaoCode ? vertiport?.icaoCode : undefined,
        code: vertiport?.code,
        shortName: vertiport?.shortName ?? undefined,
        coordinates:
            vertiport?.location.longitude && vertiport?.location.latitude
                ? `${vertiport?.location.latitude}, ${vertiport?.location.longitude}`
                : undefined,
        regionId: vertiport?.region.id ? { label: vertiport?.region.name, value: vertiport?.region.id } : undefined,
        fatos: vertiport?.operation?.fatos ?? undefined,
        stands: vertiport?.operation?.stands ?? undefined,
        preBatterySwap: vertiport?.operation?.MinGroundTimePre?.batterySwap
            ? vertiport?.operation?.MinGroundTimePre?.batterySwap
            : undefined,
        prePassengerHandling: vertiport?.operation?.MinGroundTimePre?.passengerHandling
            ? vertiport?.operation?.MinGroundTimePre?.passengerHandling
            : undefined,
        prePilotBriefing: vertiport?.operation?.MinGroundTimePre?.pilotBriefing
            ? vertiport?.operation?.MinGroundTimePre?.pilotBriefing
            : undefined,
        preVtolHandling: vertiport?.operation?.MinGroundTimePre?.vtolHandling
            ? vertiport?.operation?.MinGroundTimePre?.vtolHandling
            : undefined,
        postBatterySwap: vertiport?.operation?.MinGroundTimePost?.batterySwap
            ? vertiport?.operation?.MinGroundTimePost?.batterySwap
            : undefined,
        postPassengerHandling: vertiport?.operation?.MinGroundTimePost?.passengerHandling
            ? vertiport?.operation?.MinGroundTimePost?.passengerHandling
            : undefined,
        postPilotBriefing: vertiport?.operation?.MinGroundTimePost?.pilotBriefing
            ? vertiport?.operation?.MinGroundTimePost?.pilotBriefing
            : undefined,
        postVtolHandling: vertiport?.operation?.MinGroundTimePost?.vtolHandling
            ? vertiport?.operation?.MinGroundTimePost?.vtolHandling
            : undefined,
        fatoBlockingTimePre: vertiport?.operation?.fatoBlockingTimePre
            ? vertiport?.operation?.fatoBlockingTimePre
            : undefined,
        fatoBlockingTimePost: vertiport?.operation?.fatoBlockingTimePost
            ? vertiport?.operation?.fatoBlockingTimePost
            : undefined,
        additionalFiles: vertiport?.operation?.additionalFiles?.map((file) => ({ label: file.key, value: file.url })),
        serviceHours: "",
        country: vertiport?.address?.country ?? undefined,
        state: vertiport?.address?.state ?? undefined,
        city: vertiport?.address?.city ?? undefined,
        zipCode: vertiport?.address?.zipCode ?? undefined,
        addressLine1: vertiport?.address?.addressLine1 ?? undefined,
        addressLine2: vertiport?.address?.addressLine2 ?? undefined,
        names: vertiport?.names?.map((name) => ({ label: name.key, value: name.value })),
        images: vertiport?.images?.map((image) => ({ label: image.key, value: image.value })),
        services: vertiport?.services?.map((vertiportService) => ({
            label: vertiportService.serviceKey,
            value: vertiportService.serviceKey,
        })),
        passengerCheckinType: vertiport?.passengerCheckinType
            ? {
                  label: t(`vertiport.passengerCheckinType.${vertiport.passengerCheckinType}`),
                  value: vertiport?.passengerCheckinType,
              }
            : undefined,
    };
    const FormControl = createFormControl<typeof editVertiportSchema>();

    return {
        vertiportInitialValues,
        editVertiportSchema,
        vertiport,
        isEditVertiportFieldName,
        version: vertiport.version,
        baseValues,
        goAroundEnergies,
        goAroundEnergiesDisplayValues,
        handleAdd,
        handleChange,
        handleDelete,
        toggleEditMode,
        FormControl,
        approachDirections,
        approachDirectionsDisplayValues,
        handleAddApproachDirection,
        handleChangeApproachDirection,
        handleDeleteApproachDirection,
        toggleEditModeApproachDirection,
    };
};
