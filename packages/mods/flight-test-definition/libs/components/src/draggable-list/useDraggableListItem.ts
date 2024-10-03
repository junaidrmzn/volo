import { useDragControls } from "framer-motion";
import { useCallback } from "react";
import { DragEvent } from "./types";

export const useDraggableListItem = () => {
    const dragControls = useDragControls();
    const onDragElement = useCallback((event: DragEvent) => dragControls.start(event), [dragControls]);

    return {
        dragControls,
        onDragElement,
    };
};
