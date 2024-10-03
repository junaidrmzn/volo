import { FormLabel, Radio, RadioGroup, Stack } from "@volocopter/design-library-react";
import { useController, useFormContext } from "react-hook-form";
import type { FilterProps, FormDataType } from "../../filter-panel";
import { FilterWrapper } from "../FilterWrapper";
import type { BooleanFilterObject, BooleanFilterProps, BooleanFormDataType } from "./BooleanFilterTypes";

export const createBooleanFormData = <EntityType extends {}>(
    filter: BooleanFilterProps<EntityType>,
    paramRecord: Record<string, string | string[]>
) => {
    const { type, propertyName } = filter;
    const value = paramRecord[`${type}-${propertyName}`];
    if (typeof value === "string" && (value === "true" || value === "false")) {
        const data: BooleanFormDataType = {};
        data[`booleanRadioGroup${propertyName}`] = value;
        return data;
    }
    return null;
};

export const createBooleanFormObject = <EntityType extends {}>(
    filters: FilterProps<EntityType>[],
    booleanFilter: BooleanFilterObject<EntityType>
) => {
    const currentFilter = filters.find((filter) => filter.propertyName === booleanFilter.propertyName);
    const booleanFormObject: BooleanFormDataType = {};
    if (currentFilter) {
        booleanFormObject[`booleanRadioGroup${currentFilter.propertyName}`] = booleanFilter.isActive
            ? booleanFilter.value.toString()
            : "neutral";
    }
    return booleanFormObject;
};

export const createBooleanFilterObject = <EntityType extends {}>(
    data: FormDataType,
    filterProp: BooleanFilterProps<EntityType>
) => {
    const value = data[`booleanRadioGroup${filterProp.propertyName}`];
    const filter: BooleanFilterObject<EntityType> = {
        type: "boolean",
        value: typeof value === "string" ? value === "true" : false,
        propertyName: filterProp.propertyName,
        propertyNameSerializer: filterProp.propertyNameSerializer,
        isActive: typeof value === "string" && value !== "neutral" && (value === "true" || value === "false"),
        displayName: filterProp.displayName,
        trueLabel: filterProp.trueLabel,
        falseLabel: filterProp.falseLabel,
    };
    return filter;
};

export const BooleanFilter = <EntityType extends {}>(props: BooleanFilterProps<EntityType>) => {
    const { propertyName, displayName, trueLabel, neutralLabel, falseLabel } = props;
    const { control } = useFormContext();

    const {
        field: { onChange, value, ref },
    } = useController({
        name: `booleanRadioGroup${propertyName}`,
        control,
        defaultValue: "neutral",
    });

    return (
        <FilterWrapper>
            <FormLabel htmlFor={`radioGroup${propertyName}`} mb="0">
                {displayName}
            </FormLabel>
            <RadioGroup
                onChange={onChange}
                id={`radioGroup${propertyName}`}
                name={`booleanRadioGroup${propertyName}`}
                value={value}
                ref={ref}
            >
                <Stack direction="row">
                    <Radio value="neutral">{neutralLabel}</Radio>
                    <Radio value="true">{trueLabel}</Radio>
                    <Radio value="false">{falseLabel}</Radio>
                </Stack>
            </RadioGroup>
        </FilterWrapper>
    );
};
