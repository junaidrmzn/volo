import { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";
import type { FilterProps, FilterSet } from "./filter-panel";
import { getFilterParameters, getFilterSetFromParameters } from "./utils/parameter-transformer";

const updateFilterSetLabels = <Entity>(currentFilterSet: FilterSet<Entity>, filters: FilterProps<Entity>[]) => {
    const filterSetClone = JSON.parse(JSON.stringify(currentFilterSet));
    const { filters: filterObjects } = filterSetClone;

    let hasBeenUpdated = false;
    for (const filterObject of filterObjects) {
        const filterProp = filters.find((filterProp) => filterProp.propertyName === filterObject.propertyName);
        if (
            filterObject.type === "select" &&
            filterProp &&
            filterProp.type === "select" &&
            filterProp.options &&
            !filterObject.value.label
        ) {
            const filterOption = filterProp.options.find((option) => option.value === filterObject.value.value);
            if (filterOption) {
                hasBeenUpdated = true;
                filterObject.value.label = filterOption.label;
            }
        }
    }
    return { updatedFilterSet: filterSetClone, hasBeenUpdated };
};

const getSearchParamRecord = (searchParams: URLSearchParams) => {
    const paramRecord: Record<string, string> = {};
    for (const [key, value] of searchParams.entries()) paramRecord[key] = value;
    return paramRecord;
};

export const useFilterParams = <Entity>(
    filters: FilterProps<Entity>[],
    filterSet: FilterSet<Entity>,
    setFilterSet: (value: ((previousState: FilterSet<Entity>) => FilterSet<Entity>) | FilterSet<Entity>) => void,
    localStorageKey: string
) => {
    const [searchParams, setSearchParams] = useSearchParams();
    const [bufferFilterSet, setBufferFilterSet] = useState<FilterSet<Entity>>({ filters: [] });

    useEffect(() => {
        const { updatedFilterSet, hasBeenUpdated } = updateFilterSetLabels<Entity>(filterSet, filters);
        if (hasBeenUpdated) {
            setFilterSet(updatedFilterSet);
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [filters]);

    useEffect(() => {
        const localStorageFilterSet = localStorage.getItem(localStorageKey);
        if (filterSet.filters.length === 0 && bufferFilterSet.filters.length === 0) {
            if ([...searchParams.keys()].length > 0) {
                const newFilterSet = getFilterSetFromParameters(getSearchParamRecord(searchParams), filters);
                setFilterSet(newFilterSet);
            } else if (localStorageFilterSet && localStorageFilterSet.length > 0) {
                const filterFromStorage: FilterSet<Entity> = JSON.parse(localStorageFilterSet);
                if (filterFromStorage.filters && filterFromStorage.filters.length > 0) {
                    setFilterSet(filterFromStorage);
                }
            }
        }
    }, [
        bufferFilterSet.filters.length,
        filterSet.filters.length,
        filters,
        localStorageKey,
        searchParams,
        setFilterSet,
    ]);

    useEffect(() => {
        if (JSON.stringify(filterSet.filters) !== JSON.stringify(bufferFilterSet.filters)) {
            const params = getFilterParameters(filterSet);
            setBufferFilterSet(filterSet);
            setSearchParams(params);
            localStorage.setItem(localStorageKey, JSON.stringify(filterSet));
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [filterSet, setSearchParams]);

    return { hasFilterParam: [...searchParams.keys()].length > 0 };
};
