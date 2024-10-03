import { format } from "date-fns";
import { useMemo } from "react";
import { match } from "ts-pattern";
import type { TimeUnit } from "../time-utils/timeUnit";

export const useIntervalLabels = (dates: Date[], unit: TimeUnit) => {
    const intervalLabels = useMemo(() => {
        const overarchingDates: Record<string, number> = {};
        for (const date of dates) {
            const formatCode = match(unit)
                .with("minutes", () => "EEE dd.LL.yy, haa")
                .with("quarterHours", () => "EEE dd.LL.yy")
                .with("hours", () => "EEE dd.LL.yy")
                .with("days", () => "MMM yy")
                .with("months", () => "yyyy")
                .exhaustive();
            const intervalLabel = format(date, formatCode);
            overarchingDates[intervalLabel] = (overarchingDates[intervalLabel] ?? 0) + 1;
        }
        return overarchingDates;
    }, [dates, unit]);

    return { intervalLabels };
};
