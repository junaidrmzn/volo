import { differenceInMinutes } from "date-fns";
import { add } from "../../time-utils/add";
import { sub } from "../../time-utils/sub";
import type { TimeUnit } from "../../time-utils/timeUnit";
import { getSmallerTimeUnit, timeUnits } from "../../time-utils/timeUnit";
import { differenceIn, startOf } from "../../time-utils/timeUtils";

type TimeProgressionConfig = { [timeUnit in TimeUnit]: { startZoomFactor: number; unitCount: number } };
export const timeProgressionConfig: TimeProgressionConfig = {
    minutes: { startZoomFactor: 5000, unitCount: 300 },
    quarterHours: { startZoomFactor: 800, unitCount: 300 },
    hours: { startZoomFactor: 100, unitCount: 300 },
    days: { startZoomFactor: 9, unitCount: 150 },
    months: { startZoomFactor: 1, unitCount: 50 },
};

export const getUnitForZoomFactor = (zoomFactor: number) => {
    const unit = timeUnits.find((timeUnit) => {
        const smallerTimeUnit = getSmallerTimeUnit(timeUnit);
        const { startZoomFactor } = timeProgressionConfig[timeUnit];
        const { startZoomFactor: startZoomFactorOfSmallerTimeUnit } = timeProgressionConfig[smallerTimeUnit];

        const endZoomFactor =
            timeUnit === smallerTimeUnit ? Number.POSITIVE_INFINITY : startZoomFactorOfSmallerTimeUnit;

        return startZoomFactor <= zoomFactor && endZoomFactor > zoomFactor;
    });

    if (unit === undefined) {
        throw new Error(`Cannot find unit for zoom factor ${zoomFactor}`);
    }

    return unit;
};

export const progressTimeUnit = (config: {
    startDate: Date;
    leftOffset: number;
    timeUnit: TimeUnit;
    sizeOfOneMinuteInPx: number;
    unitOffset: number;
}) => {
    const { startDate, leftOffset, timeUnit, sizeOfOneMinuteInPx, unitOffset } = config;
    const startOfStartDate = startOf(timeUnit, startDate);
    const offsetInMinutes = leftOffset / sizeOfOneMinuteInPx;
    const visibleDate = add(startDate, { minutes: offsetInMinutes });
    const dateDifference = differenceIn(timeUnit, visibleDate, startOfStartDate);
    const nextStartDate =
        dateDifference > unitOffset
            ? add(startOfStartDate, { [timeUnit]: dateDifference - unitOffset })
            : sub(startOfStartDate, { [timeUnit]: unitOffset - dateDifference });

    const nextLeftOffset = differenceInMinutes(visibleDate, nextStartDate) * sizeOfOneMinuteInPx;

    return { nextStartDate, nextLeftOffset };
};
