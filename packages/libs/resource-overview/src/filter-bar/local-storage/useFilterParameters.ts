import type { AppliedFilters, Property, SortingConfig } from "@volocopter/filter-react";
import { useCallback, useMemo } from "react";
import { useLocalStorageUrlSync } from "@voloiq/routing";
import { getParametersFromPropertyFilters } from "./getParametersFromPropertyFilters";
import { getPropertyValuesFromParameters } from "./getPropertyValuesFromParameters";
import { getSortingConfigWithValueFromParameters } from "./sorting/getSortingConfigValuesFromParameters";
import { getSortingParameterFromSortingState } from "./sorting/getSortingParameterFromSortingState";
import { splitParameters, splitSortingParameter } from "./splitParameters";

export const useFilterParameters = (localStorageKey: string, properties: Property[], sortingConfig?: SortingConfig) => {
    const { parameters, setParameters } = useLocalStorageUrlSync(localStorageKey);

    const propertiesWithValues = useMemo(
        () => getPropertyValuesFromParameters(splitParameters(parameters, properties).filterParameters, properties),
        [properties, parameters]
    );
    const sortingConfigWithValue = useMemo(
        () =>
            getSortingConfigWithValueFromParameters(splitSortingParameter(parameters).sortingParameter, sortingConfig),
        [parameters, sortingConfig]
    );

    const setParameterValues = useCallback(
        (appliedFilters: AppliedFilters) => {
            const { filters, sorting } = appliedFilters;
            setParameters((previous) => {
                const { otherParameters } = splitParameters(previous, properties);
                const filterParameters = getParametersFromPropertyFilters(filters);
                const sortingParameter = sorting ? getSortingParameterFromSortingState(sorting) : undefined;
                return {
                    ...otherParameters,
                    ...filterParameters,
                    ...sortingParameter,
                };
            });
        },
        [setParameters, properties]
    );

    return {
        propertiesWithValues,
        setParameterValues,
        sortingConfigWithValue,
    };
};
