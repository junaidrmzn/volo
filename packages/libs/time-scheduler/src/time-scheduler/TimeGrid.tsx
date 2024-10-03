import { VStack } from "@volocopter/design-library-react";
import { differenceInMinutes } from "date-fns";
import type { ReactElement } from "react";
import { add } from "../time-utils/add";
import { NowIndication } from "./NowIndication";
import { TimeUnitLines } from "./TimeUnitLines";
import { TimeGridItemRow } from "./items/TimeGridItemRow";
import { useScroll } from "./scroll/context/useScroll";
import { useTimeSchedulerState } from "./time-scheduler-state/useTimeSchedulerState";

export type TimeGridProps = {
    timeSchedulerRows: ReactElement[];
};

export const TimeGrid = (props: TimeGridProps) => {
    const { timeSchedulerRows } = props;
    const { startDate, unitCount, baseSizeOfOneMinuteInPx, zoomFactor, timeUnit } = useTimeSchedulerState();
    const schedulerRows = timeSchedulerRows.map((value) => value.props.children);
    const endDate = add(startDate, { [timeUnit]: unitCount });
    const sizeOfOneMinuteInPx = baseSizeOfOneMinuteInPx * zoomFactor;
    const width = differenceInMinutes(endDate, startDate) * sizeOfOneMinuteInPx;

    const { timeGridOffset } = useScroll();

    return (
        <VStack width={width} height="100%" spacing={0} position="relative" marginLeft={`${timeGridOffset}px`}>
            <TimeUnitLines zIndex="2" />
            <NowIndication zIndex="4" />
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
