import { sub as dateFnsSub } from "date-fns";
import type { TimeUnit } from "./timeUnit";

export const sub = <DateType extends Date>(
    dirtyDate: DateType | number,
    duration: { [timeUnit in TimeUnit]?: number }
) => {
    const { quarterHours = 0, ...dateFnsDuration } = duration;
    const minutes = dateFnsDuration.minutes ?? 0;
    dateFnsDuration.minutes = minutes + quarterHours * 15;

    return dateFnsSub(dirtyDate, dateFnsDuration);
};
