import { Flex, Grid, GridItem } from "@volocopter/design-library-react";
import { createCompoundComponent } from "@voloiq/utils";
import type { TimeGridContainerProps } from "./TimeGridContainer";
import { TimeGridContainer } from "./TimeGridContainer";
import { DateSelection } from "./header/DateSelection";
import { TimeGridHeader } from "./header/TimeGridHeader";
import { SchedulerRowLabelContainer } from "./scheduler-row-label/SchedulerRowLabelContainer";
import type { UseTimeSchedulerProps } from "./useTimeScheduler";
import { useTimeScheduler } from "./useTimeScheduler";
import { ZoomControls } from "./zoom/ZoomControls";
import { UseZoomUpdateProps } from "./zoom/useZoomUpdate";

export const {
    CompoundComponent: TimeSchedulerRowLabel,
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

    const { containerRef } = useTimeScheduler({
        onRangeUpdate,
        OnZoomUpdate,
    });

    return (
        <Grid
            width="100%"
            position="relative"
            templateColumns="120px calc(100% - 120px)"
            backgroundColor="white"
            p={3}
            pb={0}
        >
            <Flex
                alignItems="flex-end"
                justifyContent="center"
                position="sticky"
                top={0}
                zIndex={6}
                borderBottomWidth="1px"
                borderStyle="solid"
                borderBottomColor="accentSecondaryMuted"
                paddingBottom={3}
                backgroundColor="white"
            >
                <DateSelection containerRef={containerRef} />
            </Flex>
            <TimeGridHeader
                containerRef={containerRef}
                timelineStartDate={timelineStartDate}
                borderBottomWidth="1px"
                borderStyle="solid"
                borderBottomColor="accentSecondaryMuted"
                paddingBottom={3}
            />
            {labels.length > 0 ? (
                <>
                    <SchedulerRowLabelContainer labels={labels} />
                    <TimeGridContainer timeSchedulerRows={timeSchedulerRows} containerRef={containerRef} />
                </>
            ) : (
                <GridItem colSpan={2}>
                    <TimeGridContainer timeSchedulerRows={timeSchedulerRows} containerRef={containerRef} />
                </GridItem>
            )}
            <ZoomControls containerRef={containerRef} />
        </Grid>
    );
};
