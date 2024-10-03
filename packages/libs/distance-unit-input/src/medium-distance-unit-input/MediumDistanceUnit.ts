import type { DistanceUnitInputProps } from "@volocopter/unit-inputs-react";

type DistanceUnitInputPropsBaseUnit = Pick<DistanceUnitInputProps, "baseUnit">;
export type MediumDistanceUnit = Extract<DistanceUnitInputPropsBaseUnit["baseUnit"], "m" | "ft">;
