import { useContext } from "react";
import { DragHandlePropsContext } from "./DragHandlePropsContext";

export const useDragHandleProps = () => {
    const context = useContext(DragHandlePropsContext);

    if (context === undefined) {
        throw new Error("useDragHandleProps must be used within DragHandlePropsContext");
    }

    return context;
};
