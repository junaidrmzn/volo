import type { Locale } from "date-fns";
import {
    addMinutes,
    differenceInDays,
    differenceInMinutes,
    formatDuration as fnsFormatDuration,
    intervalToDuration,
    subMinutes,
} from "date-fns";
import { format, utcToZonedTime } from "date-fns-tz";

/**
 * Checks whether the given date is a daylight saving time (Summer Time)
 *
 * @param date The date
 * @returns True if the date is a DST, false otherwise
 */
export const isDST = (date: Date) => {
    const jan = new Date(date.getFullYear(), 0, 1).getTimezoneOffset();
    const jul = new Date(date.getFullYear(), 6, 1).getTimezoneOffset();
    return Math.max(jan, jul) !== date.getTimezoneOffset();
};

/**
 * Sets the timezone of the given date to UTC (e.g. 2022/03/22 18:00:00 GMT+0100 will become 2022/03/22 18:00:00 UTC)
 *
 * @param date The date
 * @returns The date with a UTC timezone
 */
export const toUTCDate = (date: Date) => {
    const offset = date.getTimezoneOffset();
    const negativeOffset = Math.sign(offset) === -1;
    return negativeOffset ? addMinutes(date, Math.abs(offset)) : subMinutes(date, offset);
};

/**
 * Sets the timezone of the given date to the local timezone (e.g. 2022/03/22 18:00:00 UTC in Germany will become 2022/03/22 18:00:00 GMT+0100)
 *
 * @param utcDate The date
 * @returns The date with a local timezone
 */
export const toLocalDate = (utcDate: Date) => {
    const offset = new Date(utcDate).getTimezoneOffset();
    const negativeOffset = Math.sign(offset) === -1;
    return negativeOffset ? subMinutes(utcDate, Math.abs(offset)) : addMinutes(utcDate, offset);
};

/**
 * Formats the given UTC date
 *
 * @param date The UTC date
 * @param formatting The format of the date
 * @returns The formatted UTC date string
 */
export const formatUTCDate = (date: Date, formatting = "yyyy-MM-dd H:mm", hideUtcPostfix: boolean = false) => {
    const formattedDate = format(utcToZonedTime(date, "UTC"), formatting, { timeZone: "UTC" });
    return hideUtcPostfix ? formattedDate : `${formattedDate} UTC`;
};

/**
 * Formats the given duration to a human readable string (e.g. a duration of 4632 would return "1 h 17 min 12 s")
 *
 * @param duration The duration in seconds
 * @returns The formatted duration string
 */
export const formatDuration = (duration: number) => {
    if (duration === 0) {
        return "0 s";
    }

    const formatDistanceLocale = {
        xHours: "{count} h",
        xMinutes: "{count} min",
        xSeconds: "{count} s",
    };

    const shortEnLocale: Partial<Locale> = {
        formatDistance: (token: keyof typeof formatDistanceLocale, count: string) =>
            formatDistanceLocale[token].replace("{count}", count),
    };

    return fnsFormatDuration(intervalToDuration({ start: 0, end: duration * 1000 }), {
        format: ["hours", "minutes", "seconds"],
        locale: shortEnLocale,
    });
};

/**
 * Returns the duration between two dates
 *
 * @param fromDate the Starting Date
 * @param toDate the Ending Date
 * @returns The total duration in days
 */
export const getDurationInDays = (fromDate: Date, toDate: Date) => {
    return Math.abs(differenceInDays(toDate, fromDate));
};

export const getDurationInMinutes = (fromDate: Date, toDate: Date) => {
    return Math.abs(differenceInMinutes(toDate, fromDate));
};
