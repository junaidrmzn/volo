import type { AppliedFilters } from "@volocopter/filter-react";
import { useCallback } from "react";
import { serializeFilters } from "@voloiq/service";
import { transformPropertyFiltersToFilterSet } from "./transformPropertyFiltersToFilterSet";

type UseFilterBarProps = {
    onFilterChange: (filterValues: string) => void;
    isSerialized: boolean;
};

export const useFilterBar = (props: UseFilterBarProps) => {
    const { onFilterChange, isSerialized } = props;

    const applyFilters = useCallback(
        (appliedFilters: AppliedFilters) => {
            if (isSerialized) {
                const filterSet = transformPropertyFiltersToFilterSet(appliedFilters.filters);
                const filters = serializeFilters(filterSet);
                onFilterChange(filters);
            }
        },
        [isSerialized, onFilterChange]
    );
    return { applyFilters };
};
