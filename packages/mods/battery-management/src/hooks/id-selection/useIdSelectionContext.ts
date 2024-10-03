import { useContext } from "react";
import { IdSelectionContext } from "./IdSelectionContext";

export const useIdSelectionContext = () => {
    const context = useContext(IdSelectionContext);
    if (!context) {
        throw new Error("useIdSelectionContext must be used within IdSelectionProvider");
    }
    return context;
};
