import type { FilterSet } from "@voloiq/filter-panel";
import type { SortingConfiguration } from "@voloiq/sorting-panel";
import type { QuickFilter } from "../../quick-filter/state-machine/Types";

export type ChangePageEvent = { type: "CHANGE_PAGE"; page: number };
export type SetContextEvent<Resource> = {
    type: "SET_CONTEXT";
    page: number;
    appliedFilterSet: FilterSet<Resource>;
    sortingConfiguration?: SortingConfiguration;
    appliedQuickFilter?: QuickFilter;
};
