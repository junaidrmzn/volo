import type { TimeSchedulerState } from "../time-scheduler-state/timeSchedulerState";
import { getUnitForZoomFactor, progressTimeUnit, timeProgressionConfig } from "./timeUnitProgression";

export type ZoomAction = {
    type: "zoom";
    zoomFactor: number;
    leftOffset: number;
    mouseCursorOffset: number;
};

const adjustPositionOfHoveredUnitAfterZoom = (
    mouseCursorOffset: number,
    leftOffset: number,
    zoomFactor: number,
    nextZoomFactor: number
) => {
    const zoomFactorDelta = nextZoomFactor / zoomFactor;
    const mousePositionRelativeToCurrentUnitWidth = (leftOffset + mouseCursorOffset) * zoomFactorDelta;
    const nextLeftOffset = mousePositionRelativeToCurrentUnitWidth - mouseCursorOffset;

    return nextLeftOffset;
};

export const zoomReducer =
    (state: TimeSchedulerState) =>
    (zoomAction: ZoomAction): TimeSchedulerState => {
        const { startDate, timeUnit, zoomFactor, baseSizeOfOneMinuteInPx, unitOffset } = state;
        const { zoomFactor: nextZoomFactor, leftOffset, mouseCursorOffset } = zoomAction;
        if (nextZoomFactor < 1) return state;
        const timeUnitForZoomFactor = getUnitForZoomFactor(nextZoomFactor);
        const nextLeftOffset = adjustPositionOfHoveredUnitAfterZoom(
            mouseCursorOffset,
            leftOffset,
            zoomFactor,
            nextZoomFactor
        );

        if (timeUnitForZoomFactor !== timeUnit) {
            const { unitCount } = timeProgressionConfig[timeUnitForZoomFactor];
            const { nextStartDate, nextLeftOffset } = progressTimeUnit({
                startDate,
                leftOffset,
                sizeOfOneMinuteInPx: baseSizeOfOneMinuteInPx * Math.min(zoomFactor, nextZoomFactor),
                timeUnit: timeUnitForZoomFactor,
                unitOffset,
            });

            return {
                ...state,
                zoomFactor: nextZoomFactor,
                startDate: nextStartDate,
                leftOffset: nextLeftOffset,
                unitCount,
                timeUnit: timeUnitForZoomFactor,
            };
        }

        return {
            ...state,
            zoomFactor: nextZoomFactor,
            leftOffset: nextLeftOffset,
        };
    };
