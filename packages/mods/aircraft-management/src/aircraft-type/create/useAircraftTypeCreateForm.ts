import { ProductLine } from "@voloiq-typescript-api/aircraft-management-types";
import { useMemo } from "react";
import { useGetQueryState } from "@voloiq/aircraft-management-api/helpers";
import { PerformanceModel, PerformanceModelType } from "@voloiq/aircraft-management-api/v1";
import type { FieldName } from "@voloiq/form";
import { createFormControl, datetime, number, object, select, string, unit } from "@voloiq/form";
import type { ResourcesTranslationFunction } from "../../translations/useResourcesTranslation";
import { useResourcesTranslation } from "../../translations/useResourcesTranslation";
import type { UnitBaseValues } from "./useUnitBaseValues";
import { useUnitBaseValues } from "./useUnitBaseValues";

const aircraftTypeCreateSchemaFactory = (
    t: ResourcesTranslationFunction,
    baseValues: UnitBaseValues,
    handleBaseValueUpdate: (key: keyof UnitBaseValues, value: string) => void,
    productLines: ProductLine[] = []
) => {
    const spec = {
        name: string()
            .required(t("generic.required error"))
            .max(10, t("generic.maxLength error"))
            .label(t("aircraft-type.model.type")),
        validFrom: datetime().required().label(t("aircraft-type.model.validFrom")),
        validTo: datetime()
            .max(new Date(2999, 11, 31, 23, 59, 59), t("generic.maxDate error", { year: 2999 }))
            .label(t("aircraft-type.model.validTo")),
        productLine: select<ProductLine>({
            placeholder: t("generic.dropdown placeholder"),
            options: productLines.map((productLine) => ({
                value: productLine,
                label: productLine,
            })),
            errorMessage: t("generic.dropdown error"),
        })
            .required()
            .label(t("aircraft-type.model.productLine")),
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

export const useAircraftTypeCreateForm = () => {
    const { t } = useResourcesTranslation();
    const { baseValues, handleBaseValueUpdate } = useUnitBaseValues();
    const { data: productLines } = useGetQueryState<ProductLine[]>(["product-lines"]);

    const createAircraftTypeSchema = useMemo(
        () => aircraftTypeCreateSchemaFactory(t, baseValues, handleBaseValueUpdate, productLines),
        [t, baseValues, handleBaseValueUpdate, productLines]
    );
    const FormControl = createFormControl();

    const isAircraftTypeCreateFormAttribute = (attribute: unknown): attribute is FieldName<AircraftTypeCreateSchema> =>
        Object.keys(createAircraftTypeSchema.describe().fields).includes(
            attribute as FieldName<AircraftTypeCreateSchema>
        );

    return {
        FormControl,
        createAircraftTypeSchema,
        isAircraftTypeCreateFormAttribute,
        baseValues,
    };
};

export type AircraftTypeCreateSchema = ReturnType<typeof aircraftTypeCreateSchemaFactory>;
