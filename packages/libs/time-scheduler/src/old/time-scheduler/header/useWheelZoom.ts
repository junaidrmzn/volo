import type { Dispatch } from "react";
import { useEffect } from "react";
import { useScroll } from "../scroll/context/useScroll";
import type { TimeSchedulerAction } from "../time-scheduler-state/timeSchedulerReducer";
import { useTimeSchedulerState } from "../time-scheduler-state/useTimeSchedulerState";

export const getNewZoomFactor = (previousZoomFactor: number, deltaY: number, step = 1.4): number => {
    if (Number.isNaN(previousZoomFactor)) {
        return 1;
    }
    if (deltaY === 0 || Number.isNaN(deltaY) || step <= 0) {
        return previousZoomFactor;
    }

    const result = Number.parseFloat((previousZoomFactor * (deltaY > 0 ? step : 1 / step)).toPrecision(2));
    if (Number.isNaN(result)) {
        return previousZoomFactor;
    }
    return result;
};

const createWheelZoomEventHandler = (zoomFactor: number, dispatch: Dispatch<TimeSchedulerAction>) =>
    function wheelZoomEventHandler(this: HTMLDivElement, wheelEvent: WheelEvent) {
        if (this === null) return;
        wheelEvent.stopPropagation();
        wheelEvent.preventDefault();
        const { left: horizontalContainerOffsetFromDocument, width } = this.getBoundingClientRect();
        const { scrollLeft: leftOffset } = this;
        dispatch({
            type: "zoom",
            zoomFactor: getNewZoomFactor(zoomFactor, wheelEvent.deltaY, 1.4),
            leftOffset,
            mouseCursorOffset: horizontalContainerOffsetFromDocument + width / 2,
        });
    };

// A hook to enable zooming of the timeline by scrolling on the timeline header.
// For it to work correctly, we need to pass option passive: false to event handler -
// - otherwise, we can't prevent the default behavior of scrollin up and down.
// Since we need to pass options to event handler, we can't just use onWheel prop - use of addEventListener is required.
export const useWheelZoom = (): void => {
    const { headerRef } = useScroll();
    const { zoomFactor, dispatch } = useTimeSchedulerState();

    useEffect(() => {
        const handler = createWheelZoomEventHandler(zoomFactor, dispatch);
        const { current: header } = headerRef;

        if (header) {
            // passive: false allows use of event.preventDefault()
            header.addEventListener("wheel", handler, { passive: false });
        }
        return () => {
            if (header) {
                header.removeEventListener("wheel", handler);
            }
        };
    }, [headerRef, zoomFactor, dispatch]);
};
