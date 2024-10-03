import { useEffect } from "react";
import type { TimeUnit } from "../../time-utils/timeUnit";
import { useTimeSchedulerState } from "../time-scheduler-state/useTimeSchedulerState";

export type OnZoomUpdate = (timeUnit: TimeUnit) => Promise<void> | void;

export type UseZoomUpdateProps = {
    OnZoomUpdate?: OnZoomUpdate;
};

export const useZoomUpdate = (props: UseZoomUpdateProps) => {
    const { OnZoomUpdate } = props;
    const { timeUnit } = useTimeSchedulerState();

    useEffect(() => {
        if (OnZoomUpdate) {
            OnZoomUpdate(timeUnit);
        }
    }, [timeUnit, OnZoomUpdate]);
};
