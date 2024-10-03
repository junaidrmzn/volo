import type { RefObject } from "react";
import { useEffect } from "react";
import { useTimeSchedulerState } from "../../time-scheduler-state/useTimeSchedulerState";
import { usePersistentSettingsCallback } from "../usePersistentSettingsCallback";

export const useInitialScrollPosition = (containerRef: RefObject<HTMLElement>) => {
    const { dispatch } = useTimeSchedulerState();
    const { executeIfSettingsArePersisted } = usePersistentSettingsCallback();

    useEffect(() => {
        executeIfSettingsArePersisted((identifier) => {
            const startDateString = localStorage.getItem(`${identifier}-startDate`);
            const leftOffsetString = localStorage.getItem(`${identifier}-leftOffset`);
            if (startDateString !== null && leftOffsetString !== null) {
                const leftOffset = Number.parseInt(leftOffsetString, 10);
                const startDate = new Date(startDateString);
                dispatch({
                    type: "setScrollPosition",
                    leftOffset,
                    startDate,
                });
            }
        });
    }, [dispatch, containerRef, executeIfSettingsArePersisted]);
};
