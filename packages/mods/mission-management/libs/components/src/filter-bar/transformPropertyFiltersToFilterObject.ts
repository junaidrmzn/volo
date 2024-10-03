import type {
    BooleanFilter,
    DateFilter,
    NumberFilter,
    PropertyFilter,
    SelectFilter,
    SelectMultipleFilter,
    TextFilter,
} from "@volocopter/filter-react";
import { match } from "ts-pattern";

const toBooleanFilterObject = (filter: BooleanFilter & PropertyFilter): { [x: string]: boolean } => {
    const {
        value: { value },
        propertyName,
    } = filter;
    return {
        [propertyName]: value,
    };
};

const toTextFilterObject = (filter: TextFilter & PropertyFilter): { [x: string]: string } => {
    const { value, propertyName } = filter;
    return {
        [propertyName]: value,
    };
};

const toNumberFilterObject = (filter: NumberFilter & PropertyFilter): { [x: string]: number } => {
    const { value, propertyName } = filter;
    return {
        [propertyName]: value,
    };
};

const toSelectFilterObject = (filter: SelectFilter & PropertyFilter): { [x: string]: string } => {
    const { value: selectedOption, propertyName } = filter;
    return {
        [propertyName]: selectedOption.value.toLocaleString(),
    };
};

const toMultiSelectFilterObject = (filter: SelectMultipleFilter & PropertyFilter): { [x: string]: string[] } => {
    const { value: values, propertyName } = filter;
    return {
        [propertyName]: values.map((entry) => entry.value.toLocaleString()),
    };
};

const toDateFilterObject = (filter: DateFilter & PropertyFilter): { [x: string]: string } => {
    const { value, propertyName } = filter;
    return {
        [propertyName]: value.toISOString(),
    };
};

const propertyFilterToFilterObject = (filter: PropertyFilter): { [x: string]: number | string | boolean | string[] } =>
    match(filter)
        .with({ type: "boolean" }, toBooleanFilterObject)
        .with({ type: "select" }, toSelectFilterObject)
        .with({ type: "select-multiple" }, toMultiSelectFilterObject)
        .with({ type: "text" }, toTextFilterObject)
        .with({ type: "number" }, { type: "number-range" }, toNumberFilterObject)
        .with({ type: "date" }, { type: "date-range" }, toDateFilterObject)
        .exhaustive();

export const transformPropertyFiltersToFilterObject = (
    propertyFilters: PropertyFilter[]
): { [x: string]: string | number | boolean | string[] } =>
    propertyFilters
        .map((filter) => propertyFilterToFilterObject(filter))
        // eslint-disable-next-line unicorn/prefer-object-from-entries, unicorn/no-array-reduce
        .reduce((accumulator, currentValue) => ({ ...accumulator, ...currentValue }), {});
