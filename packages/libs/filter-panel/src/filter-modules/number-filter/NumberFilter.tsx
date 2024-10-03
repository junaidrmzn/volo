import { FormLabel, NumberInput } from "@volocopter/design-library-react";
import { useController, useFormContext } from "react-hook-form";
import type { FilterProps, FormDataType } from "../../filter-panel";
import { FilterWrapper } from "../FilterWrapper";
import type { NumberFilterObject, NumberFilterProps, NumberFormDataType } from "./NumberFilterTypes";

export const createNumberFormData = <EntityType extends {}>(
    filter: NumberFilterProps<EntityType>,
    paramRecord: Record<string, string | string[]>
) => {
    const { type, propertyName } = filter;
    const value = paramRecord[`${type}-${propertyName}`];
    if (typeof value === "string") {
        const data: NumberFormDataType = {};
        data[`numberFilter${propertyName}`] = Number(value);
        return data;
    }
    return null;
};

export const createNumberFormObject = <EntityType extends {}>(
    filters: FilterProps<EntityType>[],
    numberFilter: NumberFilterObject<EntityType>
) => {
    const currentFilter = filters.find((filter) => filter.propertyName === numberFilter.propertyName);
    const numberFormObject: NumberFormDataType = {};
    if (currentFilter && numberFilter.isActive && numberFilter.value !== null) {
        numberFormObject[`numberFilter${currentFilter.propertyName}`] = numberFilter.value;
    }
    return numberFormObject;
};

export const createNumberFilterObject = <EntityType extends {}>(
    data: FormDataType,
    filterProp: NumberFilterProps<EntityType>
) => {
    let value = data[`numberFilter${filterProp.propertyName}`];
    if (typeof value === "string" && value) {
        value = Number.parseInt(value, 10);
    }
    const filter: NumberFilterObject<EntityType> = {
        type: "number",
        value: typeof value === "number" ? value : null,
        propertyName: filterProp.propertyName,
        propertyNameSerializer: filterProp.propertyNameSerializer,
        isActive: typeof value === "number",
        displayName: filterProp.displayName,
    };
    return filter;
};

export const NumberFilter = <EntityType extends {}>(props: NumberFilterProps<EntityType>) => {
    const { propertyName, displayName, min, max } = props;
    const { control } = useFormContext();

    const {
        field: { onChange, value, ref },
    } = useController({
        name: `numberFilter${propertyName}`,
        control,
        defaultValue: "",
    });

    return (
        <FilterWrapper>
            <FormLabel htmlFor={`numberFilter${propertyName}`}>{displayName}</FormLabel>
            <NumberInput
                id={`numberFilter${propertyName}`}
                ref={ref}
                value={value}
                onChange={onChange}
                min={min ? Number.parseFloat(min) : undefined}
                max={max ? Number.parseFloat(max) : undefined}
            />
        </FilterWrapper>
    );
};
