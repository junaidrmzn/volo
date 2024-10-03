import { useContext } from "react";
import { PadEventsContext } from "./PadEventsContext";

export const usePadEvents = () => {
    const context = useContext(PadEventsContext);

    if (context === undefined) {
        throw new Error("usePadEvents must be used within PadEventsProvider");
    }

    return context;
};
