import type { RefObject } from "react";
import { useEffect } from "react";
import { useTimeSchedulerState } from "../../time-scheduler-state/useTimeSchedulerState";
import { usePersistentSettingsCallback } from "../usePersistentSettingsCallback";

export const useInitialZoomFactor = (containerRef: RefObject<HTMLElement>) => {
    const { dispatch } = useTimeSchedulerState();
    const { executeIfSettingsArePersisted } = usePersistentSettingsCallback();

    useEffect(() => {
        executeIfSettingsArePersisted((identifier) => {
            const zoomFactorString = localStorage.getItem(`${identifier}-zoomFactor`);
            const { current: element } = containerRef;
            if (zoomFactorString !== null && element !== null) {
                const zoomFactor = Number.parseFloat(zoomFactorString);
                const { scrollLeft: leftOffset } = element;

                if (!Number.isNaN(zoomFactor)) {
                    dispatch({
                        type: "zoom",
                        zoomFactor,
                        leftOffset,
                        mouseCursorOffset: 0,
                    });
                }
            }
        });
    }, [dispatch, containerRef, executeIfSettingsArePersisted]);
};
