const isString = (input: unknown): input is string => typeof input === "string";

const changeTimeZone = (date: Date, timeZone?: string) => {
    return new Date(
        date.toLocaleString("en-US", {
            timeZone,
        })
    );
};

const formatTwoLetterDigit = (value: number) => {
    return value < 10 ? `0${value}` : value;
};

const dateToDateString = (date: Date) => {
    return `${date.getFullYear()}-${formatTwoLetterDigit(date.getMonth() + 1)}-${formatTwoLetterDigit(date.getDate())}`;
};

const dateToTimeString = (date: Date) => {
    return `${formatTwoLetterDigit(date.getHours())}:${formatTwoLetterDigit(date.getMinutes())}`;
};

const prepareDate = (input: Date | string, globalTimeZone?: string, specificTimeZone?: string) => {
    const date: Date = isString(input) ? new Date(input) : input;
    const currentTimeZone = specificTimeZone || globalTimeZone;
    return currentTimeZone ? changeTimeZone(date, currentTimeZone) : date;
};

export const useFormatDateTime = (timeZone?: string) => {
    const formatDateTime = (input: string | Date, specificTimeZone?: string) => {
        const date = prepareDate(input, timeZone, specificTimeZone);
        return `${dateToDateString(date)} ${dateToTimeString(date)}`;
    };

    const formatDate = (input: string | Date, specificTimeZone?: string) => {
        const date = prepareDate(input, timeZone, specificTimeZone);
        return dateToDateString(date);
    };

    const formatTime = (input: string | Date, specificTimeZone?: string) => {
        const date = prepareDate(input, timeZone, specificTimeZone);
        return dateToTimeString(date);
    };

    const formatTimeZoneShortName = (input: string | Date, specificTimeZone?: string) => {
        const date: Date = isString(input) ? new Date(input) : input;
        const currentTimeZone = specificTimeZone || timeZone || "UTC";
        return Intl.DateTimeFormat("en-EN", { timeZone: currentTimeZone, timeZoneName: "short" })
            .formatToParts(date)
            .at(6)?.value;
    };

    return { formatDateTime, formatDate, formatTime, formatTimeZoneShortName, changeTimeZone };
};
