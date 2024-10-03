import type { FilterProps, FormDataType } from "../../filter-panel";
import { Select } from "../../form-fields";
import { FilterWrapper } from "../FilterWrapper";
import type {
    MultiSelectFilterObject,
    MultiSelectFilterProps,
    MultiSelectFormDataType,
} from "./MultiSelectFilterTypes";

export const createMultiSelectFormData = <EntityType extends {}>(
    filter: MultiSelectFilterProps<EntityType>,
    paramRecord: Record<string, string | string[]>
) => {
    const { propertyName, type, options, asyncSelectCallback } = filter;
    let filterValue = paramRecord[`${type}-${propertyName}`];

    if (!Array.isArray(filterValue)) {
        if (typeof filterValue === "string") {
            filterValue = filterValue.split("|");
        } else {
            return null;
        }
    }
    const value: string[] = [];
    if (!Array.isArray(filterValue)) {
        return null;
    }
    value.push(...filterValue);
    const data: MultiSelectFormDataType = {};
    const multiSelectOptions = options?.filter((option) => value.includes(option.value));

    if (multiSelectOptions && multiSelectOptions.length > 0) {
        data[`multiSelect${propertyName}`] = multiSelectOptions;
    } else if (!multiSelectOptions && asyncSelectCallback) {
        data[`multiSelect${propertyName}`] = value.map((value) => ({ value, label: value }));
    } else {
        data[`multiSelect${propertyName}`] = value.map((value) => ({ value }));
    }
    return data;
};

export const createMultiSelectFormObject = <EntityType extends {}>(
    filters: FilterProps<EntityType>[],
    selectFilter: MultiSelectFilterObject<EntityType>
) => {
    const currentFilter = filters.find((filter) => filter.propertyName === selectFilter.propertyName);
    const selectFormObject: MultiSelectFormDataType = {};
    if (currentFilter) {
        selectFormObject[`multiSelect${currentFilter.propertyName}`] = selectFilter.values;
    }

    return selectFormObject;
};

export const createMultiSelectFilterObject = <EntityType extends {}>(
    data: FormDataType,
    filterProp: MultiSelectFilterProps<EntityType>
) => {
    const selectValue = data[`multiSelect${filterProp.propertyName}`];
    const filter: MultiSelectFilterObject<EntityType> = {
        propertyName: filterProp.propertyName,
        propertyNameSerializer: filterProp.propertyNameSerializer,
        type: "multiSelect",
        values: selectValue && Array.isArray(selectValue) ? selectValue : [],
        isActive: !!selectValue && Array.isArray(selectValue) && selectValue.length > 0,
        displayName: filterProp.displayName,
    };
    return filter;
};

export const MultiSelectFilter = <EntityType extends {}>(props: MultiSelectFilterProps<EntityType>) => {
    const { propertyName, options, asyncSelectCallback, displayName } = props;

    return (
        <FilterWrapper>
            <Select
                label={displayName}
                name={`multiSelect${propertyName}`}
                options={options}
                asyncSelectCallback={asyncSelectCallback}
                isMulti
            />
        </FilterWrapper>
    );
};
