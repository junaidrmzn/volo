import { Variant } from "framer-motion";
import type { ReactElement } from "react";

export type DragEvent =
    | React.MouseEvent
    | React.TouchEvent
    | React.PointerEvent
    | MouseEvent
    | TouchEvent
    | PointerEvent;

export type DragVariants = {
    notDragging: Variant;
    dragging: Variant;
};

export type RenderListItem<T> = (
    item: T,
    index: number,
    onDragElement: (event: DragEvent) => void
) => ReactElement | null;
