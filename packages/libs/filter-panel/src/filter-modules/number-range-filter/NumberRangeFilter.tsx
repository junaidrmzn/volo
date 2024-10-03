import { FormLabel, Stack } from "@volocopter/design-library-react";
import type { FilterProps, FormDataType } from "../../filter-panel";
import { NumberInput } from "../../form-fields";
import { FilterWrapper } from "../FilterWrapper";
import type { NumberRangeFilterObject, NumberRangeFilterProps, NumberRangeFormDataType } from "./NumberRangeTypes";

export const createNumberRangeFormData = <EntityType extends {}>(
    filter: NumberRangeFilterProps<EntityType>,
    paramRecord: Record<string, string | string[]>
) => {
    const data: NumberRangeFormDataType = {};
    const { type, propertyName } = filter;
    const fromNumberString = paramRecord[`${type}-${propertyName}RangeFrom`];
    const toNumberString = paramRecord[`${type}-${propertyName}RangeTo`];
    if (typeof fromNumberString === "string" && !Number.isNaN(fromNumberString)) {
        data[`from${propertyName}`] = +fromNumberString;
    }

    if (typeof toNumberString === "string" && !Number.isNaN(toNumberString)) {
        data[`to${propertyName}`] = +toNumberString;
    }

    if (Object.keys(data).length === 0) {
        return null;
    }
    return data;
};

export const createNumberRangeFormObject = <EntityType extends {}>(
    filters: FilterProps<EntityType>[],
    rangeFilter: NumberRangeFilterObject<EntityType>
) => {
    const currentFilter = filters.find((filter) => filter.propertyName === rangeFilter.propertyName);
    const rangeFormObject: NumberRangeFormDataType = {};
    if (currentFilter) {
        if (rangeFilter.fromValue) {
            rangeFormObject[`from${currentFilter.propertyName}`] = +rangeFilter.fromValue;
        }
        if (rangeFilter.toValue) {
            rangeFormObject[`to${currentFilter.propertyName}`] = +rangeFilter.toValue;
        }
    }
    return rangeFormObject;
};

export const createNumberRangeFilterObject = <EntityType extends {}>(
    data: FormDataType,
    filterProp: NumberRangeFilterProps<EntityType>
) => {
    const fromNumber = data[`from${filterProp.propertyName}`];
    const toNumber = data[`to${filterProp.propertyName}`];
    const filter: NumberRangeFilterObject<EntityType> = {
        type: "numberRange",
        fromValue: fromNumber ? `${fromNumber}` : "",
        toValue: toNumber ? `${toNumber}` : "",
        propertyName: filterProp.propertyName,
        propertyNameSerializer: filterProp.propertyNameSerializer,
        isActive: !!fromNumber || !!toNumber,
        displayName: filterProp.displayName,
    };
    return filter;
};

export const NumberRangeFilter = <EntityType extends {}>(props: NumberRangeFilterProps<EntityType>) => {
    const { displayName, propertyName, fromLabel, toLabel, min, max } = props;

    return (
        <FilterWrapper role="group" aria-label={displayName}>
            <FormLabel>{displayName}</FormLabel>
            <Stack direction={{ base: "row", md: "column" }}>
                <NumberInput label={fromLabel} name={`from${propertyName}`} min={min} max={max} />
                <NumberInput label={toLabel} name={`to${propertyName}`} min={min} max={max} />
            </Stack>
        </FilterWrapper>
    );
};
