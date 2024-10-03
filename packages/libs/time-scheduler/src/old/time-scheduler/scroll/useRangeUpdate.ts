import { useEffect } from "react";
import { usePrevious } from "react-use";
import { add } from "../../time-utils/add";
import type { TimeUnit } from "../../time-utils/timeUnit";
import { useTimeSchedulerState } from "../time-scheduler-state/useTimeSchedulerState";

export type TimeRange = {
    startDate: Date;
    endDate: Date;
};

export type OnRangeUpdate = (range: TimeRange, previousRange?: TimeRange) => Promise<void> | void;

export type UseRangeUpdateProps = {
    onRangeUpdate?: OnRangeUpdate;
};

const getRange = (startDate: Date, unitCount: number, timeUnit: TimeUnit) => ({
    startDate,
    endDate: add(startDate, { [timeUnit]: unitCount }),
});

export const useRangeUpdate = (props: UseRangeUpdateProps) => {
    const { onRangeUpdate } = props;
    const { startDate, unitCount, timeUnit } = useTimeSchedulerState();

    const range = getRange(startDate, unitCount, timeUnit);
    const previousRange = usePrevious(range);
    useEffect(() => {
        if (onRangeUpdate && JSON.stringify(previousRange) !== JSON.stringify(range)) {
            onRangeUpdate(range, previousRange);
        }
    }, [range, previousRange, onRangeUpdate]);
};
