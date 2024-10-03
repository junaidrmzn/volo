import type { RefObject } from "react";
import { useLayoutEffect } from "react";
import { useLatest } from "react-use";
import { useTimeSchedulerState } from "../../time-scheduler-state/useTimeSchedulerState";
import { usePersistentSettingsCallback } from "../usePersistentSettingsCallback";

export const usePersistScrollPositionBeforeUnmount = (containerRef: RefObject<HTMLElement>) => {
    const { startDate } = useTimeSchedulerState();
    const startDateRef = useLatest(startDate);
    const { executeIfSettingsArePersisted } = usePersistentSettingsCallback();

    useLayoutEffect(() => {
        const onBeforeUnmount = () => {
            executeIfSettingsArePersisted((identifier) => {
                const { current: startDate } = startDateRef;
                const leftOffset = containerRef.current?.scrollLeft;
                localStorage.setItem(`${identifier}-startDate`, `${startDate.toISOString()}`);
                localStorage.setItem(`${identifier}-leftOffset`, `${leftOffset ?? 0}`);
            });
        };
        window.addEventListener("beforeunload", onBeforeUnmount);
        return () => {
            onBeforeUnmount();
            window.removeEventListener("beforeunload", onBeforeUnmount);
        };
    }, [containerRef, startDateRef, executeIfSettingsArePersisted]);
};
