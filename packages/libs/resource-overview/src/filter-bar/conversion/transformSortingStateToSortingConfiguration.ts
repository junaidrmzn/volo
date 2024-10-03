import { SortingState } from "@volocopter/filter-react";
import { SortingConfiguration } from "@voloiq/sorting-panel";

export const transformSortingStateToSortingConfiguration = (
    sortingState?: SortingState
): SortingConfiguration | undefined => {
    if (sortingState) {
        return {
            selectedOption: sortingState?.value?.value?.toString() ?? "",
            selectedOrder: sortingState?.comparisonOperator === "asc" ? "ASC" : "DESC",
        };
    }
    return sortingState;
};
