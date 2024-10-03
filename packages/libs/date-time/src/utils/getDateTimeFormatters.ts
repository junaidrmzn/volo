import { UTC } from "./constants";
import {
    dateToLocalDateString,
    dateToLocalTimeString,
    dateToUtcDateString,
    dateToUtcTimeString,
    prepareDate,
} from "./helpers";

export const getDateTimeFormatters = (timeZone?: string) => {
    const formatDateTime = (input: string | Date): string => {
        const date = prepareDate(input, timeZone);
        return `${dateToLocalDateString(date)} ${dateToLocalTimeString(date)}`;
    };

    const formatDate = (input: string | Date): string => {
        const date = prepareDate(input, timeZone);
        return dateToLocalDateString(date);
    };

    const formatTime = (input: string | Date): string => {
        const date = prepareDate(input, timeZone);
        return dateToLocalTimeString(date);
    };

    const formatUtcDateTime = (input: string | Date): string => {
        const date = prepareDate(input, timeZone);
        return `${dateToUtcDateString(date)} ${dateToUtcTimeString(date)}`;
    };
    const formatUtcDate = (input: string | Date): string => {
        const date = prepareDate(input, timeZone);
        return dateToUtcDateString(date);
    };

    const formatUtcTime = (input: string | Date): string => {
        const date = prepareDate(input, timeZone);
        return dateToUtcTimeString(date);
    };

    const formatTimeZoneShortName = (input: string | Date): string => {
        const date: Date = prepareDate(input);
        return Intl.DateTimeFormat("en-EN", { timeZone, timeZoneName: "short" }).formatToParts(date).at(6)
            ?.value as string;
    };

    const formatLocalTimeZoneShortName = (input: string | Date): string => {
        const date: Date = prepareDate(input, timeZone);
        const timeZoneShortName = formatTimeZoneShortName(date);
        return `local - ${UTC}${timeZoneShortName[3]}${timeZoneShortName[4]}`;
    };

    return {
        formatDate,
        formatDateTime,
        formatTime,
        formatTimeZoneShortName,
        formatLocalTimeZoneShortName,
        formatUtcDate,
        formatUtcDateTime,
        formatUtcTime,
    };
};
