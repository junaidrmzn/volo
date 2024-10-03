import type { FilterProps, FormDataType } from "../../filter-panel";
import { Select } from "../../form-fields";
import { isSelectOption } from "../../form-fields/SelectTypes.guard";
import { FilterWrapper } from "../FilterWrapper";
import type { SelectFilterObject, SelectFilterProps, SelectFormDataType } from "./SelectFilterTypes";

export const createSelectFormData = <EntityType extends {}>(
    filter: SelectFilterProps<EntityType>,
    paramRecord: Record<string, string | string[]>
) => {
    const { propertyName, type, options, asyncSelectCallback } = filter;
    const value = paramRecord[`${type}-${propertyName}`];
    if (typeof value !== "string") {
        return null;
    }
    const data: SelectFormDataType = {};
    const option = options?.find((option) => option.value === value);

    if (option) {
        data[`select${propertyName}`] = option;
    } else if (!option && asyncSelectCallback) {
        data[`select${propertyName}`] = { value, label: value };
    } else {
        data[`select${propertyName}`] = { value };
    }
    return data;
};

export const createSelectFormObject = <EntityType extends {}>(
    filters: FilterProps<EntityType>[],
    selectFilter: SelectFilterObject<EntityType>
) => {
    const currentFilter = filters.find((filter) => filter.propertyName === selectFilter.propertyName);
    const selectFormObject: SelectFormDataType = {};
    if (currentFilter) {
        selectFormObject[`select${currentFilter.propertyName}`] = selectFilter.value;
    }
    return selectFormObject;
};

export const createSelectFilterObject = <EntityType extends {}>(
    data: FormDataType,
    filterProp: SelectFilterProps<EntityType>
) => {
    const selectValue = data[`select${filterProp.propertyName}`];
    const filter: SelectFilterObject<EntityType> = {
        propertyName: filterProp.propertyName,
        propertyNameSerializer: filterProp.propertyNameSerializer,
        type: "select",
        value: selectValue && isSelectOption(selectValue) ? selectValue : { label: "", value: "" },
        isActive: !!selectValue && isSelectOption(selectValue),
        displayName: filterProp.displayName,
    };
    return filter;
};

export const SelectFilter = <EntityType extends {}>(props: SelectFilterProps<EntityType>) => {
    const { propertyName, options, asyncSelectCallback, displayName } = props;

    return (
        <FilterWrapper>
            <Select
                label={displayName}
                name={`select${propertyName}`}
                options={options}
                asyncSelectCallback={asyncSelectCallback}
            />
        </FilterWrapper>
    );
};
