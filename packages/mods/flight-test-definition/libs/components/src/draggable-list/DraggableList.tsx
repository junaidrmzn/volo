import { List } from "@volocopter/design-library-react";
import { Reorder } from "framer-motion";
import { DraggableListItem } from "./DraggableListItem";
import { DragVariants, RenderListItem } from "./types";
import { useDraggableList } from "./useDraggableList";

export type DraggableListProps<T> = {
    isEnabled?: boolean;
    items: (T & { id: string | number })[];
    onDragEnd: (options: { sourceIndex: number; destinationIndex: number; id: string | number }) => void;
    renderListItem: RenderListItem<T>;
    variants?: DragVariants;
    customDragArea?: boolean;
    ariaLabel?: string;
};

export const DraggableList = <T extends {}>(props: DraggableListProps<T>) => {
    const {
        customDragArea = false,
        isEnabled = true,
        items,
        onDragEnd,
        renderListItem,
        variants,
        ariaLabel = "DraggableList",
    } = props;
    const { values, onReorder } = useDraggableList({ items });

    return (
        <List as={Reorder.Group} axis="y" values={values} onReorder={onReorder} spacing={2} aria-label={ariaLabel}>
            {values.map((value, draggableIndex) => {
                // the indizes in the list are not the same as the indizes in the items array
                // they are managed by Reorder.Group
                const item = items.find((item) => item.id === value);
                // this index is always behind the draggableIndex (different render-cycle)  if we use for e.g. the useFieldArray field-list of react-hook-form
                // we need this to get the correct form controls
                const index = items.findIndex((item) => item.id === value);
                if (item === undefined) return null;
                return (
                    <DraggableListItem<T>
                        key={item.id}
                        draggableIndex={draggableIndex}
                        index={index}
                        item={item}
                        isEnabled={isEnabled}
                        renderListItem={renderListItem}
                        variants={variants}
                        customDragArea={customDragArea}
                        onDragEnd={onDragEnd}
                    />
                );
            })}
        </List>
    );
};
