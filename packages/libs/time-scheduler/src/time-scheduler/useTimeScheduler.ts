import { useRef } from "react";
import { usePersistentScrollPosition } from "./persist-settings/scroll-position/usePersistentScrollPosition";
import { usePersistentZoomFactor } from "./persist-settings/zoom-factor/usePersistentZoomFactor";
import type { UseRangeUpdateProps } from "./scroll/useRangeUpdate";
import { useRangeUpdate } from "./scroll/useRangeUpdate";
import { initialTimeSchedulerState } from "./time-scheduler-state/timeSchedulerState";
import { useLayoutShift } from "./useLayoutShift";
import { useMouseCenteredZoom } from "./zoom/useMouseCenteredZoom";
import { UseZoomUpdateProps, useZoomUpdate } from "./zoom/useZoomUpdate";

export type UseTimeSchedulerProps = Pick<UseRangeUpdateProps, "onRangeUpdate"> &
    Pick<UseZoomUpdateProps, "OnZoomUpdate">;

export const useTimeScheduler = (props: UseTimeSchedulerProps) => {
    const { onRangeUpdate, OnZoomUpdate } = props;
    const containerRef = useRef<HTMLDivElement>(null);

    useMouseCenteredZoom({
        containerRef,
        initialZoomFactor: initialTimeSchedulerState.zoomFactor,
    });
    usePersistentZoomFactor(containerRef);
    usePersistentScrollPosition(containerRef);

    useRangeUpdate({ onRangeUpdate });

    useZoomUpdate({ OnZoomUpdate });

    useLayoutShift();

    return {
        containerRef,
    };
};
