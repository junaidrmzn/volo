import type { BoxProps } from "@volocopter/design-library-react";
import { Box, useColorModeValue } from "@volocopter/design-library-react";
import { differenceInMinutes } from "date-fns";
import { add } from "../time-utils/add";
import { timeRange } from "../time-utils/timeUtils";
import { useTimeSchedulerState } from "./time-scheduler-state/useTimeSchedulerState";

export type TimeUnitLinesProps = Pick<BoxProps, "zIndex">;

export const TimeUnitLines = (props: TimeUnitLinesProps) => {
    const { startDate, unitCount, timeUnit, baseSizeOfOneMinuteInPx, zoomFactor } = useTimeSchedulerState();
    const endDate = add(startDate, { [timeUnit]: unitCount });
    const dates = timeRange(startDate, endDate, timeUnit);
    const gridItemColor = useColorModeValue("gray.300", "monochrome.100");

    return (
        <>
            {dates.map((date) => {
                return (
                    <Box
                        {...props}
                        key={date.toISOString()}
                        transform={`translateX(${
                            Math.round(differenceInMinutes(date, startDate) * baseSizeOfOneMinuteInPx * zoomFactor) - 1
                        }px)`}
                        borderLeftWidth="1px"
                        borderLeftStyle="dashed"
                        borderLeftColor={gridItemColor}
                        width={0}
                        bottom={0}
                        left={0}
                        top={0}
                        position="absolute"
                    />
                );
            })}
        </>
    );
};
