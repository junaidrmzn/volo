import { add as dateFnsAdd } from "date-fns";
import type { TimeUnit } from "./timeUnit";

export const add = <DateType extends Date>(
    dirtyDate: DateType | number,
    duration: { [timeUnit in TimeUnit]?: number }
) => {
    const { quarterHours = 0, ...dateFnsDuration } = duration;
    const minutes = dateFnsDuration.minutes ?? 0;
    dateFnsDuration.minutes = minutes + quarterHours * 15;

    return dateFnsAdd(dirtyDate, dateFnsDuration);
};
