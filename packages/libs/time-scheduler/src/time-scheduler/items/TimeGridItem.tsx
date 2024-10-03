import { Box } from "@volocopter/design-library-react";
import { differenceInMinutes, max, min } from "date-fns";
import type { UseItemVisibilityObserverProps } from "../scheduler-row-height/item-visibility/useItemVisibilityObserver";
import { useItemVisibilityObserver } from "../scheduler-row-height/item-visibility/useItemVisibilityObserver";
import type { TimeRange } from "../scroll/useRangeUpdate";
import { useTimeSchedulerState } from "../time-scheduler-state/useTimeSchedulerState";

export type TimeGridItemProps = {
    timeLineRange: TimeRange;
    startDate: Date;
    endDate: Date;
    widthOfPreviousItemsRef: {
        current: number;
    };
    height?: string | number;
} & UseItemVisibilityObserverProps;

export const TimeGridItem: FCC<TimeGridItemProps> = (props) => {
    const {
        id,
        itemRowIndex,
        schedulerRowIndex,
        startDate,
        endDate,
        children,
        timeLineRange,
        widthOfPreviousItemsRef,
        height,
    } = props;
    const { baseSizeOfOneMinuteInPx, zoomFactor } = useTimeSchedulerState();
    const { ref } = useItemVisibilityObserver({ id, itemRowIndex, schedulerRowIndex });
    const { startDate: timeLineStartDate, endDate: timeLineEndDate } = timeLineRange;

    const renderedStartDate = max([startDate, timeLineStartDate]);
    const renderedEndDate = min([endDate, timeLineEndDate]);
    const itemWidth = Math.round(
        differenceInMinutes(renderedEndDate, renderedStartDate) * baseSizeOfOneMinuteInPx * zoomFactor
    );
    const itemOffset =
        differenceInMinutes(renderedStartDate, timeLineStartDate) * baseSizeOfOneMinuteInPx * zoomFactor -
        widthOfPreviousItemsRef.current;
    widthOfPreviousItemsRef.current += itemWidth;

    return (
        <Box
            ref={ref}
            width={`${itemWidth}px`}
            transform={`translateX(${itemOffset}px)`}
            display="inline-flex"
            alignItems="stretch"
            overflow="hidden"
            __css={{ "& > div": { flex: 1 } }}
            height={height || "100%"}
            data-start-date={startDate.toISOString()}
            data-end-date={endDate.toISOString()}
            data-testid="time-grid-item"
        >
            {children}
        </Box>
    );
};
