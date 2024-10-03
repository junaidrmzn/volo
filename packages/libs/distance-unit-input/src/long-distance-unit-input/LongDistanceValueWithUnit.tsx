import type { DistanceValueWithUnitProps } from "@volocopter/unit-inputs-react";
import { DistanceValueWithUnit as DLDistanceValueWithUnit } from "@volocopter/unit-inputs-react";
import type { LongDistanceUnit } from "./LongDistanceUnit";

export type LongDistanceValueWithUnitProps = Omit<DistanceValueWithUnitProps, "baseUnit" | "displayUnit"> & {
    displayUnit: LongDistanceUnit;
    baseUnit: LongDistanceUnit;
};

export const LongDistanceValueWithUnit = (props: LongDistanceValueWithUnitProps) => {
    return <DLDistanceValueWithUnit {...props} />;
};
