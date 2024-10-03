import { match } from "ts-pattern";

export type SortingOrder = "ASC" | "DESC";

type ResetAction = {
    type: "RESET";
};

type CancelAction = {
    type: "CANCEL";
};

type ApplyAction = {
    type: "APPLY";
};

type ChangeAction = {
    type: "CHANGE";
    selectedOption: string;
    selectedOrder: SortingOrder;
};

export type SortingPanelAction = ResetAction | CancelAction | ApplyAction | ChangeAction;

export type AugmentedSortingPanelAction = {
    defaultOption: string;
    defaultOrder: SortingOrder;
} & SortingPanelAction;

export type SortingPanelState = {
    selectedOption: string;
    previouslySelectedOption?: string;
    selectedOrder: SortingOrder;
    previouslySelectedOrder?: SortingOrder;
};

export const sortingPanelReducer = (state: SortingPanelState, action: AugmentedSortingPanelAction) =>
    match(action)
        .with({ type: "RESET" }, () => ({
            ...state,
            selectedOption: action.defaultOption,
            selectedOrder: action.defaultOrder,
        }))
        .with({ type: "CANCEL" }, () => ({
            ...state,
            selectedOption: state.previouslySelectedOption || action.defaultOption,
            selectedOrder: state.previouslySelectedOrder || action.defaultOrder,
        }))
        .with({ type: "APPLY" }, () => ({
            ...state,
            previouslySelectedOption: state.selectedOption,
            previouslySelectedOrder: state.selectedOrder,
        }))
        .with({ type: "CHANGE" }, (action) => ({
            ...state,
            selectedOption: action.selectedOption,
            selectedOrder: action.selectedOrder,
        }))
        .exhaustive();
