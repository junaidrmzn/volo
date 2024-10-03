import type { TimeSchedulerState } from "../time-scheduler-state/timeSchedulerState";
import { getUnitCountForZoomFactor, timeProgressionConfig } from "./timeUnitProgression";

export type SetDateRangeAction = {
    type: "setDateRange";
    startDate: Date;
    endDate: Date;
    width: number;
};

export const dateRangeReducer =
    (state: TimeSchedulerState) =>
    (dateRangeAction: SetDateRangeAction): TimeSchedulerState => {
        const { baseSizeOfOneMinuteInPx } = state;
        const { startDate, endDate, width } = dateRangeAction;

        const { timeUnit, unitCount, zoomFactor } = getUnitCountForZoomFactor({
            startDate,
            endDate,
            baseSizeOfOneMinuteInPx,
            width,
        });

        const { unitCount: unitOffset } = timeProgressionConfig[timeUnit];
        if (zoomFactor < 1) return state;

        return {
            ...state,
            zoomFactor,
            startDate,
            leftOffset: 0,
            unitCount: unitCount + unitOffset,
            timeUnit,
        };
    };
