import type { Property } from "@volocopter/filter-react";
import { match } from "ts-pattern";
import type { FilterObject, FilterSet } from "@voloiq/filter-panel";
import { parseDate } from "../local-storage/parseDate";
import { parseNumber } from "../local-storage/parseNumber";

const mergePropertyWithFilterObject = <Resource>(
    property: Property,
    filterObject: FilterObject<Resource>
): Property => {
    return match<[Property, FilterObject<Resource>]>([property, filterObject])
        .with([{ type: "boolean" }, { type: "boolean" }], ([property, filterObject]) => {
            const { options } = property;
            const { value, comparisonOperator, isNull } = filterObject;
            const currentValue = options.find((option) => option.value === value);
            return { ...property, value: currentValue, comparisonOperator, isNull };
        })
        .with([{ type: "select" }, { type: "select" }], ([property, filterObject]) => {
            const { options } = property;
            const { value, comparisonOperator, isNull } = filterObject;
            const currentValue = options.find((option) => option.value.toString() === value.value.toString());
            return { ...property, value: currentValue, comparisonOperator, isNull };
        })
        .with([{ type: "select-multiple" }, { type: "multiSelect" }], ([property, filterObject]) => {
            const { options } = property;
            const { values, comparisonOperator, isNull } = filterObject;
            const currentValues = [];
            for (const option of values) {
                const selectedOption = options.find((entry) => entry.value.toString() === option.value.toString());
                if (!selectedOption) continue;
                const { value, label } = selectedOption;
                currentValues.push({ value, label });
            }

            return { ...property, value: currentValues, comparisonOperator, isNull };
        })
        .with([{ type: "text" }, { type: "text" }], ([property, filterObject]) => {
            const { value, comparisonOperator, isNull } = filterObject;
            return { ...property, value, comparisonOperator, isNull };
        })
        .with([{ type: "number" }, { type: "number" }], ([property, filterObject]) => {
            const { value, comparisonOperator, isNull } = filterObject;
            return { ...property, value: value ?? undefined, comparisonOperator, isNull };
        })
        .with([{ type: "number-range" }, { type: "numberRange" }], ([property, filterObject]) => {
            const { fromValue, toValue, comparisonOperator, isNull } = filterObject;
            const minValue = parseNumber(fromValue);
            const maxValue = parseNumber(toValue);
            const value = { minValue, maxValue };
            return {
                ...property,
                value,
                comparisonOperator,
                isNull,
            };
        })
        .with([{ type: "date-range" }, { type: "range" }], ([property, filterObject]) => {
            const { fromDate, toDate, comparisonOperator, isNull } = filterObject;
            const minValue = parseDate(fromDate);
            const maxValue = parseDate(toDate);
            const value = { minValue, maxValue };

            return { ...property, value, comparisonOperator, isNull };
        })
        .with([{ type: "date" }, { type: "range" }], ([property, filterObject]) => {
            // the old filter did not have a single-date type.
            // The new filter saves single dates as a date-range with the start and end date set to the same value
            const { fromDate, comparisonOperator, isNull } = filterObject;
            return { ...property, value: parseDate(fromDate), comparisonOperator, isNull };
        })
        .otherwise(() => property);
};

export const applyFilterSetToProperties = <Resource>(properties: Property[], filterSet: FilterSet<Resource>) => {
    const { filters } = filterSet;
    const mergedProperties = properties;

    for (const filter of filters) {
        const { propertyName } = filter;
        const propertyIndex = properties.findIndex((property) => property.propertyName === propertyName);

        const property = properties[propertyIndex];
        if (property) {
            const newProperty = mergePropertyWithFilterObject(property, filter);
            mergedProperties[propertyIndex] = newProperty;
        }
    }
    return mergedProperties;
};
