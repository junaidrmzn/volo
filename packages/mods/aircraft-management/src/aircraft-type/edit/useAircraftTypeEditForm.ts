import { useEffect, useMemo } from "react";
import { AircraftType, PerformanceModel, PerformanceModelType } from "@voloiq/aircraft-management-api/v1";
import { FieldName, createFormControl, datetime, number, object, select, string, unit } from "@voloiq/form";
import type { ResourcesTranslationFunction } from "../../translations/useResourcesTranslation";
import { useResourcesTranslation } from "../../translations/useResourcesTranslation";
import { useAircraftResources } from "../hooks/useAircraftResources";
import { useMassAndBalancePoints } from "../hooks/useMassAndBalancePoints";
import type { UnitBaseValues } from "./useUnitBaseValues";
import { useUnitBaseValues } from "./useUnitBaseValues";

const aircraftTypeEditSchemaFactory = (
    t: ResourcesTranslationFunction,
    baseValues: UnitBaseValues,
    handleBaseValueUpdate: (key: keyof UnitBaseValues, value: string) => void
) => {
    const spec = {
        validFrom: datetime().required().label(t("aircraft-type.model.validFrom")),
        validTo: datetime()
            .max(new Date(2999, 11, 31, 23, 59, 59), t("generic.maxDate error", { year: 2999 }))
            .label(t("aircraft-type.model.validTo")),
        productLine: string().label(t("aircraft-type.model.productLine")),
        minimumTemperature: unit({
            baseUnit: "°C",
            unitType: "temperature",
            defaultBaseValue: baseValues.minimumTemperature,
            onChangeBaseValue: (value: string) => {
                handleBaseValueUpdate("minimumTemperature", value);
            },
        })
            .required(t("generic.required error"))
            .min(-273, t("generic.minNumberLength error"))
            .max(1000, t("generic.maxNumberLength error"))
            .label(t("aircraft-type.model.minimumTemperature")),
        maximumTemperature: unit({
            baseUnit: "°C",
            unitType: "temperature",
            defaultBaseValue: baseValues.maximumTemperature,
            onChangeBaseValue: (value: string) => {
                handleBaseValueUpdate("maximumTemperature", value);
            },
        })
            .required(t("generic.required error"))
            .min(-273, t("generic.minNumberLength error"))
            .max(1000, t("generic.maxNumberLength error"))
            .when(
                "minimumTemperature",
                (minimumTemperature, yup) =>
                    minimumTemperature !== undefined &&
                    yup.test(
                        "maximumTemperature-greater-than-minimumTemperature",
                        t("aircraft-type.model.maximumTemperature error"),
                        (value: number) => value > minimumTemperature
                    )
            )
            .label(t("aircraft-type.model.maximumTemperature")),
        windSpeed: unit({
            baseUnit: "m/s",
            unitType: "speed",
            defaultBaseValue: baseValues.windSpeed,
            onChangeBaseValue: (value: string) => {
                handleBaseValueUpdate("windSpeed", value);
            },
        })
            .required(t("generic.required error"))
            .min(0, t("generic.minNumberLength error"))
            .max(100, t("generic.maxNumberLength error"))
            .label(t("aircraft-type.model.windSpeed")),
        relativeHumidity: unit({
            baseUnit: "%",
            unitType: "percentage",
            defaultBaseValue: baseValues.relativeHumidity,
            onChangeBaseValue: (value: string) => {
                handleBaseValueUpdate("relativeHumidity", value);
            },
        })
            .required(t("generic.required error"))
            .min(0, t("generic.minNumberLength error"))
            .max(100, t("generic.maxNumberLength error"))
            .label(t("aircraft-type.model.relativeHumidity")),
        rain: unit({
            baseUnit: "mm",
            unitType: "shortDistance",
            defaultBaseValue: baseValues.rain,
            onChangeBaseValue: (value: string) => {
                handleBaseValueUpdate("rain", value);
            },
        })
            .required(t("generic.required error"))
            .min(0, t("generic.minNumberLength error"))
            .max(1000, t("generic.maxNumberLength error"))
            .label(t("aircraft-type.model.rain")),
        visibility: unit({
            baseUnit: "m",
            unitType: "distance",
            defaultBaseValue: baseValues.visibility,
            onChangeBaseValue: (value: string) => {
                handleBaseValueUpdate("visibility", value);
            },
        })
            .required(t("generic.required error"))
            .min(0, t("generic.minNumberLength error"))
            .label(t("aircraft-type.model.visibility")),
        cloudCeilingHeight: unit({
            baseUnit: "m",
            unitType: "altitude",
            defaultBaseValue: baseValues.cloudCeilingHeight,
            onChangeBaseValue: (value: string) => {
                handleBaseValueUpdate("cloudCeilingHeight", value);
            },
        })
            .required(t("generic.required error"))
            .min(0, t("generic.minNumberLength error"))
            .label(t("aircraft-type.model.cloudCeilingHeight")),
        airDensity: unit({
            baseUnit: "kg/m³",
            unitType: "density",
            defaultBaseValue: baseValues.airDensity,
            onChangeBaseValue: (value: string) => {
                handleBaseValueUpdate("airDensity", value);
            },
        })
            .required(t("generic.required error"))
            .min(0, t("generic.minNumberLength error"))
            .max(2, t("generic.maxNumberLength error"))
            .label(t("aircraft-type.model.airDensity")),
        performanceModel: select<PerformanceModelType>({
            placeholder: t("generic.dropdown placeholder"),
            options: Object.values(PerformanceModel).map((key) => ({
                value: key,
                label: key,
            })),
            errorMessage: t("generic.dropdown error"),
        }).label(t("aircraft-type.model.aircraftResources performaceModel")),
        maxDurationToCsfl: unit({
            baseUnit: "seconds",
            unitType: "time",
            defaultBaseValue: baseValues.maxDurationToCsfl,
            onChangeBaseValue: (value: string) => {
                handleBaseValueUpdate("maxDurationToCsfl", value);
            },
        })
            .min(0, t("generic.minNumberLength error"))
            .label(t("aircraft-type.model.aircraftResources maxDurationToCsfl noUnit")),
        voltageThreshold: unit({
            baseUnit: "V",
            unitType: "voltage",
            defaultBaseValue: baseValues.voltageThreshold,
            onChangeBaseValue: (value: string) => {
                handleBaseValueUpdate("voltageThreshold", value);
            },
        }).label(t("aircraft-type.model.aircraftResources voltageThreshold")),
    };

    return object({
        ...spec,
        mbCgPositionX: number()
            .required(t("generic.required error"))
            .label(t("aircraft-type.model.massAndBalanceData cgPosition x")),
        mbCgPositionY: number()
            .required(t("generic.required error"))
            .label(t("aircraft-type.model.massAndBalanceData cgPosition y")),
        mbBem: unit({
            baseUnit: "kg",
            unitType: "weight",
            defaultBaseValue: baseValues.mbBem,
            onChangeBaseValue: (value: string) => {
                handleBaseValueUpdate("mbBem", value);
            },
        })
            .required(t("generic.required error"))
            .min(0, t("generic.minNumberLength error"))
            .label(t("aircraft-type.model.massAndBalanceData bem")),
        mbMtom: unit({
            baseUnit: "kg",
            unitType: "weight",
            defaultBaseValue: baseValues.mbMtom,
            onChangeBaseValue: (value: string) => {
                handleBaseValueUpdate("mbMtom", value);
            },
        })
            .required(t("generic.required error"))
            .min(0, t("generic.minNumberLength error"))
            .label(t("aircraft-type.model.massAndBalanceData mtom")),
    });
};

