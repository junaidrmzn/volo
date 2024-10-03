import { ListItem } from "@volocopter/design-library-react";
import type { SortableListItemWrapperProps } from "./types";

const handleDragEnter = (event: React.DragEvent<HTMLLIElement>) => {
    event.preventDefault();
    event.stopPropagation();
};
const handleDragLeave = (event: React.DragEvent<HTMLLIElement>) => {
    event.preventDefault();
    event.stopPropagation();

    event.currentTarget.style.border = "none";
};

export const SortableListItemWrapper = (props: SortableListItemWrapperProps) => {
    const { id, children, handleDrop, handleDragOver, handleDragStart, isDraggable } = props;

    return (
        <ListItem
            data-testid={`waypoint-list-item-${id}`}
            w="100%"
            id={`${id}`}
            draggable={isDraggable}
            onDragStart={(event) => handleDragStart(event)}
            onDrop={(event) => handleDrop(event)}
            onDragOver={(event) => handleDragOver(event)}
            onDragEnter={(event) => handleDragEnter(event)}
            onDragLeave={(event) => handleDragLeave(event)}
        >
            {children}
        </ListItem>
    );
};
