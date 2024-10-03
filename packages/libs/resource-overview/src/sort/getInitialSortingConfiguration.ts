import type { SortingConfiguration, SortingOption, SortingOrder } from "@voloiq/sorting-panel";

export const getInitialSortingConfiguration = (
    sortingOptions: SortingOption[] = [],
    selectedOrder: SortingOrder = "DESC"
): SortingConfiguration | undefined => {
    if (sortingOptions.length === 0) {
        return undefined;
    }

    return {
        // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
        selectedOption: sortingOptions[0]!.id,
        selectedOrder,
    };
};
