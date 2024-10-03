import { differenceInMilliseconds, toDate } from "date-fns";

export const startOfQuarterHour = <DateType extends Date>(dirtyDate: DateType | number) => {
    const date = toDate(dirtyDate);
    date.setSeconds(0, 0);
    const minutes = Math.floor(date.getMinutes() / 15) * 15;
    date.setMinutes(minutes);
    return date;
};
export const differenceInQuarterHours = <DateType extends Date>(
    dateLeft: DateType | number,
    dateRight: DateType | number
) => Math.trunc(differenceInMilliseconds(dateLeft, dateRight) / (1000 * 60 * 15));

export const isSameQuarterHour = <DateType extends Date>(
    dirtyDateLeft: DateType | number,
    dirtyDateRight: DateType | number
) => {
    const dateLeftStartOfMinute = startOfQuarterHour(dirtyDateLeft);
    const dateRightStartOfMinute = startOfQuarterHour(dirtyDateRight);

    return dateLeftStartOfMinute.getTime() === dateRightStartOfMinute.getTime();
};
