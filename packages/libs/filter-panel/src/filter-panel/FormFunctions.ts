import type { UseFormReset, UseFormSetValue } from "react-hook-form";
import { match } from "ts-pattern";
import {
    createBooleanFormObject,
    createMultiSelectFormObject,
    createNumberFormObject,
    createNumberRangeFormObject,
    createRangeFormObject,
    createSelectFormObject,
    createTextFormObject,
} from "../filter-modules";
import type { FilterProps, FilterSet, FormDataType } from "./FilterPanelTypes";

export const setFormValues = (formObject: FormDataType, setValue: UseFormSetValue<FormDataType>) => {
    for (const [key, value] of Object.entries(formObject)) {
        setValue(key, value);
    }
};

export const createFormObjectFromFilterSet = <EntityType extends {}>(
    filterSet: FilterSet<EntityType>,
    filters: FilterProps<EntityType>[]
) => {
    const formObjects = filterSet.filters.map((filterObject) => {
        return match(filterObject)
            .with({ type: "range" }, (rangeFilter) => createRangeFormObject<EntityType>(filters, rangeFilter))
            .with({ type: "numberRange" }, (numberRangeFilter) =>
                createNumberRangeFormObject<EntityType>(filters, numberRangeFilter)
            )
            .with({ type: "select" }, (selectFilter) => createSelectFormObject<EntityType>(filters, selectFilter))
            .with({ type: "multiSelect" }, (selectFilter) =>
                createMultiSelectFormObject<EntityType>(filters, selectFilter)
            )
            .with({ type: "boolean" }, (booleanFilter) => createBooleanFormObject<EntityType>(filters, booleanFilter))
            .with({ type: "text" }, (textFilter) => createTextFormObject<EntityType>(filters, textFilter))
            .with({ type: "number" }, (numberFilter) => createNumberFormObject<EntityType>(filters, numberFilter))
            .exhaustive();
    });

    // eslint-disable-next-line unicorn/no-array-reduce,unicorn/prefer-object-from-entries, @typescript-eslint/no-unnecessary-type-assertion
    return formObjects.reduce(
        (accumulator, currentValue) => Object.assign(accumulator, currentValue),
        {}
    ) as FormDataType;
};

export const updateForm = <EntityType>(
    updatedFilterSet: FilterSet<EntityType>,
    setValue: UseFormSetValue<FormDataType>,
    filters: FilterProps<EntityType>[],
    reset: UseFormReset<FormDataType>
) => {
    const updatedFormValues = createFormObjectFromFilterSet(updatedFilterSet, filters);
    reset();
    setFormValues(updatedFormValues, setValue);
};
