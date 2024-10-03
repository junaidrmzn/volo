import type { DateTimeInputMode } from "@volocopter/date-time-input-react";
import { FormLabel, Stack } from "@volocopter/design-library-react";
import { isValidDate } from "@voloiq/utils";
import type { FilterProps, FormDataType } from "../../filter-panel";
import { DatePicker } from "../../form-fields";
import { FilterWrapper } from "../FilterWrapper";
import type { DateRangeFilterObject, DateRangeFilterProps, DateRangeFormDataType } from "./DateRangeTypes";

export const createRangeFormData = <EntityType extends {}>(
    filter: DateRangeFilterProps<EntityType>,
    paramRecord: Record<string, string | string[]>
) => {
    const data: DateRangeFormDataType = {};
    const { type, propertyName } = filter;
    const fromDateString = paramRecord[`${type}-${propertyName}RangeFrom`];
    const toDateString = paramRecord[`${type}-${propertyName}RangeTo`];
    if (typeof fromDateString === "string" && isValidDate(new Date(fromDateString))) {
        data[`from${propertyName}`] = new Date(fromDateString);
    }

    if (typeof toDateString === "string" && isValidDate(new Date(toDateString))) {
        data[`to${propertyName}`] = new Date(toDateString);
    }

    if (Object.keys(data).length === 0) {
        return null;
    }
    return data;
};

export const createRangeFormObject = <EntityType extends {}>(
    filters: FilterProps<EntityType>[],
    rangeFilter: DateRangeFilterObject<EntityType>
) => {
    const currentFilter = filters.find((filter) => filter.propertyName === rangeFilter.propertyName);
    const rangeFormObject: DateRangeFormDataType = {};
    if (currentFilter) {
        if (rangeFilter.fromDate) {
            rangeFormObject[`from${currentFilter.propertyName}`] = new Date(rangeFilter.fromDate);
        }
        if (rangeFilter.toDate) {
            rangeFormObject[`to${currentFilter.propertyName}`] = new Date(rangeFilter.toDate);
        }
    }
    return rangeFormObject;
};

const getDateString = (date: Date, mode?: DateTimeInputMode) => {
    if (mode === "date") {
        return date.toISOString().split("T")[0];
    }
    return date.toISOString();
};

export const createRangeFilterObject = <EntityType extends {}>(
    data: FormDataType,
    filterProp: DateRangeFilterProps<EntityType>
) => {
    const fromDate = data[`from${filterProp.propertyName}`];
    const toDate = data[`to${filterProp.propertyName}`];

    const filter: DateRangeFilterObject<EntityType> = {
        type: "range",
        fromDate: fromDate && fromDate instanceof Date ? getDateString(fromDate, filterProp.mode) : "",
        toDate: toDate && toDate instanceof Date ? getDateString(toDate, filterProp.mode) : "",
        propertyName: filterProp.propertyName,
        propertyNameSerializer: filterProp.propertyNameSerializer,
        isActive: !!fromDate || !!toDate,
        displayName: filterProp.displayName,
        mode: filterProp.mode,
        useUtcTime: filterProp.useUtcTime,
    };
    return filter;
};

export const DateRangeFilter = <EntityType extends {}>(props: DateRangeFilterProps<EntityType>) => {
    const { displayName, propertyName, fromLabel, toLabel, useUtcTime, mode } = props;

    return (
        <FilterWrapper role="group" aria-label={displayName}>
            <FormLabel>{displayName}</FormLabel>
            <Stack direction={{ base: "row", md: "column" }}>
                <DatePicker label={fromLabel} name={`from${propertyName}`} useUtcTime={useUtcTime} mode={mode} />
                <DatePicker label={toLabel} name={`to${propertyName}`} useUtcTime={useUtcTime} mode={mode} />
            </Stack>
        </FilterWrapper>
    );
};
