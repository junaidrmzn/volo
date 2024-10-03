import { useContext } from "react";
import { SegmentEditingContext } from "./SegmentEditingContext";

export const useSegmentEditingContext = () => {
    const contextValue = useContext(SegmentEditingContext);

    if (!contextValue) {
        throw new Error("useSegmentEditingContext must be used within SegmentEditingContext");
    }

    return contextValue;
};
