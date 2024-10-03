import type { DistanceValueWithUnitProps } from "@volocopter/unit-inputs-react";
import { DistanceValueWithUnit as DLDistanceValueWithUnit } from "@volocopter/unit-inputs-react";
import type { ShortDistanceUnit } from "./ShortDistanceUnit";

export type ShortDistanceValueWithUnitProps = Omit<DistanceValueWithUnitProps, "baseUnit" | "displayUnit"> & {
    displayUnit: ShortDistanceUnit;
    baseUnit: ShortDistanceUnit;
};

export const ShortDistanceValueWithUnit = (props: ShortDistanceValueWithUnitProps) => {
    return <DLDistanceValueWithUnit {...props} />;
};
