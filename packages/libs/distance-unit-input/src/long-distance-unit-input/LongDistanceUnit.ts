import type { DistanceUnitInputProps } from "@volocopter/unit-inputs-react";

type DistanceUnitInputPropsBaseUnit = Pick<DistanceUnitInputProps, "baseUnit">;
export type LongDistanceUnit = Extract<DistanceUnitInputPropsBaseUnit["baseUnit"], "km" | "mi" | "nm">;
