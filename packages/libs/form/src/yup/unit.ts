import type {
    AltitudeUnitInputProps,
    AtmosphericPressureUnitInputProps,
    DensityUnitInputProps,
    DirectionUnitInputProps,
    DistanceUnitInputProps,
    EnergyUnitInputProps,
    FrequencyUnitInputProps,
    MomentUnitInputProps,
    PercentageUnitInputProps,
    RotationUnitInputProps,
    SpeedUnitInputProps,
    TemperatureUnitInputProps,
    TimeUnitInputProps,
    VoltageUnitInputProps,
    WeightUnitInputProps,
} from "@volocopter/unit-inputs-react";
import type { AnyObjectSchema } from "yup";
import { number } from "yup";
import type {
    LongDistanceUnitInputProps,
    MediumDistanceUnitInputProps,
    ShortDistanceUnitInputProps,
} from "@voloiq/distance-unit-input";
import { getSchemaDescriptionOfField } from "./schemaDescription";
import type { FieldName } from "./utils";

const unitTypes = [
    "temperature",
    "speed",
    "weight",
    "distance",
    "shortDistance",
    "mediumDistance",
    "longDistance",
    "atmosphericPressure",
    "altitude",
    "time",
    "direction",
    "percentage",
    "moment",
    "density",
    "rotation",
    "frequency",
    "voltage",
    "energy",
] as const;
export type UnitType = typeof unitTypes[number];

export type UnitInputProps<T extends UnitType> = T extends "temperature"
    ? TemperatureUnitInputProps
    : T extends "speed"
    ? SpeedUnitInputProps
    : T extends "weight"
    ? WeightUnitInputProps
    : T extends "distance"
    ? DistanceUnitInputProps
    : T extends "shortDistance"
    ? ShortDistanceUnitInputProps
    : T extends "mediumDistance"
    ? MediumDistanceUnitInputProps
    : T extends "longDistance"
    ? LongDistanceUnitInputProps
    : T extends "atmosphericPressure"
    ? AtmosphericPressureUnitInputProps
    : T extends "altitude"
    ? AltitudeUnitInputProps
    : T extends "time"
    ? TimeUnitInputProps
    : T extends "direction"
    ? DirectionUnitInputProps
    : T extends "percentage"
    ? PercentageUnitInputProps
    : T extends "density"
    ? DensityUnitInputProps
    : T extends "moment"
    ? MomentUnitInputProps
    : T extends "rotation"
    ? RotationUnitInputProps
    : T extends "frequency"
    ? FrequencyUnitInputProps
    : T extends "voltage"
    ? VoltageUnitInputProps
    : T extends "energy"
    ? EnergyUnitInputProps
    : never;

type ValidUnitType = Exclude<UnitType, "never">;

export type UnitMeta<T extends ValidUnitType> = {
    unitType: T;
    baseUnit: UnitInputProps<T>["baseUnit"];
    displayUnit?: UnitInputProps<T>["displayUnit"];
    onChangeBaseValue: (value: string) => void;
    defaultBaseValue?: string | number;
};

export const isUnitMeta = (meta: {}): meta is UnitMeta<UnitType> => {
    const unitMeta = meta as UnitMeta<UnitType>;
    return (
        typeof unitMeta === "object" &&
        unitMeta.baseUnit !== undefined &&
        unitMeta.unitType !== undefined &&
        unitTypes.includes(unitMeta.unitType) &&
        typeof unitMeta.onChangeBaseValue === "function" &&
        (unitMeta.defaultBaseValue === undefined ||
            typeof unitMeta.defaultBaseValue === "string" ||
            typeof unitMeta.defaultBaseValue === "number")
    );
};

export const isUnitField = <Schema extends AnyObjectSchema>(schema: Schema, fieldName: FieldName<Schema>) => {
    const { meta } = getSchemaDescriptionOfField(schema, fieldName);
    return isUnitMeta(meta);
};

export const unit = (props: UnitMeta<UnitType>) => {
    const { baseUnit, unitType, defaultBaseValue, displayUnit, onChangeBaseValue } = props;
    return number()
        .meta({
            baseUnit,
            displayUnit,
            unitType,
            defaultBaseValue,
            onChangeBaseValue,
        })
        .transform((value, originalValue) => (originalValue === "" ? undefined : value))
        .optional();
};