export type AircraftTypeEditSchema = ReturnType<typeof aircraftTypeEditSchemaFactory>;

export type UseAircraftTypeEditFormOptions = {
    resource: AircraftType;
};

export const useAircraftTypeEditForm = (options: UseAircraftTypeEditFormOptions) => {
    const { resource } = options;
    const { t } = useResourcesTranslation();
    const { baseValues, handleBaseValueUpdate } = useUnitBaseValues(resource);
    const {
        aircraftResources,
        aircraftResourcesDisplayValues,
        setAircraftResources,
        handleDelete,
        toggleEditMode,
        handleAdd,
        handleChange,
    } = useAircraftResources();
    const {
        massAndBalancePoints: massAndBalanceLongPoints,
        massAndBalanceDisplayPoints: massAndBalanceLongDisplayPoints,
        setMassAndBalancePoints: setMassAndBalanceLongPoints,
        handleAdd: handleMbLongAdd,
        handleChange: handleMbLongChange,
        handleDelete: handleMbLongDelete,
        toggleEditMode: toggleMbLongEditMode,
    } = useMassAndBalancePoints();
    const {
        massAndBalancePoints: massAndBalanceLatPoints,
        massAndBalanceDisplayPoints: massAndBalanceLatDisplayPoints,
        setMassAndBalancePoints: setMassAndBalanceLatPoints,
        handleAdd: handleMbLatAdd,
        handleChange: handleMbLatChange,
        handleDelete: handleMbLatDelete,
        toggleEditMode: toggleMbLatEditMode,
    } = useMassAndBalancePoints();

    useEffect(() => {
        if (!resource) {
            return;
        }

        if (resource.aircraftResources) {
            setAircraftResources(
                resource.aircraftResources.map((aircraftResource) => ({ ...aircraftResource, editMode: false }))
            );
        }

        if (resource.massAndBalanceData?.longCgEnvelopePoints) {
            setMassAndBalanceLongPoints(
                resource.massAndBalanceData.longCgEnvelopePoints.map((point) => ({ ...point, editMode: false }))
            );
        }

        if (resource.massAndBalanceData?.latCgEnvelopePoints) {
            setMassAndBalanceLatPoints(
                resource.massAndBalanceData.latCgEnvelopePoints.map((point) => ({ ...point, editMode: false }))
            );
        }
    }, [resource, setAircraftResources, setMassAndBalanceLongPoints, setMassAndBalanceLatPoints]);

    const aircraftTypeInitialValues = {
        validFrom: resource?.validFrom ? new Date(resource?.validFrom) : undefined,
        validTo: resource?.validTo ? new Date(resource?.validTo) : undefined,
        productLine: resource?.productLine ?? undefined,
        minimumTemperature: resource?.minimumTemperature,
        maximumTemperature: resource?.maximumTemperature,
        windSpeed: resource?.windSpeed,
        relativeHumidity: resource?.relativeHumidity,
        rain: resource?.rain,
        visibility: resource?.visibility,
        cloudCeilingHeight: resource?.cloudCeilingHeight,
        airDensity: resource?.airDensity,
        performanceModel: { value: resource?.performanceModel },
        maxDurationToCsfl: resource?.maxDurationToCsfl ?? undefined,
        voltageThreshold: resource?.voltageThreshold ?? undefined,
    };
    const editAircraftTypeSchema = useMemo(
        () => aircraftTypeEditSchemaFactory(t, baseValues, handleBaseValueUpdate),
        [baseValues, handleBaseValueUpdate, t]
    );

    const FormControl = createFormControl();
    const isAircraftTypeEditFieldName = (attribute: unknown): attribute is FieldName<AircraftTypeEditSchema> =>
        Object.keys(editAircraftTypeSchema.describe().fields).includes(attribute as FieldName<AircraftTypeEditSchema>);

    return {
        FormControl,
        baseValues,
        editAircraftTypeSchema,
        aircraftTypeInitialValues: {
            ...aircraftTypeInitialValues,
            mbCgPositionX: resource?.massAndBalanceData?.cgPosition?.x,
            mbCgPositionY: resource?.massAndBalanceData?.cgPosition?.y,
            mbBem: resource?.massAndBalanceData?.bem,
            mbMtom: resource?.massAndBalanceData?.mtom,
        },
        isAircraftTypeEditFieldName,
        aircraftResources: {
            values: aircraftResources,
            displayValues: aircraftResourcesDisplayValues,
            handleAdd,
            handleDelete,
            handleChange,
            toggleEditMode,
        },
        massAndBalanceLongPoints: {
            values: massAndBalanceLongPoints,
            displayValues: massAndBalanceLongDisplayPoints,
            handleAdd: handleMbLongAdd,
            handleChange: handleMbLongChange,
            handleDelete: handleMbLongDelete,
            toggleEditMode: toggleMbLongEditMode,
        },
        massAndBalanceLatPoints: {
            values: massAndBalanceLatPoints,
            displayValues: massAndBalanceLatDisplayPoints,
            handleAdd: handleMbLatAdd,
            handleChange: handleMbLatChange,
            handleDelete: handleMbLatDelete,
            toggleEditMode: toggleMbLatEditMode,
        },
    };
};
