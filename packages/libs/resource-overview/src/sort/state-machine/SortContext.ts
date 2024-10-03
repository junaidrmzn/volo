import type { SortingConfiguration, SortingOption, SortingOrder } from "@voloiq/sorting-panel";

export type SortContext = {
    sortingOptions: SortingOption[];
    sortingOrder?: SortingOrder;
    appliedSortingConfiguration?: SortingConfiguration;
};
