import { differenceInMinutes } from "date-fns";
import { add } from "../../time-utils/add";
import { sub } from "../../time-utils/sub";
import { startOf } from "../../time-utils/timeUtils";
import type { TimeSchedulerState } from "../time-scheduler-state/timeSchedulerState";

export type ScrollAction = {
    type: "scroll";
    direction: "left" | "right";
    leftOffset: number;
};

export const scrollReducer =
    (state: TimeSchedulerState) =>
    (scrollAction: ScrollAction): TimeSchedulerState => {
        const { startDate, timeUnit, zoomFactor, baseSizeOfOneMinuteInPx } = state;
        const { direction, leftOffset } = scrollAction;
        const shiftedMinutes = Math.round(500 / baseSizeOfOneMinuteInPx / zoomFactor);
        const nextStartDate =
            direction === "left"
                ? startOf(timeUnit, sub(startDate, { minutes: shiftedMinutes }))
                : startOf(timeUnit, add(startDate, { minutes: shiftedMinutes, days: 1 }));

        const shiftedPixels = differenceInMinutes(startDate, nextStartDate) * baseSizeOfOneMinuteInPx * zoomFactor;
        const nextLeftOffset = leftOffset + shiftedPixels;
        return {
            ...state,
            startDate: nextStartDate,
            leftOffset: nextLeftOffset,
        };
    };
