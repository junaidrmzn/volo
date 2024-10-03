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
import {
    AltitudeUnitInput,
    AtmosphericPressureUnitInput,
    DensityUnitInput,
    DirectionUnitInput,
    DistanceUnitInput,
    EnergyUnitInput,
    FrequencyUnitInput,
    MomentUnitInput,
    PercentageUnitInput,
    RotationUnitInput,
    SpeedUnitInput,
    TemperatureUnitInput,
    TimeUnitInput,
    VoltageUnitInput,
    WeightUnitInput,
} from "@volocopter/unit-inputs-react";
import React from "react";
import type { FieldPath } from "react-hook-form";
import { useController } from "react-hook-form";
import { match } from "ts-pattern";
import type { AnyObjectSchema } from "yup";
import type {
    LongDistanceUnitInputProps,
    MediumDistanceUnitInputProps,
    ShortDistanceUnitInputProps,
} from "@voloiq/distance-unit-input";
import { LongDistanceUnitInput, MediumDistanceUnitInput, ShortDistanceUnitInput } from "@voloiq/distance-unit-input";
import { useForm } from "../form-context/useForm";
import type { UnitType } from "../yup/unit";
import { getBaseUnit, getDefaultBaseValue, getDisplayUnit, getOnChangeBaseValue, getUnitType } from "../yup/unitUtils";
import type { FieldName, FormValues } from "../yup/utils";

type UnitInputProps<Schema extends AnyObjectSchema> = {
    fieldName: FieldName<Schema> & FieldPath<FormValues<Schema>>;
    onBlur?: (data: React.FocusEvent<HTMLInputElement>) => void;
};

