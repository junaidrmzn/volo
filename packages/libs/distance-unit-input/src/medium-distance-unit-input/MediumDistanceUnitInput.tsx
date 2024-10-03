import type { DistanceUnitInputProps } from "@volocopter/unit-inputs-react";
import { DistanceUnitInput as DLDistanceUnitInput } from "@volocopter/unit-inputs-react";
import type { MediumDistanceUnit } from "./MediumDistanceUnit";

export type MediumDistanceUnitInputProps = Omit<DistanceUnitInputProps, "baseUnit" | "displayUnit"> & {
    displayUnit: MediumDistanceUnit;
    baseUnit: MediumDistanceUnit;
};

export const MediumDistanceUnitInput = (props: MediumDistanceUnitInputProps) => {
    return <DLDistanceUnitInput {...props} />;
};
