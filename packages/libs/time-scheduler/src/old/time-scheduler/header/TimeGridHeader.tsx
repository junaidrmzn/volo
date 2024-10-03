import type { FlexProps } from "@volocopter/design-library-react";
import { Box, Button, Flex, useColorModeValue } from "@volocopter/design-library-react";
import type { RefObject } from "react";
import { TimeLine } from "../../time-line/TimeLine";
import { add } from "../../time-utils/add";
import { ScrollControl } from "../scroll/ScrollControl";
import { useScroll } from "../scroll/context/useScroll";
import { useTimeSchedulerState } from "../time-scheduler-state/useTimeSchedulerState";
import { CalendarDateSelection } from "./CalendarDateSelection";
import { useInitialScroll } from "./useInitialScroll";
import { useWheelZoom } from "./useWheelZoom";

export type TimeGridHeaderProps = {
    containerRef: RefObject<HTMLDivElement>;
    timelineStartDate?: Date;
};

export const TimeGridHeader = (props: TimeGridHeaderProps) => {
    const { containerRef, timelineStartDate } = props;
    const { startDate, unitCount, baseSizeOfOneMinuteInPx, zoomFactor, timeUnit, dispatch } = useTimeSchedulerState();
    const sizeOfOneMinuteInPx =
        baseSizeOfOneMinuteInPx * zoomFactor + (timeUnit === "minutes" ? 0.8 : timeUnit === "days" ? 0.002 : 0.02);
    const endDate = add(startDate, { [timeUnit]: unitCount });
    const backgroundColor = useColorModeValue("gray.200", "gray.900");

    const { headerRef } = useScroll();

    const flexProps: FlexProps = {
        position: "sticky",
        top: 0,
    };

    useWheelZoom();
    useInitialScroll(timelineStartDate);

    const scrollToNow = () => {
        dispatch({
            type: "zoom",
            zoomFactor: 1400,
            leftOffset: 0,
            mouseCursorOffset: 0,
        });
        dispatch({ type: "setCurrentStartDate" });
    };

    return (
        <>
            <Flex flexDirection="row" alignItems="flex-end" justifyContent="end">
                <CalendarDateSelection />
                <Button
                    ml={2}
                    onClick={() => {
                        scrollToNow();
                    }}
                >
                    Now
                </Button>
            </Flex>
            <Flex flexDirection="row" alignItems="flex-end" backgroundColor={backgroundColor} zIndex={6} {...flexProps}>
                <ScrollControl containerRef={containerRef} direction="left" />
                <Box
                    width="100%"
                    height="60px"
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
                <ScrollControl containerRef={containerRef} direction="right" />
            </Flex>
        </>
    );
};
