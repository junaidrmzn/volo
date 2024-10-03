import { ReactNode } from "react";
import { AddButton } from "./add/AddButton";
import { FilterButton } from "./filter/ResourceFiltersButton";
import { useGlobalState } from "./global-state/useGlobalState";
import { MultiPreviewButton } from "./multi-preview/MultiPreviewButton";
import { SortButton } from "./sort/ResourceSortButton";

export type ListActionButtonsProps = {
    listActionButtons: ReactNode;
    withOldFilter?: boolean;
};

export const ListActionButtons = (props: ListActionButtonsProps) => {
    const { withOldFilter = false, listActionButtons } = props;
    const [state] = useGlobalState();

    return (
        <>
            {listActionButtons}
            {state.can("OPEN_MULTI_PREVIEW") && <MultiPreviewButton />}
            {withOldFilter && <FilterButton />}
            {(state.can("OPEN_SORT") || state.can("CLOSE_SORT")) && <SortButton />}
            {state.can("ADD") && <AddButton />}
        </>
    );
};
