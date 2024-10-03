import type { AppliedFilters } from "@volocopter/filter-react";
import { useCallback } from "react";
import { serializeFilters } from "@voloiq/service";
import { transformPropertyFiltersToFilterObject } from "./transformPropertyFiltersToFilterObject";
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
                const filters = serializeFilters(filterSet, { useIlikeOperator: true });
                onFilterChange(filters);
            } else {
                const filterObject = transformPropertyFiltersToFilterObject(appliedFilters.filters);
                onFilterChange(JSON.stringify(filterObject));
            }
        },
        [isSerialized, onFilterChange]
    );
    return { applyFilters };
};
