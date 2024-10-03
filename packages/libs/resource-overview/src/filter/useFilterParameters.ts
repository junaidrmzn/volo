import { useCallback, useMemo } from "react";
import type { FilterProps, FilterSet } from "@voloiq/filter-panel";
import { getFilterParameters, getFilterSetFromParameters } from "@voloiq/filter-panel";
import { useLocalStorageUrlSync } from "@voloiq/routing";
import type { BaseResource } from "../state-machine/BaseResource";

const splitParameters = <Entity extends BaseResource>(
    parameters: Record<string, string>,
    filters: FilterProps<Entity>[]
) => {
    const filterKeys = new Set(
        Object.keys(parameters).filter((parameterKey) =>
            filters.some((filter) => new RegExp(`${filter.type}-${filter.propertyName}`).test(parameterKey))
        )
    );
    const entries = Object.entries(parameters);
    const filterParameters = Object.fromEntries(entries.filter(([key]) => filterKeys.has(key)));
    const otherParameters = Object.fromEntries(entries.filter(([key]) => !filterKeys.has(key)));

    return { filterParameters, otherParameters };
};

export const useFilterParameters = <Entity extends BaseResource>(
    localStorageKey: string,
    filters: FilterProps<Entity>[]
) => {
    const { parameters, setParameters } = useLocalStorageUrlSync(localStorageKey);

    const filterSet = useMemo(
        () => getFilterSetFromParameters<Entity>(splitParameters(parameters, filters).filterParameters, filters),
        [filters, parameters]
    );

    const setFilterSet = useCallback(
        (updatedFilterSet: FilterSet<Entity>) => {
            setParameters((previous) => {
                const { otherParameters } = splitParameters(previous, filters);
                return { ...otherParameters, ...getFilterParameters<Entity>(updatedFilterSet) };
            });
        },
        [filters, setParameters]
    );

    return { filterSet, setFilterSet };
};
