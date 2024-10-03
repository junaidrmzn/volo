import type { SortingConfiguration } from "@voloiq/sorting-panel";
import { useGlobalState } from "../global-state/useGlobalState";

export const useSortPanel = () => {
    const [state, send] = useGlobalState();
    const { sortingOptions, sortingOrder, appliedSortingConfiguration } = state.context;

    const selectedOrder = sortingOrder ?? appliedSortingConfiguration?.selectedOrder ?? "DESC";
    const selectedOption =
        appliedSortingConfiguration?.selectedOption ?? (sortingOptions.length > 0 ? sortingOptions[0].id : null);

    return {
        sortingOptions,
        selectedOrder,
        selectedOption,
        deleteSort: () => {
            send("CLOSE");
        },
        applySort: (appliedSortingConfiguration: SortingConfiguration) => {
            send("APPLY_SORT", { appliedSortingConfiguration });
        },
        close: () => {
            send("CLOSE");
        },
    };
};
