import { Box } from "@volocopter/design-library-react";
import type { UseItemVisibilityObserverProps } from "../../scheduler-row-height/item-visibility/useItemVisibilityObserver";
import { useItemVisibilityObserver } from "../../scheduler-row-height/item-visibility/useItemVisibilityObserver";
import type { TimeRange } from "../../scroll/useRangeUpdate";
import { useTimeSchedulerConfig } from "../../time-scheduler-config/useTimeSchedulerConfig";
import { useTimeSchedulerState } from "../../time-scheduler-state/useTimeSchedulerState";
import type { ExpandedItem, ExpandedItemGroup } from "./MaybeExpandedItem";
import { isExpandedItemGroup } from "./MaybeExpandedItem";
import { calculateExpandedItemWidthAndOffset } from "./calculateExpandedItemWidthAndOffset";

export type TimeGridExpandedItemProps = {
    widthOfPreviousItemsRef: {
        current: number;
    };
    timeLineRange: TimeRange;
    expandedItem: ExpandedItem | ExpandedItemGroup;
} & UseItemVisibilityObserverProps;

export const TimeGridExpandedItem = (props: TimeGridExpandedItemProps) => {
    const { expandedItem, widthOfPreviousItemsRef, timeLineRange, itemRowIndex, schedulerRowIndex } = props;
    const items = isExpandedItemGroup(expandedItem) ? expandedItem.items : [expandedItem];
    const { baseSizeOfOneMinuteInPx, zoomFactor } = useTimeSchedulerState();
    const { renderExpandedItems } = useTimeSchedulerConfig();
    const { ref } = useItemVisibilityObserver({
        id: items.map((item) => item.id).join("."),
        itemRowIndex,
        schedulerRowIndex,
    });

    const { itemWidthInPx, itemOffset } = calculateExpandedItemWidthAndOffset({
        items,
        timeLineRange,
        baseSizeOfOneMinuteInPx,
        zoomFactor,
        widthOfPreviousItems: widthOfPreviousItemsRef.current,
    });
    widthOfPreviousItemsRef.current += itemWidthInPx;

    return (
        <Box
            ref={ref}
            width={`${itemWidthInPx}px`}
            transform={`translateX(${itemOffset}px)`}
            display="inline-flex"
            alignItems="stretch"
            __css={{ "& > div": { flex: 1 } }}
            height="100%"
        >
            {renderExpandedItems(items)}
        </Box>
    );
};
