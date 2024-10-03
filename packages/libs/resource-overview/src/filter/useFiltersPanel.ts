import { useCallback, useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import type { FilterObject, FilterSet, FormDataType } from "@voloiq/filter-panel";
import { formDataToFilterSet, updateForm } from "@voloiq/filter-panel";
import { useGlobalState } from "../global-state/useGlobalState";
import type { BaseResource } from "../state-machine/BaseResource";
import { useFilterParameters } from "./useFilterParameters";

export const useFiltersPanel = <Resource extends BaseResource>() => {
    const [state, send] = useGlobalState();
    const {
        // eslint-disable-next-line @typescript-eslint/no-unnecessary-type-assertion
        context: { filters = [], appliedFilterSet = { filters: [] } },
        meta: {
            resourceOverview: { getResourceName },
        },
    } = state;

    const defaultValues = Object.fromEntries(
        // eslint-disable-next-line @typescript-eslint/no-unnecessary-type-assertion
        (filters as FilterObject<Resource>[]).map((filter) => [filter.propertyName, ""])
    );
    const formData = useForm<FormDataType>({
        defaultValues,
    });
    const { reset, setValue, getValues } = formData;

    const { filterSet: initialFilterSet, setFilterSet: setParameterFilterSet } = useFilterParameters(
        getResourceName(),
        filters
    );

    const [filterSet, setFilterSet] = useState(initialFilterSet ?? { filters: [] });

    useEffect(() => {
        setFilterSet(appliedFilterSet);
    }, [appliedFilterSet]);

    // Update the form values based on the applied filter set
    useEffect(() => {
        setFilterSet(initialFilterSet);
        updateForm<Resource>(initialFilterSet, setValue, filters, reset);
    }, [initialFilterSet, filters, reset, setValue]);

    const applyFilters = useCallback(() => {
        const appliedFilterSet = {
            filters: formDataToFilterSet(getValues(), filters),
        };
        setFilterSet(appliedFilterSet);
        setParameterFilterSet(appliedFilterSet);
        send("APPLY_FILTER", { appliedFilterSet });
    }, [filters, getValues, send, setParameterFilterSet]);

    const deleteFilter = useCallback(
        (filterSet) => {
            const updatedFilterSet: FilterSet<Resource> = {
                filters: formDataToFilterSet<Resource>(getValues(), filterSet.filters),
            };
            setFilterSet(updatedFilterSet);
            updateForm<Resource>(updatedFilterSet, setValue, filters, reset);
        },
        [filters, setValue, getValues, reset]
    );

    return { filters, filterSet, deleteFilter, applyFilters, formData, reset };
};
