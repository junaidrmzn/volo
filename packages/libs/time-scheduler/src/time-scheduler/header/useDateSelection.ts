import { addSeconds, isEqual } from "date-fns";
import { RefObject, useCallback, useEffect, useState } from "react";
import { useDebounce } from "react-use";
import { useTimeSchedulerState } from "../time-scheduler-state/useTimeSchedulerState";

export const useDateSelection = (containerRef: RefObject<HTMLDivElement>) => {
    const {
        dispatch,
        startDate: initialStartDate,
        zoomFactor: previousZoomFactor,
        baseSizeOfOneMinuteInPx,
        leftOffset,
    } = useTimeSchedulerState();

    const [dateRange, setDateRange] = useState<[Date, Date]>();
    const [width, setWidth] = useState(0);

    const handleDone = (dates?: [Date, Date]) => {
        if (!dates || isEqual(dates?.[0], dates?.[1])) return;
        setDateRange(dates);
        const [startDate, endDate] = dates;

        const width = containerRef.current?.getBoundingClientRect()?.width || 0;
        dispatch({
            type: "setDateRange",
            startDate,
            width,
            endDate,
        });
    };

    const updateDateRange = useCallback(() => {
        const newStartDate = addSeconds(
            initialStartDate,
            (leftOffset / (baseSizeOfOneMinuteInPx * previousZoomFactor)) * 60
        );
        const newEndDate = addSeconds(
            initialStartDate,
            ((leftOffset + width) / (baseSizeOfOneMinuteInPx * previousZoomFactor)) * 60
        );
        setDateRange([newStartDate, newEndDate]);
    }, [initialStartDate, leftOffset, baseSizeOfOneMinuteInPx, previousZoomFactor, width]);

    useDebounce(updateDateRange, 300, [width, leftOffset]);

    useEffect(() => {
        const container = containerRef.current;
        if (!container) return;

        const resizeObserver = new ResizeObserver(() => {
            setWidth(container.getBoundingClientRect().width || 0);
        });

        resizeObserver.observe(container);

        // eslint-disable-next-line consistent-return
        return () => {
            resizeObserver.unobserve(container);
        };
    }, [containerRef]);

    useEffect(() => {
        updateDateRange();
    }, [updateDateRange]);

    return { dateRange, handleDone };
};
