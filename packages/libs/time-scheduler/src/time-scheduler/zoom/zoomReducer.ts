import type { TimeSchedulerState } from "../time-scheduler-state/timeSchedulerState";
import {
    calcNextLeftOffset,
    getUnitForZoomFactor,
    progressTimeUnit,
    timeProgressionConfig,
} from "./timeUnitProgression";

export type ZoomAction = {
    type: "zoom";
    zoomFactor: number;
    leftOffset: number;
    mouseCursorOffset: number;
};

export const zoomReducer =
    (state: TimeSchedulerState) =>
    (zoomAction: ZoomAction): TimeSchedulerState => {
        const { startDate, timeUnit, zoomFactor, baseSizeOfOneMinuteInPx, unitOffset } = state;
        const { zoomFactor: nextZoomFactor, leftOffset, mouseCursorOffset } = zoomAction;
        if (nextZoomFactor < 1) return state;
        const timeUnitForZoomFactor = getUnitForZoomFactor(nextZoomFactor);

        if (timeUnitForZoomFactor !== timeUnit) {
            const { unitCount } = timeProgressionConfig[timeUnitForZoomFactor];
            const { nextStartDate } = progressTimeUnit({
                startDate,
                leftOffset,
                sizeOfOneMinuteInPx: baseSizeOfOneMinuteInPx * Math.min(zoomFactor, nextZoomFactor),
                timeUnit: timeUnitForZoomFactor,
                unitOffset,
            });

            const { nextLeftOffset, nextStartDate: newStartDate } = calcNextLeftOffset({
                startDate,
                nextStartDate,
                leftOffset,
                mouseCursorOffset,
                baseSizeOfOneMinuteInPx,
                zoomFactor,
                nextZoomFactor,
            });

            return {
                ...state,
                zoomFactor: nextZoomFactor,
                startDate: newStartDate,
                leftOffset: nextLeftOffset,
                unitCount,
                timeUnit: timeUnitForZoomFactor,
            };
        }

        const { nextLeftOffset, nextStartDate } = calcNextLeftOffset({
            startDate,
            nextStartDate: startDate,
            leftOffset,
            mouseCursorOffset,
            baseSizeOfOneMinuteInPx,
            zoomFactor,
            nextZoomFactor,
        });

        return {
            ...state,
            zoomFactor: nextZoomFactor,
            leftOffset: nextLeftOffset,
            startDate: nextStartDate,
        };
    };
