import { Box } from "@volocopter/design-library-react";
import { Reorder } from "framer-motion";
import { memo } from "react";
import { DragVariants, RenderListItem } from "./types";
import { useDraggableListItem } from "./useDraggableListItem";

export type DraggableListItemProps<T> = {
    draggableIndex: number;
    index: number;
    isEnabled?: boolean;
    item: T & { id: string | number };
    renderListItem: RenderListItem<T>;
    variants?: DragVariants;
    customDragArea: boolean;
    onDragEnd: (options: { sourceIndex: number; destinationIndex: number; id: string | number }) => void;
};

export const DraggableListItemComponent = <T extends {}>(props: DraggableListItemProps<T>) => {
    const {
        customDragArea,
        draggableIndex,
        index,
        isEnabled = true,
        item,
        onDragEnd,
        renderListItem,
        variants,
    } = props;
    const { dragControls, onDragElement } = useDraggableListItem();

    return (
        <Box
            userSelect="none"
            key={item.id}
            as={Reorder.Item}
            value={item.id}
            variants={variants}
            initial="notDragging"
            whileDrag="dragging"
            position="relative"
            dragTransition={{
                bounceStiffness: 600,
            }}
            dragListener={isEnabled ? !customDragArea : false}
            dragControls={isEnabled ? dragControls : undefined}
            onDragEnd={() => onDragEnd({ sourceIndex: index, destinationIndex: draggableIndex, id: item.id })}
        >
            {renderListItem(item, index, onDragElement)}
        </Box>
    );
};

const typedMemo: <T>(component: T) => T = memo;
export const DraggableListItem = typedMemo(DraggableListItemComponent);