export const UnitInput = <Schema extends AnyObjectSchema>(props: UnitInputProps<Schema>) => {
    const { fieldName, onBlur } = props;
    const { control, schema } = useForm<Schema>();
    const {
        field: { onChange: controllerOnChange, name, value },
    } = useController({ control, name: fieldName });
    const unitType: UnitType = getUnitType<Schema>(schema, fieldName);
    const baseUnit = getBaseUnit<Schema>(schema, fieldName);
    const displayUnit = getDisplayUnit<Schema>(schema, fieldName);
    const defaultBaseValue = getDefaultBaseValue<Schema>(schema, fieldName);
    const onChangeBaseValue = getOnChangeBaseValue<Schema>(schema, fieldName);

    const sharedProps = {
        onChange: controllerOnChange,
        defaultBaseValue,
        onBaseValueChange: onChangeBaseValue,
        onBlur,
        name,
        value,
    };
    return match(unitType)
        .with("temperature", () => (
            <TemperatureUnitInput
                {...sharedProps}
                baseUnit={baseUnit as TemperatureUnitInputProps["baseUnit"]}
                displayUnit={(displayUnit ?? "°C") as TemperatureUnitInputProps["displayUnit"]}
            />
        ))
        .with("speed", () => (
            <SpeedUnitInput
                {...sharedProps}
                baseUnit={baseUnit as SpeedUnitInputProps["baseUnit"]}
                displayUnit={(displayUnit ?? "m/s") as SpeedUnitInputProps["displayUnit"]}
            />
        ))
        .with("weight", () => (
            <WeightUnitInput
                {...sharedProps}
                baseUnit={baseUnit as WeightUnitInputProps["baseUnit"]}
                displayUnit={(displayUnit ?? "kg") as WeightUnitInputProps["displayUnit"]}
            />
        ))
        .with("distance", () => (
            <DistanceUnitInput
                {...sharedProps}
                baseUnit={baseUnit as DistanceUnitInputProps["baseUnit"]}
                displayUnit={(displayUnit ?? "m") as DistanceUnitInputProps["displayUnit"]}
            />
        ))
        .with("shortDistance", () => (
            <ShortDistanceUnitInput
                {...sharedProps}
                baseUnit={baseUnit as ShortDistanceUnitInputProps["baseUnit"]}
                displayUnit={(displayUnit ?? "mm") as ShortDistanceUnitInputProps["displayUnit"]}
            />
        ))
        .with("mediumDistance", () => (
            <MediumDistanceUnitInput
                {...sharedProps}
                baseUnit={baseUnit as MediumDistanceUnitInputProps["baseUnit"]}
                displayUnit={(displayUnit ?? "m") as MediumDistanceUnitInputProps["displayUnit"]}
            />
        ))
        .with("longDistance", () => (
            <LongDistanceUnitInput
                {...sharedProps}
                baseUnit={baseUnit as LongDistanceUnitInputProps["baseUnit"]}
                displayUnit={(displayUnit ?? "km") as LongDistanceUnitInputProps["displayUnit"]}
            />
        ))
        .with("altitude", () => (
            <AltitudeUnitInput
                {...sharedProps}
                baseUnit={baseUnit as AltitudeUnitInputProps["baseUnit"]}
                displayUnit={(displayUnit ?? "m") as AltitudeUnitInputProps["displayUnit"]}
            />
        ))
        .with("atmosphericPressure", () => (
            <AtmosphericPressureUnitInput
                {...sharedProps}
                baseUnit={baseUnit as AtmosphericPressureUnitInputProps["baseUnit"]}
                displayUnit={(displayUnit ?? "hPa") as AtmosphericPressureUnitInputProps["displayUnit"]}
            />
        ))
        .with("time", () => (
            <TimeUnitInput
                {...sharedProps}
                baseUnit={baseUnit as TimeUnitInputProps["baseUnit"]}
                displayUnit={(displayUnit ?? "minutes") as TimeUnitInputProps["displayUnit"]}
            />
        ))
        .with("direction", () => (
            <DirectionUnitInput
                {...sharedProps}
                baseUnit={baseUnit as DirectionUnitInputProps["baseUnit"]}
                displayUnit={(displayUnit ?? "degree") as DirectionUnitInputProps["displayUnit"]}
            />
        ))
        .with("percentage", () => (
            <PercentageUnitInput
                {...sharedProps}
                baseUnit={baseUnit as PercentageUnitInputProps["baseUnit"]}
                displayUnit={(displayUnit ?? "%") as PercentageUnitInputProps["displayUnit"]}
            />
        ))
        .with("density", () => (
            <DensityUnitInput
                {...sharedProps}
                baseUnit={baseUnit as DensityUnitInputProps["baseUnit"]}
                displayUnit={(displayUnit ?? "kg/m³") as DensityUnitInputProps["displayUnit"]}
            />
        ))
        .with("moment", () => (
            <MomentUnitInput
                {...sharedProps}
                baseUnit={baseUnit as MomentUnitInputProps["baseUnit"]}
                displayUnit={(displayUnit ?? "kgm²") as MomentUnitInputProps["displayUnit"]}
            />
        ))
        .with("rotation", () => (
            <RotationUnitInput
                {...sharedProps}
                baseUnit={baseUnit as RotationUnitInputProps["baseUnit"]}
                displayUnit={(displayUnit ?? "°") as RotationUnitInputProps["displayUnit"]}
            />
        ))
        .with("frequency", () => (
            <FrequencyUnitInput
                {...sharedProps}
                baseUnit={baseUnit as FrequencyUnitInputProps["baseUnit"]}
                displayUnit={(displayUnit ?? "Hz") as FrequencyUnitInputProps["displayUnit"]}
            />
        ))
        .with("voltage", () => (
            <VoltageUnitInput
                {...sharedProps}
                baseUnit={baseUnit as VoltageUnitInputProps["baseUnit"]}
                displayUnit={(displayUnit ?? "V") as VoltageUnitInputProps["displayUnit"]}
            />
        ))
        .with("energy", () => (
            <EnergyUnitInput
                {...sharedProps}
                baseUnit={baseUnit as EnergyUnitInputProps["baseUnit"]}
                displayUnit={(displayUnit ?? "kWh") as EnergyUnitInputProps["displayUnit"]}
            />
        ))
        .exhaustive();
};
