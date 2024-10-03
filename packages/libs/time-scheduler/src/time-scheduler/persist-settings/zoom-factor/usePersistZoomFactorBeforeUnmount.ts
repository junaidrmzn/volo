import { useCallback, useEffect } from "react";
import { usePrevious, useUnmount } from "react-use";
import { useTimeSchedulerState } from "../../time-scheduler-state/useTimeSchedulerState";
import { usePersistentSettingsCallback } from "../usePersistentSettingsCallback";

const useShouldWriteZoomFactor = (zoomFactor: number): boolean => {
    const previousZoomFactor = usePrevious(zoomFactor);
    // Skip the first value - otherwise, we would write the default value before the persisted value is read from
    // localStorage.
    return zoomFactor !== previousZoomFactor && previousZoomFactor !== undefined;
};

const useBeforeUnload = (onBeforeUnload: () => void) => {
    useEffect(() => {
        window.addEventListener("beforeunload", onBeforeUnload);
        return () => {
            window.addEventListener("beforeunload", onBeforeUnload);
        };
    }, [onBeforeUnload]);
};

export const usePersistZoomFactorBeforeUnmount = () => {
    const { zoomFactor } = useTimeSchedulerState();
    const { executeIfSettingsArePersisted } = usePersistentSettingsCallback();
    const shouldWriteZoomFactor = useShouldWriteZoomFactor(zoomFactor);

    const persistZoom = useCallback(() => {
        if (shouldWriteZoomFactor) {
            executeIfSettingsArePersisted((identifier) => {
                localStorage.setItem(`${identifier}-zoomFactor`, `${zoomFactor}`);
            });
        }
    }, [zoomFactor, executeIfSettingsArePersisted, shouldWriteZoomFactor]);

    useBeforeUnload(persistZoom);
    useUnmount(persistZoom);
};
