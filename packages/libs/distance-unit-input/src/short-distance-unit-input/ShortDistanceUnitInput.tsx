import type { DistanceUnitInputProps } from "@volocopter/unit-inputs-react";
import { DistanceUnitInput as DLDistanceUnitInput } from "@volocopter/unit-inputs-react";
import type { ShortDistanceUnit } from "./ShortDistanceUnit";

export type ShortDistanceUnitInputProps = Omit<DistanceUnitInputProps, "baseUnit" | "displayUnit"> & {
    displayUnit: ShortDistanceUnit;
    baseUnit: ShortDistanceUnit;
};

export const ShortDistanceUnitInput = (props: ShortDistanceUnitInputProps) => {
    return <DLDistanceUnitInput {...props} />;
};
