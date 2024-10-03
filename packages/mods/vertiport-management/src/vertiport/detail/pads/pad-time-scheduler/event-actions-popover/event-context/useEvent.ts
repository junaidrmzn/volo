import { useContext } from "react";
import { EventContext } from "./EventContext";

export const useEvent = () => {
    const context = useContext(EventContext);

    if (context === undefined) {
        throw new Error("useEvent must be used within EventProvider");
    }

    return context;
};
