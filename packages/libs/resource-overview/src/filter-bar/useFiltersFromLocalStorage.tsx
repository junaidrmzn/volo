import type { AppliedFilters } from "@volocopter/filter-react";
import { useCallback } from "react";
import { useGlobalState } from "../global-state/useGlobalState";
import { useFilterParameters } from "./local-storage/useFilterParameters";

export const useFiltersFromLocalStorage = () => {
    const [state, send] = useGlobalState();
    const {
        context: { filterProperties = [], sortingConfig },
        meta: {
            resourceOverview: { getResourceName },
        },
    } = state;

    const { propertiesWithValues, setParameterValues, sortingConfigWithValue } = useFilterParameters(
        getResourceName(),
        filterProperties,
        sortingConfig
    );
    const applyFilters = useCallback(
        (appliedFilters: AppliedFilters) => {
            setParameterValues(appliedFilters);
            send("APPLY_FILTERS", { appliedFilters });
        },
        [send, setParameterValues]
    );

    return { properties: propertiesWithValues, applyFilters, sortingConfig: sortingConfigWithValue };
};
