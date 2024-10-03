import { useSortable } from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";
import { ReactNode } from "react";
import { DragHandlePropsProvider } from "./DragHandlePropsProvider";

export type SortableItemProps = {
    id: string;
    children: ReactNode;
};

export function SortableItem(props: SortableItemProps) {
    const { id, children } = props;
    const { attributes, listeners, setNodeRef, transform, transition } = useSortable({ id });

    const style = {
        transform: CSS.Transform.toString(transform),
        transition,
    };

    return (
        <DragHandlePropsProvider dragHandleProps={{ ...attributes, ...listeners }}>
            <div ref={setNodeRef} style={style}>
                {children}
            </div>
        </DragHandlePropsProvider>
    );
}
