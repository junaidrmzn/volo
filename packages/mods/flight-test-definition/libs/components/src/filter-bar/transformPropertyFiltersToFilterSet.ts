import type {
    BooleanFilter,
    DateFilter,
    DateRangeFilter,
    NumberFilter,
    NumberRangeFilter,
    PropertyFilter,
    SelectFilter,
    SelectMultipleFilter,
    TextFilter,
} from "@volocopter/filter-react";
import { match } from "ts-pattern";
import type {
    BooleanFilterObject,
    DateRangeFilterObject,
    FilterObject,
    FilterSet,
    MultiSelectFilterObject,
    NumberFilterObject,
    NumberRangeFilterObject,
    SelectFilterObject,
    SelectOption,
    TextFilterObject,
} from "@voloiq/filter-panel";

const toBooleanFilterObject = <Resource>(filter: BooleanFilter & PropertyFilter): BooleanFilterObject<Resource> => {
    const {
        type,
        value: { value, label },
        label: displayName,
        propertyName,
        propertyNameSerializer,
    } = filter;
    return {
        type,
        displayName,
        value,
        trueLabel: value ? label : "",
        falseLabel: value ? "" : label,
        propertyName,
        propertyNameSerializer,
        isActive: true,
    };
};

const toTextFilterObject = <Resource>(filter: TextFilter & PropertyFilter): TextFilterObject<Resource> => {
    const { type, value, label: displayName, propertyName, propertyNameSerializer } = filter;
    return {
        type,
        displayName,
        value,
        propertyName,
        propertyNameSerializer,
        isActive: true,
    };
};

const toNumberFilterObject = <Resource>(filter: NumberFilter & PropertyFilter): NumberFilterObject<Resource> => {
    const { type, value, label: displayName, propertyName, propertyNameSerializer } = filter;
    return {
        type,
        displayName,
        value,
        propertyName,
        propertyNameSerializer,
        isActive: true,
    };
};

const toNumberRangeFilterObject = <Resource>(
    filter: NumberRangeFilter & PropertyFilter
): NumberRangeFilterObject<Resource> => {
    const { value, label: displayName, propertyName, propertyNameSerializer } = filter;
    const { minValue, maxValue } = value;
    return {
        type: "numberRange",
        displayName,
        propertyName,
        propertyNameSerializer,
        fromValue: minValue?.toString(),
        toValue: maxValue?.toString(),
        isActive: true,
    };
};

const toDateFilterObject = <Resource>(filter: DateFilter & PropertyFilter): DateRangeFilterObject<Resource> => {
    const { value, label: displayName, propertyName, propertyNameSerializer } = filter;
    return {
        type: "range",
        displayName,
        propertyName,
        propertyNameSerializer,
        isActive: true,
        fromDate: value.toISOString(),
        toDate: value.toISOString(),
    };
};

const toDateRangeFilterObject = <Resource>(
    filter: DateRangeFilter & PropertyFilter
): DateRangeFilterObject<Resource> => {
    const { value, label: displayName, propertyName, propertyNameSerializer } = filter;
    const { minValue, maxValue } = value;
    return {
        type: "range",
        displayName,
        fromDate: minValue?.toISOString(),
        toDate: maxValue?.toISOString(),
        propertyName,
        propertyNameSerializer,
        isActive: true,
    };
};

const toSelectFilterObject = <Resource>(filter: SelectFilter & PropertyFilter): SelectFilterObject<Resource> => {
    const { type, value: selectedOption, label: displayName, propertyName, propertyNameSerializer } = filter;
    const value: SelectOption = { value: selectedOption.value.toLocaleString(), label: selectedOption.label };
    return {
        type,
        displayName,
        propertyName,
        propertyNameSerializer,
        isActive: true,
        value,
    };
};

const toMultiSelectFilterObject = <Resource>(
    filter: SelectMultipleFilter & PropertyFilter
): MultiSelectFilterObject<Resource> => {
    const { value: values, label: displayName, propertyName, propertyNameSerializer } = filter;
    const selectOptions: SelectOption[] = values.map((entry) => ({
        value: entry.value.toLocaleString(),
        label: entry.label,
    }));
    return {
        type: "multiSelect",
        displayName,
        propertyName,
        propertyNameSerializer,
        isActive: true,
        values: selectOptions,
    };
};

const propertyFilterToFilterObject = <Resource>(filter: PropertyFilter): FilterObject<Resource> =>
    match(filter)
        .with({ type: "boolean" }, toBooleanFilterObject)
        .with({ type: "select" }, toSelectFilterObject)
        .with({ type: "select-multiple" }, toMultiSelectFilterObject)
        .with({ type: "text" }, toTextFilterObject)
        .with({ type: "number" }, toNumberFilterObject)
        .with({ type: "number-range" }, toNumberRangeFilterObject)
        .with({ type: "date" }, toDateFilterObject)
        .with({ type: "date-range" }, toDateRangeFilterObject)
        .exhaustive();

export const transformPropertyFiltersToFilterSet = <Resource>(
    propertyFilters: PropertyFilter[]
): FilterSet<Resource> => ({
    filters: propertyFilters.map((filter) => propertyFilterToFilterObject<Resource>(filter)),
});
