import type { DistanceValueWithUnitProps } from "@volocopter/unit-inputs-react";
import { DistanceValueWithUnit as DLDistanceValueWithUnit } from "@volocopter/unit-inputs-react";
import type { MediumDistanceUnit } from "./MediumDistanceUnit";

export type MediumDistanceValueWithUnitProps = Omit<DistanceValueWithUnitProps, "baseUnit" | "displayUnit"> & {
    displayUnit: MediumDistanceUnit;
    baseUnit: MediumDistanceUnit;
};

export const MediumDistanceValueWithUnit = (props: MediumDistanceValueWithUnitProps) => {
    return <DLDistanceValueWithUnit {...props} />;
};
