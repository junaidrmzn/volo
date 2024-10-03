import type { AppliedFilters, Property, SortingConfig } from "@volocopter/filter-react";

export type FilterBarContext = {
    filterProperties: Property[];
    appliedFilters?: AppliedFilters;
    sortingConfig?: SortingConfig;
};
