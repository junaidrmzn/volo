import { useState } from "react";
import type { SortingOrder } from "./SortingContext";

export const useSorting = () => {
    const [isSortingPanelShown, setIsSortingPanelShown] = useState<boolean>(false);
    const [sortingCriteria, setSortingCriteria] = useState<string>();
    const [sortingOrder, setSortingOrder] = useState<SortingOrder>("ASC");
    return {
        isSortingPanelShown,
        setIsSortingPanelShown,
        sortingCriteria,
        setSortingCriteria,
        sortingOrder,
        setSortingOrder,
    };
};
