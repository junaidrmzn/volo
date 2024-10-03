import type { DistanceUnitInputProps } from "@volocopter/unit-inputs-react";

type DistanceUnitInputPropsBaseUnit = Pick<DistanceUnitInputProps, "baseUnit">;
export type ShortDistanceUnit = Extract<DistanceUnitInputPropsBaseUnit["baseUnit"], "mm" | "in">;
