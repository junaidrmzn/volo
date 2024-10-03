import { useContext } from "react";
import { ScrollContext } from "./ScrollContext";

export const useScroll = () => {
    const context = useContext(ScrollContext);
    if (!context) {
        throw new Error("useScroll must be used within ScrollProvider");
    }

    return context;
};
