import type { Property } from "@volocopter/filter-react";
import { match } from "ts-pattern";

// stay backwards compatible with the parameter format from the old filter
const propertyTypeToParameterType = (propertyType: Property["type"]): string =>
    match(propertyType)
        .with("date", "date-range", () => "range")
        .with("number-range", () => "numberRange")
        .with("select-multiple", () => "multiSelect")
        .otherwise(() => propertyType);

const minRangeSuffix = "RangeFrom";
const maxRangeSuffix = "RangeTo";
export type RangeSuffix = "min" | "max";

const getRangeSuffix = (rangeSuffix?: RangeSuffix) =>
    match(rangeSuffix)
        .with("min", () => minRangeSuffix)
        .with("max", () => maxRangeSuffix)
        .otherwise(() => "");

export const getParameterIdentifier = (
    type: Property["type"],
    propertyName: string,
    rangeSuffix?: RangeSuffix
): string => {
    return `${propertyTypeToParameterType(type)}-${propertyName}${getRangeSuffix(rangeSuffix)}`;
};
