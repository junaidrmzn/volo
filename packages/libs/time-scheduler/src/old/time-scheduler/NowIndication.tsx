import type { BoxProps } from "@volocopter/design-library-react";
import { Box } from "@volocopter/design-library-react";
import { differenceInMinutes } from "date-fns";
import { useTimeSchedulerState } from "./time-scheduler-state/useTimeSchedulerState";

export type NowIndicationProps = Pick<BoxProps, "zIndex">;
export const NowIndication = (props: NowIndicationProps) => {
    const { startDate, baseSizeOfOneMinuteInPx, zoomFactor } = useTimeSchedulerState();
    return (
        <Box
            width={0.5}
            position="absolute"
            top={0}
            bottom={0}
            left={0}
            background="brightBlue.500"
            transform={`translateX(${Math.round(
                differenceInMinutes(Date.now(), startDate) * baseSizeOfOneMinuteInPx * zoomFactor
            )}px)`}
            {...props}
        />
    );
};
