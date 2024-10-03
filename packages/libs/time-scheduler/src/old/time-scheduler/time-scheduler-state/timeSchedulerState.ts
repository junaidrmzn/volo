import { sub } from "../../time-utils/sub";
import type { TimeUnit } from "../../time-utils/timeUnit";
import { startOf } from "../../time-utils/timeUtils";

export type TimeSchedulerState = {
    timeUnit: TimeUnit;
    unitCount: number;
    startDate: Date;
    zoomFactor: number;
    leftOffset: number;
    baseSizeOfOneMinuteInPx: number;
    unitOffset: number;
};

const timeUnit: TimeUnit = "quarterHours";
export const initialTimeSchedulerState: TimeSchedulerState = {
    timeUnit,
    unitCount: 300,
    startDate: sub(startOf(timeUnit, new Date()), { [timeUnit]: 4 }),
    zoomFactor: 1000,
    leftOffset: 0,
    baseSizeOfOneMinuteInPx: 0.005,
    unitOffset: 3,
};
