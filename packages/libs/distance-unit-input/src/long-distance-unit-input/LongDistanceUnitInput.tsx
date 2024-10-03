import type { DistanceUnitInputProps } from "@volocopter/unit-inputs-react";
import { DistanceUnitInput as DLDistanceUnitInput } from "@volocopter/unit-inputs-react";
import type { LongDistanceUnit } from "./LongDistanceUnit";

export type LongDistanceUnitInputProps = Omit<DistanceUnitInputProps, "baseUnit" | "displayUnit"> & {
    displayUnit: LongDistanceUnit;
    baseUnit: LongDistanceUnit;
};

export const LongDistanceUnitInput = (props: LongDistanceUnitInputProps) => {
    return <DLDistanceUnitInput {...props} />;
};
