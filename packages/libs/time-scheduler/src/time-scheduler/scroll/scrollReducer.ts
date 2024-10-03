import { differenceInMinutes } from "date-fns";
import { add } from "../../time-utils/add";
import { sub } from "../../time-utils/sub";
import type { TimeSchedulerState } from "../time-scheduler-state/timeSchedulerState";

export type ScrollAction = {
    type: "scroll";
    direction: "left" | "right";
    leftOffset: number;
    // this is to update the offset only without changing and calculating the dates
    updateOffsetOnly?: boolean;
};

export const scrollReducer =
    (state: TimeSchedulerState) =>
    (scrollAction: ScrollAction): TimeSchedulerState => {
        const { direction, leftOffset, updateOffsetOnly = false } = scrollAction;
        if (updateOffsetOnly) {
            return {
                ...state,
                leftOffset,
            };
        }

        const { startDate, zoomFactor, baseSizeOfOneMinuteInPx } = state;
        const pixelsToShift = 500;
        const minutesToShift = pixelsToShift / (baseSizeOfOneMinuteInPx * zoomFactor);

        const nextStartDate =
            direction === "left"
                ? sub(startDate, { minutes: minutesToShift })
                : add(startDate, { minutes: minutesToShift });

        const shiftedPixels = differenceInMinutes(startDate, nextStartDate) * baseSizeOfOneMinuteInPx * zoomFactor;
        const nextLeftOffset = leftOffset + shiftedPixels;

        return {
            ...state,
            startDate: nextStartDate,
            leftOffset: nextLeftOffset,
        };
    };
