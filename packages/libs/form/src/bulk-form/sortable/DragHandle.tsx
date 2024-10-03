import { Icon, IconProps } from "@volocopter/design-library-react";
import { useSortableTranslation } from "./translations/useSortableTranslation";
import { useDragHandleProps } from "./useDragHandleProps";

export type DragHandleProps = Omit<IconProps, "icon">;

export const DragHandle = (props: DragHandleProps) => {
    const dragHandleProps = useDragHandleProps();
    const { t } = useSortableTranslation();
    return (
        <span
            {...dragHandleProps}
            style={{ cursor: dragHandleProps["aria-pressed"] ? "grabbing" : "grab" }}
            aria-label={t("Click and hold to sort elements")}
        >
            <Icon icon="dragHandle" {...props} />
        </span>
    );
};
