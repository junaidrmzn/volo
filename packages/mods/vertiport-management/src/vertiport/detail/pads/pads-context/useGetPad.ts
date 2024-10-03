import { useState } from "react";
import { TimeRange } from "@voloiq/time-scheduler";
import { useGetAllPads } from "../../../../api-hooks/usePadService";

export type OnRangeUpdateCallback = (range: TimeRange) => void;

export const useGetPad = () => {
    const [timeRange, setTimeRange] = useState<TimeRange>();

    const onRangeUpdate: OnRangeUpdateCallback = (range: TimeRange) => setTimeRange(range);

    const { pads, padsCount, refetchPads } = useGetAllPads({
        startDateTime: timeRange ? timeRange.startDate.toISOString() : "",
        endDateTime: timeRange ? timeRange.endDate.toISOString() : "",
    });

    return { pads, padsCount, timeRange, refetchPads, onRangeUpdate };
};
