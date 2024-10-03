import { List } from "@volocopter/design-library-react";
import { SortableListItem } from "./SortableListItem";
import { SortableListItemWrapper } from "./SortableListItemWrapper";
import { isListItemDraggable } from "./isListItemDraggable";
import type { SortableListProps } from "./types";

export const SortableList = (props: SortableListProps) => {
    const { items, handleDrop, handleDragOver, handleDragStart, onItemSelect, isWaypointList } = props;

    return (
        <List>
            {items &&
                Array.isArray(items) &&
                items.map((item) => {
                    const isDraggable = isWaypointList
                        ? isListItemDraggable(item.routeSequenceIndex, items.length - 1)
                        : true;
                    return (
                        <SortableListItemWrapper
                            id={`wp_${item.routeSequenceIndex}`}
                            key={`sortable-item-${item.id}`}
                            handleDrop={handleDrop}
                            handleDragOver={handleDragOver}
                            handleDragStart={handleDragStart}
                            isDraggable={isDraggable}
                        >
                            <SortableListItem item={item} onClick={onItemSelect} isDraggable={isDraggable} />
                        </SortableListItemWrapper>
                    );
                })}
        </List>
    );
};
