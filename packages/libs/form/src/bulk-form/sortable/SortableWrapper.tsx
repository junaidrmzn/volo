import {
    DndContext,
    DragEndEvent,
    KeyboardSensor,
    MouseSensor,
    PointerSensor,
    closestCenter,
    useSensor,
    useSensors,
} from "@dnd-kit/core";
import { restrictToVerticalAxis, restrictToWindowEdges } from "@dnd-kit/modifiers";
import { SortableContext, sortableKeyboardCoordinates, verticalListSortingStrategy } from "@dnd-kit/sortable";
import { ReactNode } from "react";

export type SortableWrapperProps = {
    fields: Record<"id", string>[];
    moveFormControlGroup: (oldIndex: number, newIndex: number) => void;
    children: ReactNode;
};

export const SortableWrapper = (props: SortableWrapperProps) => {
    const { fields, moveFormControlGroup, children } = props;

    const sensors = useSensors(
        useSensor(MouseSensor),
        useSensor(PointerSensor),
        useSensor(KeyboardSensor, {
            coordinateGetter: sortableKeyboardCoordinates,
        })
    );

    const handleDragEnd = (event: DragEndEvent) => {
        const { active, over } = event;

        const oldId = active.id;
        const newId = over?.id;

        if (typeof oldId === "string" && typeof newId === "string") {
            const oldIndex = fields.findIndex((field) => field.id === oldId);
            const newIndex = fields.findIndex((field) => field.id === newId);

            moveFormControlGroup(oldIndex, newIndex);
        }
    };

    return (
        <DndContext
            sensors={sensors}
            collisionDetection={closestCenter}
            onDragEnd={handleDragEnd}
            modifiers={[restrictToVerticalAxis, restrictToWindowEdges]}
        >
            <SortableContext items={fields} strategy={verticalListSortingStrategy}>
                {children}
            </SortableContext>
        </DndContext>
    );
};
