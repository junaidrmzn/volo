import type { FilterSet } from "@voloiq/filter-panel";
import type { SortingConfiguration } from "@voloiq/sorting-panel";
import type { QuickFilter } from "../../quick-filter/state-machine/Types";

export type ListContext<Resource> = {
    overviewData?: Resource[]; // TODO rename to resources
    totalItems?: number;
    page: number;
    pageSize: number;
    appliedFilterSet?: FilterSet<Resource>;
    appliedSortingConfiguration?: SortingConfiguration;
    appliedQuickFilter?: QuickFilter;
};
