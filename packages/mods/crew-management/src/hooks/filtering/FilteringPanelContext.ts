import { createContext } from "react";

export type FilteringPanelContextProps = {
    isFilteringPanelShown: boolean;
    setIsFilteringPanelShown: (showFilter: boolean) => void;
};

export const FilteringPanelContext = createContext<FilteringPanelContextProps | undefined>(undefined);
