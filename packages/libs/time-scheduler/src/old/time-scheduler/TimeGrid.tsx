import { Box, VStack } from "@volocopter/design-library-react";
import { differenceInMinutes } from "date-fns";
import type { ReactElement } from "react";
import { add } from "../time-utils/add";
import { NowIndication } from "./NowIndication";
import { TimeUnitLines } from "./TimeUnitLines";
import { TimeGridItemRow } from "./items/TimeGridItemRow";
import { useScroll } from "./scroll/context/useScroll";
import type { ItemRef } from "./scroll/useObservedDateUnits";
import { useTimeSchedulerState } from "./time-scheduler-state/useTimeSchedulerState";

export type TimeGridProps = {
    timeSchedulerRows: ReactElement[];
    leftItemRef: ItemRef;
    rightItemRef: ItemRef;
};

export const TimeGrid = (props: TimeGridProps) => {
    const { timeSchedulerRows, leftItemRef, rightItemRef } = props;
    const { startDate, unitCount, baseSizeOfOneMinuteInPx, zoomFactor, timeUnit } = useTimeSchedulerState();
    const schedulerRows = timeSchedulerRows.map((value) => value.props.children);
    const endDate = add(startDate, { [timeUnit]: unitCount });
    const sizeOfOneMinuteInPx = baseSizeOfOneMinuteInPx * zoomFactor;
    const width = differenceInMinutes(endDate, startDate) * sizeOfOneMinuteInPx;

    const { timeGridOffset } = useScroll();

    return (
        <VStack
            width={width}
            height="100%"
            spacing={0}
            rowGap={0.5}
            position="relative"
            marginLeft={`${timeGridOffset}px`}
        >
            <TimeUnitLines zIndex="2" />
            <NowIndication zIndex="4" />
            <Box position="absolute" height="100%" left="350px" top={0} ref={leftItemRef} />
            <Box position="absolute" height="100%" right="350px" top={0} ref={rightItemRef} />
            {schedulerRows.map((schedulerRow, schedulerIndex) => (
                <TimeGridItemRow
                    // There isn't really any other unique key for these items, but the array shouldn't be subject to change anyway
                    // eslint-disable-next-line react/no-array-index-key
                    key={schedulerIndex}
                    row={schedulerRow}
                    schedulerRowIndex={schedulerIndex}
                    gridItemZIndex="3"
                />
            ))}
        </VStack>
    );
};
