import { useContext } from "react";
import { SortingContext } from "./SortingContext";

export const useSortingContext = () => {
    const context = useContext(SortingContext);
    if (!context) {
        throw new Error("useSortingContext must be used within SortingProvider");
    }
    return context;
};
