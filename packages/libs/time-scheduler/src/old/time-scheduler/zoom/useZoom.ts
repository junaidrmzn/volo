import type { RefObject } from "react";
import { useEffect, useRef } from "react";

export type UseZoomOptions = {
    sensitivity?: number;
    threshold?: number;
    minZoomFactor?: number;
    maxZoomFactor?: number;
    initialZoomFactor?: number;
};

export type OnZoom = (zoomFactor: number) => void;

export const useZoom = <T extends RefObject<HTMLElement>>(
    elementRef: T,
    onZoom: OnZoom,
    options: UseZoomOptions = {}
) => {
    const {
        threshold = 2,
        sensitivity = 100,
        minZoomFactor = Number.NEGATIVE_INFINITY,
        maxZoomFactor = Number.POSITIVE_INFINITY,
        initialZoomFactor = 1,
    } = options;
    const deltaYRef = useRef(Math.ceil(Math.log(initialZoomFactor) * 100) / 100);

    useEffect(() => {
        const updateScroll = (wheelEvent: WheelEvent) => {
            const { deltaY, altKey: isAltKeyPressed } = wheelEvent;

            if (!isAltKeyPressed) {
                return;
            }
            wheelEvent.preventDefault();
            wheelEvent.stopPropagation();
            if (Math.abs(deltaY) > threshold) {
                deltaYRef.current += Math.ceil(deltaY / sensitivity) / 100;
                const zoomFactor = Math.ceil(Math.E ** deltaYRef.current * 100) / 100;
                if (zoomFactor >= minZoomFactor && zoomFactor <= maxZoomFactor) {
                    onZoom(zoomFactor);
                }
            }
        };

        const element = elementRef.current;
        element?.addEventListener("wheel", updateScroll, { passive: false });
        return () => element?.removeEventListener("wheel", updateScroll);
    });
};
