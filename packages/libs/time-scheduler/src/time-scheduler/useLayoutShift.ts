import { useLayoutEffect } from "react";
import { usePrevious } from "react-use";
import { useScroll } from "./scroll/context/useScroll";
import { useTimeSchedulerState } from "./time-scheduler-state/useTimeSchedulerState";

export const useLayoutShift = () => {
    const { leftOffset, startDate, zoomFactor } = useTimeSchedulerState();
    const previousStartDate = usePrevious(startDate);
    const previousZoomFactor = usePrevious(zoomFactor);

    const { scrollTo } = useScroll();
    useLayoutEffect(() => {
        const didStartDateChange = previousStartDate !== undefined && previousStartDate !== startDate;
        const didZoomFactorChange = previousZoomFactor !== undefined && previousZoomFactor !== zoomFactor;
        if (didStartDateChange || didZoomFactorChange) {
            scrollTo(leftOffset);
        }
    }, [previousStartDate, startDate, leftOffset, scrollTo, previousZoomFactor, zoomFactor]);
};
