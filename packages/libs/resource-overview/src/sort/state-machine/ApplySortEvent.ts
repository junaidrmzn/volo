import type { SortingConfiguration } from "@voloiq/sorting-panel";

export type ApplySortEvent = {
    type: "APPLY_SORT";
    appliedSortingConfiguration?: SortingConfiguration;
};
