import { useContext } from "react";
import { QuickFiltersContext } from "./QuickFiltersContext";

export const useQuickFilters = () => {
    const context = useContext(QuickFiltersContext);

    if (context === undefined) {
        throw new Error("useQuickFilters must be used within QuickFiltersProvider");
    }

    return context;
};
