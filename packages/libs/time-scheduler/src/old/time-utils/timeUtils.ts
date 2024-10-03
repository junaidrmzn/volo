import {
    differenceInDays,
    differenceInHours,
    differenceInMinutes,
    differenceInMonths,
    getDaysInMonth,
    startOfDay,
    startOfHour,
    startOfMinute,
    startOfMonth,
} from "date-fns";
import { match } from "ts-pattern";
import { add } from "./add";
import { differenceInQuarterHours, startOfQuarterHour } from "./quarterHour";
import type { TimeUnit } from "./timeUnit";

export const calculateWidthOfUnit = (date: Date, timeUnit: TimeUnit, sizeOfOneMinuteInPx: number) =>
    match(timeUnit)
        .with("minutes", () => sizeOfOneMinuteInPx)
        .with("quarterHours", () => 15 * sizeOfOneMinuteInPx)
        .with("hours", () => 60 * sizeOfOneMinuteInPx)
        .with("days", () => 24 * 60 * sizeOfOneMinuteInPx)
        .with("months", () => getDaysInMonth(date) * 24 * 60 * sizeOfOneMinuteInPx)
        .exhaustive();

export const differenceIn = (timeUnit: TimeUnit, dateA: Date, dateB: Date) =>
    match(timeUnit)
        .with("minutes", () => differenceInMinutes(dateA, dateB))
        .with("quarterHours", () => differenceInQuarterHours(dateA, dateB))
        .with("hours", () => differenceInHours(dateA, dateB))
        .with("days", () => differenceInDays(dateA, dateB))
        .with("months", () => differenceInMonths(dateA, dateB))
        .exhaustive();

export const startOf = (timeUnit: TimeUnit, date: Date) =>
    match(timeUnit)
        .with("minutes", () => startOfMinute(date))
        .with("quarterHours", () => startOfQuarterHour(date))
        .with("hours", () => startOfHour(date))
        .with("days", () => startOfDay(date))
        .with("months", () => startOfMonth(date))
        .exhaustive();

export const timeRange = (startDate: Date, endDate: Date, timeUnit: TimeUnit) => {
    const difference = differenceIn(timeUnit, endDate, startDate);
    return Array.from({ length: difference + 1 })
        .fill(undefined)
        .map((_, index) => startOf(timeUnit, add(startDate, { [timeUnit]: index })));
};
