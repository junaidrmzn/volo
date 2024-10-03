import { format, isSameDay, isSameHour, isSameMinute, isSameMonth } from "date-fns";
import { match } from "ts-pattern";
import { isSameQuarterHour } from "../time-utils/quarterHour";
import type { TimeUnit } from "../time-utils/timeUnit";

export const formatDateToUnit = (date: Date, timeUnit: TimeUnit) => {
    const formatDate = (formatCode: string) => () => format(date, formatCode);
    return match(timeUnit)
        .with("minutes", formatDate("mm"))
        .with("quarterHours", formatDate("HH:mm"))
        .with("hours", formatDate("HH"))
        .with("days", formatDate("dd EEE"))
        .with("months", formatDate("MMM"))
        .exhaustive();
};

export const isUnitClosestToNow = (date: Date, timeUnit: TimeUnit) => {
    const compareCurrentDate = (matcher: (leftDate: Date, rightDate: Date) => boolean) => () =>
        matcher(new Date(), date);
    return match(timeUnit)
        .with("minutes", compareCurrentDate(isSameMinute))
        .with("quarterHours", compareCurrentDate(isSameQuarterHour))
        .with("hours", compareCurrentDate(isSameHour))
        .with("days", compareCurrentDate(isSameDay))
        .with("months", compareCurrentDate(isSameMonth))
        .exhaustive();
};
