import type { Property } from "@volocopter/filter-react";
import { match } from "ts-pattern";
import type {
    BooleanFilterProps,
    DateRangeFilterProps,
    FilterProps,
    MultiSelectFilterProps,
    NumberFilterProps,
    NumberRangeFilterProps,
    SelectFilterProps,
    TextFilterProps,
} from "@voloiq/filter-panel";

const group = "Workflows";

const booleanFilterToProperty = <Resource>(filter: BooleanFilterProps<Resource>): Property => {
    const {
        type,
        propertyName,
        propertyNameSerializer,
        displayName,
        falseLabel,
        trueLabel,
        comparisonOperator,
        isNull,
    } = filter;
    return {
        type,
        group,
        propertyName: propertyName.toString(),
        propertyNameSerializer,
        label: displayName,
        options: [
            { value: true, label: trueLabel },
            { value: false, label: falseLabel },
        ],
        comparisonOperator,
        isNull,
    };
};

const selectFilterToProperty = <Resource>(filter: SelectFilterProps<Resource>): Property => {
    const {
        type,
        propertyName,
        propertyNameSerializer,
        displayName,
        options = [],
        comparisonOperator,
        isNull,
    } = filter;
    const propertyOptions = options.map((option) => {
        const { label, value } = option;
        return { label: label ?? value.toString(), value };
    });
    return {
        type,
        group,
        propertyName: propertyName.toString(),
        propertyNameSerializer,
        label: displayName,
        options: propertyOptions,
        comparisonOperator,
        isNull,
    };
};

const multiSelectFilterToProperty = <Resource>(filter: MultiSelectFilterProps<Resource>): Property => {
    const { propertyName, propertyNameSerializer, displayName, options = [], comparisonOperator, isNull } = filter;
    const propertyOptions = options.map((option) => {
        const { label, value } = option;
        return { label: label ?? value.toString(), value };
    });
    return {
        type: "select-multiple",
        group,
        propertyName: propertyName.toString(),
        propertyNameSerializer,
        label: displayName,
        options: propertyOptions,
        comparisonOperator,
        isNull,
    };
};

const textFilterToProperty = <Resource>(filter: TextFilterProps<Resource>): Property => {
    const { type, propertyName, propertyNameSerializer, displayName, comparisonOperator, isNull } = filter;
    return {
        type,
        group,
        propertyName: propertyName.toString(),
        propertyNameSerializer,
        label: displayName,
        comparisonOperator,
        isNull,
    };
};

const dateRangeFilterToProperty = <Resource>(filter: DateRangeFilterProps<Resource>): Property => {
    const {
        propertyName,
        propertyNameSerializer,
        displayName,
        mode,
        useUtcTime,
        toLabel,
        fromLabel,
        comparisonOperator,
        isNull,
    } = filter;
    return {
        type: "date-range",
        group,
        propertyName: propertyName.toString(),
        propertyNameSerializer,
        label: displayName,
        mode,
        withUtcTime: useUtcTime,
        minLabel: fromLabel,
        maxLabel: toLabel,
        comparisonOperator,
        isNull,
    };
};

const numberRangeFilterToProperty = <Resource>(filter: NumberRangeFilterProps<Resource>): Property => {
    const { propertyName, propertyNameSerializer, displayName, toLabel, fromLabel, comparisonOperator, isNull } =
        filter;
    return {
        type: "number-range",
        group,
        propertyName: propertyName.toString(),
        propertyNameSerializer,
        label: displayName,
        minLabel: fromLabel,
        maxLabel: toLabel,
        comparisonOperator,
        isNull,
    };
};

const numberFilterToProperty = <Resource>(filter: NumberFilterProps<Resource>): Property => {
    const { type, propertyName, propertyNameSerializer, displayName, comparisonOperator, isNull } = filter;
    return {
        type,
        group,
        propertyName: propertyName.toString(),
        propertyNameSerializer,
        label: displayName,
        comparisonOperator,
        isNull,
    };
};

const filterToProperty = <Resource>(filter: FilterProps<Resource>): Property =>
    match(filter)
        .with({ type: "boolean" }, (filter) => booleanFilterToProperty<Resource>(filter))
        .with({ type: "select" }, (filter) => selectFilterToProperty<Resource>(filter))
        .with({ type: "multiSelect" }, (filter) => multiSelectFilterToProperty<Resource>(filter))
        .with({ type: "text" }, (filter) => textFilterToProperty<Resource>(filter))
        .with({ type: "number" }, (filter) => numberFilterToProperty<Resource>(filter))
        .with({ type: "numberRange" }, (filter) => numberRangeFilterToProperty<Resource>(filter))
        .with({ type: "range" }, (filter) => dateRangeFilterToProperty<Resource>(filter))
        .exhaustive();

export const transformFilterPropsToProperties = <Resource>(filters: FilterProps<Resource>[]): Property[] =>
    filters.map((filter) => filterToProperty<Resource>(filter));
