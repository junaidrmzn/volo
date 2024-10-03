import { createContext } from "react";

export type SortingOrder = "ASC" | "DESC";

export type SortingContextProps = {
    isSortingPanelShown: boolean;
    setIsSortingPanelShown: (isSortingPanelShown: boolean) => void;
    sortingCriteria?: string;
    setSortingCriteria: (sortCriteria: string) => void;
    sortingOrder: SortingOrder;
    setSortingOrder: (sortingOrder: SortingOrder) => void;
};

export const SortingContext = createContext<SortingContextProps | undefined>(undefined);
