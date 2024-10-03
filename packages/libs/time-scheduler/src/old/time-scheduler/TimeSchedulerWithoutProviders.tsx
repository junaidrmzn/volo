import { Flex } from "@volocopter/design-library-react";
import { createCompoundComponent } from "@voloiq/utils";
import type { TimeGridContainerProps } from "./TimeGridContainer";
import { TimeGridContainer } from "./TimeGridContainer";
import { TimeGridHeader } from "./header/TimeGridHeader";
import { SchedulerRowLabelContainer } from "./scheduler-row-label/SchedulerRowLabelContainer";
import type { UseTimeSchedulerProps } from "./useTimeScheduler";
import { useTimeScheduler } from "./useTimeScheduler";
import { ZoomControls } from "./zoom/ZoomControls";
import { UseZoomUpdateProps } from "./zoom/useZoomUpdate";

export const {
    CompoundComponent: TimeSchedulerRowLabelNew,
    getCompoundComponentChildren: getTimeSchedulerRowLabelChildren,
} = createCompoundComponent();

export type TimeSchedulerWithoutProvidersProps = Pick<UseTimeSchedulerProps, "onRangeUpdate"> &
    Pick<UseZoomUpdateProps, "OnZoomUpdate"> &
    Pick<TimeGridContainerProps, "timeSchedulerRows"> & {
        timelineStartDate?: Date;
    };
export const TimeSchedulerWithoutProviders = (props: TimeSchedulerWithoutProvidersProps) => {
    const { onRangeUpdate, timeSchedulerRows, timelineStartDate, OnZoomUpdate } = props;

    const labels = timeSchedulerRows.map((row) => getTimeSchedulerRowLabelChildren(row.props.children)).filter(Boolean);

    const { containerRef, leftItemRef, rightItemRef } = useTimeScheduler({
        onRangeUpdate,
        OnZoomUpdate,
    });

    return (
        <>
            <Flex position="relative" width="100%" flexDirection="column">
                <TimeGridHeader containerRef={containerRef} timelineStartDate={timelineStartDate} />
                <Flex flexDirection="row">
                    <SchedulerRowLabelContainer labels={labels} />
                    <TimeGridContainer
                        timeSchedulerRows={timeSchedulerRows}
                        leftItemRef={leftItemRef}
                        rightItemRef={rightItemRef}
                        containerRef={containerRef}
                        flex={1}
                    />
                </Flex>
            </Flex>
            <ZoomControls containerRef={containerRef} />
        </>
    );
};
