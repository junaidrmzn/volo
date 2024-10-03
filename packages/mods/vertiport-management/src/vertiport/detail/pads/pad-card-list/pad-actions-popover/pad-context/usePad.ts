import { useContext } from "react";
import { PadContext } from "./PadContext";

export const usePad = () => {
    const context = useContext(PadContext);

    if (context === undefined) {
        throw new Error("usePad must be used within PadProvider");
    }

    return context;
};
