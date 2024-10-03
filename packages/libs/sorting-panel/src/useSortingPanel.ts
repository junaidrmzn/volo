import { useCallback, useEffect, useReducer } from "react";
import type { SortingOrder, SortingPanelAction } from "./sortingPanelReducer";
import { sortingPanelReducer } from "./sortingPanelReducer";

export type SortingOption = {
    label: string;
    id: string;
};

export type UseSortingPanelProps = {
    defaultOption: string;
    defaultOrder?: SortingOrder;
    options: SortingOption[];
};

export const useSortingPanel = (props: UseSortingPanelProps) => {
    const { defaultOption, defaultOrder = "ASC", options } = props;
    const serializedOptions = JSON.stringify(options);
    const [state, _dispatch] = useReducer(sortingPanelReducer, {
        selectedOption: defaultOption,
        selectedOrder: defaultOrder,
    });

    const dispatch = useCallback(
        (action: SortingPanelAction) =>
            _dispatch({
                ...action,
                defaultOption,
                defaultOrder,
            }),
        [defaultOption, defaultOrder]
    );

    useEffect(() => {
        dispatch({ type: "RESET" });
    }, [defaultOption, defaultOrder, dispatch, serializedOptions]);

    const { previouslySelectedOption, previouslySelectedOrder, ...publicState } = state;

    return { ...publicState, dispatch };
};
