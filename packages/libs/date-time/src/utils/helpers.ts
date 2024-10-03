export const isString = (input: unknown): input is string => typeof input === "string";

export const formatTwoLetterDigit = (value: number) => {
    const stringValue = `${value}`;
    return value < 10 ? stringValue.padStart(2, "0") : stringValue;
};

export const getLocaleDate = (date: Date, timeZone?: string) => {
    return new Date(
        date.toLocaleString("en-US", {
            timeZone,
        })
    );
};

export const dateToLocalDateString = (date: Date) => {
    return `${date.getFullYear()}-${formatTwoLetterDigit(date.getMonth() + 1)}-${formatTwoLetterDigit(date.getDate())}`;
};

export const dateToLocalTimeString = (date: Date) => {
    return `${formatTwoLetterDigit(date.getHours())}:${formatTwoLetterDigit(date.getMinutes())}`;
};

export const dateToUtcDateString = (date: Date) => {
    return `${date.getUTCFullYear()}-${formatTwoLetterDigit(date.getUTCMonth() + 1)}-${formatTwoLetterDigit(
        date.getUTCDate()
    )}`;
};

export const dateToUtcTimeString = (date: Date) => {
    return `${formatTwoLetterDigit(date.getUTCHours())}:${formatTwoLetterDigit(date.getUTCMinutes())}`;
};

export const prepareDate = (input: Date | string, timeZone?: string) => {
    const date = isString(input) ? new Date(input) : input;
    return timeZone ? getLocaleDate(date, timeZone) : date;
};
