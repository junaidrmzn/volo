import { addSeconds, differenceInMinutes, differenceInSeconds, subSeconds } from "date-fns";
import { match } from "ts-pattern";
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

export const calcNextLeftOffset = (config: {
    startDate: Date;
    nextStartDate: Date;
    leftOffset: number;
    mouseCursorOffset: number;
    baseSizeOfOneMinuteInPx: number;
    zoomFactor: number;
    nextZoomFactor: number;
}) => {
    const {
        startDate,
        nextStartDate,
        leftOffset,
        mouseCursorOffset,
        baseSizeOfOneMinuteInPx,
        zoomFactor,
        nextZoomFactor,
    } = config;

    const dateUnderCursor = addSeconds(
        startDate,
        ((mouseCursorOffset + leftOffset) / (baseSizeOfOneMinuteInPx * zoomFactor)) * 60
    );

    const minInPx = baseSizeOfOneMinuteInPx * nextZoomFactor;
    const secondsToCursor = differenceInSeconds(dateUnderCursor, nextStartDate);
    const nextLeftOffset = (secondsToCursor / 60) * minInPx - mouseCursorOffset;

    const nextDateUnderCursor = addSeconds(
        nextStartDate,
        ((mouseCursorOffset + nextLeftOffset) / (baseSizeOfOneMinuteInPx * nextZoomFactor)) * 60
    );

    if (nextLeftOffset < 0) {
        const minsToGoInPast = (nextLeftOffset * -1) / minInPx;
        const newStartDate = subSeconds(startDate, minsToGoInPast * 60);

        const nextDateUnderCursor = addSeconds(
            newStartDate,
            (mouseCursorOffset / (baseSizeOfOneMinuteInPx * nextZoomFactor)) * 60
        );

        return { nextLeftOffset: 0, nextDateUnderCursor, nextStartDate: newStartDate };
    }

    return { nextLeftOffset: Math.round(nextLeftOffset), nextDateUnderCursor, nextStartDate };
};

export const minutesInTimeUnits = (timeUnit: TimeUnit) => {
    return match(timeUnit)
        .with("minutes", () => 1)
        .with("quarterHours", () => 15)
        .with("hours", () => 60)
        .with("days", () => 60 * 24)
        .with("months", () => 60 * 24 * 30)
        .exhaustive();
};

export const getUnitCountForZoomFactor = (config: {
    startDate: Date;
    endDate: Date;
    baseSizeOfOneMinuteInPx: number;
    width: number;
}) => {
    const { startDate, endDate, baseSizeOfOneMinuteInPx, width } = config;

    const diffInMins = differenceInSeconds(endDate, startDate) / 60;
    const sizeOfOneMinuteInPx = width / diffInMins;
    const zoomFactor = sizeOfOneMinuteInPx / baseSizeOfOneMinuteInPx;

    const timeUnit = getUnitForZoomFactor(zoomFactor);
    const unitCount = diffInMins / minutesInTimeUnits(timeUnit);

    return { timeUnit, unitCount, zoomFactor };
};
