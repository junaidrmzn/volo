import { useEffect, useState } from "react";
import type { SubmitHandler } from "react-hook-form";
import { useForm } from "react-hook-form";
import { match } from "ts-pattern";
import {
    createBooleanFilterObject,
    createMultiSelectFilterObject,
    createNumberFilterObject,
    createNumberRangeFilterObject,
    createRangeFilterObject,
    createSelectFilterObject,
    createTextFilterObject,
} from "../filter-modules";
import type { FilterObject, FilterProps, FilterSet, FormDataType } from "./FilterPanelTypes";
import { updateForm } from "./FormFunctions";

export type UseFilterMenuProps<EntityType> = {
    activeFilterSet: FilterSet<EntityType>;
    onChange: (filterSet: FilterSet<EntityType>) => void;
    onCancel: () => void;
    filters: FilterProps<EntityType>[];
};

export const formDataToFilterSet = <EntityType>(
    formData: FormDataType,
    filters: FilterProps<EntityType>[]
): FilterObject<EntityType>[] =>
    filters
        .map((filter) =>
            match(filter)
                .with({ type: "range" }, (rangeFilter) => createRangeFilterObject(formData, rangeFilter))
                .with({ type: "numberRange" }, (numberRangeFilter) =>
                    createNumberRangeFilterObject(formData, numberRangeFilter)
                )
                .with({ type: "select" }, (selectFilter) => createSelectFilterObject(formData, selectFilter))
                .with({ type: "multiSelect" }, (selectFilter) => createMultiSelectFilterObject(formData, selectFilter))
                .with({ type: "boolean" }, (booleanFilter) => createBooleanFilterObject(formData, booleanFilter))
                .with({ type: "text" }, (textFilter) => createTextFilterObject(formData, textFilter))
                .with({ type: "number" }, (numberFilter) => createNumberFilterObject(formData, numberFilter))
                .exhaustive()
        )
        .filter((filter) => filter.isActive);

export const useFilterPanel = <EntityType>(props: UseFilterMenuProps<EntityType>) => {
    const { activeFilterSet, onChange, filters, onCancel } = props;
    const [currentFilterSet, setCurrentFilterSet] = useState<FilterSet<EntityType>>(activeFilterSet);
    const formData = useForm<FormDataType>();
    const { handleSubmit, setValue, reset } = formData;

    useEffect(() => {
        setCurrentFilterSet(activeFilterSet);
        updateForm(activeFilterSet, setValue, filters, reset);
    }, [activeFilterSet, filters, reset, setCurrentFilterSet, setValue]);

    const handleDeleteFilter = (filterSet: FilterSet<EntityType>) => {
        setCurrentFilterSet(filterSet);
        updateForm(filterSet, setValue, filters, reset);
    };

    const handleFormSubmit: SubmitHandler<FormDataType> = (data) => {
        const filterSet: FilterSet<EntityType> = {
            filters: formDataToFilterSet(data, filters),
        };
        onChange(filterSet);
        setCurrentFilterSet(filterSet);
    };

    const handleOnCancel = () => {
        setCurrentFilterSet(activeFilterSet);
        updateForm(activeFilterSet, setValue, filters, reset);
        onCancel();
    };

    return {
        currentFilterSet,
        setCurrentFilterSet,
        handleSubmit,
        handleDeleteFilter,
        handleFormSubmit,
        formData,
        handleOnCancel,
    };
};
