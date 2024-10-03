import { useContext } from "react";
import { PadsContext } from "./PadsContext";

export const usePads = () => {
    const context = useContext(PadsContext);

    if (context === undefined) {
        throw new Error("usePads must be used within PadsProvider");
    }

    return context;
};
