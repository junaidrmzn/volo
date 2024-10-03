import { FormControl, FormLabel, Input } from "@volocopter/design-library-react";
import { useController, useFormContext } from "react-hook-form";
import type { FilterProps, FormDataType } from "../../filter-panel";
import { FilterWrapper } from "../FilterWrapper";
import type { TextFilterObject, TextFilterProps, TextFormDataType } from "./TextFilterTypes";

export const createTextFormData = <EntityType extends {}>(
    filter: TextFilterProps<EntityType>,
    paramRecord: Record<string, string | string[]>
) => {
    const { type, propertyName } = filter;
    const value = paramRecord[`${type}-${propertyName}`];
    if (typeof value === "string") {
        const data: TextFormDataType = {};
        data[`textFilter${propertyName}`] = value;
        return data;
    }
    return null;
};

export const createTextFormObject = <EntityType extends {}>(
    filters: FilterProps<EntityType>[],
    textFilter: TextFilterObject<EntityType>
) => {
    const currentFilter = filters.find((filter) => filter.propertyName === textFilter.propertyName);
    const textFormObject: TextFormDataType = {};
    if (currentFilter) {
        textFormObject[`textFilter${currentFilter.propertyName}`] = textFilter.isActive ? textFilter.value : "";
    }
    return textFormObject;
};

export const createTextFilterObject = <EntityType extends {}>(
    data: FormDataType,
    filterProp: TextFilterProps<EntityType>
) => {
    const value = data[`textFilter${filterProp.propertyName}`];
    const filter: TextFilterObject<EntityType> = {
        type: "text",
        value: typeof value === "string" && value ? value : "",
        propertyName: filterProp.propertyName,
        propertyNameSerializer: filterProp.propertyNameSerializer,
        isActive: typeof value === "string" && value !== "",
        displayName: filterProp.displayName,
    };
    return filter;
};

export const TextFilter = <EntityType extends {}>(props: TextFilterProps<EntityType>) => {
    const { propertyName, displayName } = props;
    const { control } = useFormContext();

    const {
        field: { onChange, value, ref },
    } = useController({
        name: `textFilter${propertyName}`,
        control,
        defaultValue: "",
    });

    return (
        <FilterWrapper>
            <FormControl>
                <FormLabel>{displayName}</FormLabel>
                <Input value={value} ref={ref} onChange={onChange} />
            </FormControl>
        </FilterWrapper>
    );
};
