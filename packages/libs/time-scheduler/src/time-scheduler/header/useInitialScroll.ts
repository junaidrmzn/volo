import { useEffect } from "react";
import { useTimeSchedulerState } from "../time-scheduler-state/useTimeSchedulerState";

export const useInitialScroll = (timelineStartDate?: Date) => {
    const { dispatch } = useTimeSchedulerState();

    useEffect(() => {
        if (timelineStartDate) {
            dispatch({ type: "setStartDate", startDate: timelineStartDate });
            dispatch({
                type: "zoom",
                zoomFactor: 1400,
                leftOffset: 0,
                mouseCursorOffset: 0,
            });
        }
    }, [dispatch, timelineStartDate]);
};
