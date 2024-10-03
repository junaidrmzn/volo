import { useContext } from "react";
import { FilteringPanelContext } from "../../components/FilteringPanelContext";

export const useFilteringPanelContext = () => {
    const context = useContext(FilteringPanelContext);

    if (!context) {
        throw new Error("useFilteringPanelContext must be used within FilteringPanelProvider");
    }

    return context;
};
