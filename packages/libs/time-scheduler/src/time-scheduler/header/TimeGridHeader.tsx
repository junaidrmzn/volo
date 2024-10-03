import type { FlexProps } from "@volocopter/design-library-react";
import { Box, Flex } from "@volocopter/design-library-react";
import type { RefObject } from "react";
import { TimeLine } from "../../time-line/TimeLine";
import { add } from "../../time-utils/add";
import { ScrollControl } from "../scroll/ScrollControl";
import { useScroll } from "../scroll/context/useScroll";
import { useTimeSchedulerState } from "../time-scheduler-state/useTimeSchedulerState";
import { useInitialScroll } from "./useInitialScroll";
import { useWheelZoom } from "./useWheelZoom";

export type TimeGridHeaderProps = {
    containerRef: RefObject<HTMLDivElement>;
    timelineStartDate?: Date;
} & FlexProps;

export const TimeGridHeader = (props: TimeGridHeaderProps) => {
    const { containerRef, timelineStartDate, ...flexProps } = props;
    const { startDate, unitCount, baseSizeOfOneMinuteInPx, zoomFactor, timeUnit } = useTimeSchedulerState();
    const sizeOfOneMinuteInPx = baseSizeOfOneMinuteInPx * zoomFactor;
    const endDate = add(startDate, { [timeUnit]: unitCount });

    const { headerRef } = useScroll();

    useWheelZoom();
    useInitialScroll(timelineStartDate);

    return (
        <Flex
            flexDirection="row"
            alignItems="flex-end"
            zIndex={6}
            position="sticky"
            top={0}
            backgroundColor="white"
            {...flexProps}
        >
            <ScrollControl
                containerRef={containerRef}
                direction="left"
                position="absolute"
                left={0}
                backgroundColor="white"
                zIndex={7}
            />
            <Box
                width="100%"
                height="34px"
                ref={headerRef}
                overflow="auto"
                position="relative"
                css={{
                    "&::-webkit-scrollbar": {
                        display: "none",
                    },
                    "-ms-overflow-style": "none",
                    "scrollbar-width": "none",
                }}
            >
                <TimeLine
                    timeUnit={timeUnit}
                    height="100%"
                    startDate={startDate}
                    endDate={endDate}
                    sizeOfOneMinuteInPx={sizeOfOneMinuteInPx}
                />
            </Box>
            <ScrollControl
                containerRef={containerRef}
                direction="right"
                position="absolute"
                right={0}
                backgroundColor="white"
                zIndex={7}
            />
        </Flex>
    );
};
