import type { RefObject } from "react";
import { useStatelessMousePosition } from "@voloiq/utils";
import { useTimeSchedulerState } from "../time-scheduler-state/useTimeSchedulerState";
import type { OnZoom } from "./useZoom";
import { useZoom } from "./useZoom";

export type UseMouseCenteredZoomProps = {
    containerRef: RefObject<HTMLElement>;
    initialZoomFactor: number;
};
export const useMouseCenteredZoom = (props: UseMouseCenteredZoomProps) => {
    const { containerRef, initialZoomFactor } = props;
    const { dispatch } = useTimeSchedulerState();
    const { getMousePosition } = useStatelessMousePosition();

    const onZoom: OnZoom = (zoomFactor) => {
        const { current: element } = containerRef;
        if (element === null) return;

        const { left: horizontalContainerOffsetFromDocument } = element.getBoundingClientRect();
        const { scrollLeft: leftOffset } = element;
        const { x: horizontalMousePosition } = getMousePosition();
        const mouseCursorOffset = horizontalMousePosition - horizontalContainerOffsetFromDocument;

        dispatch({
            type: "zoom",
            zoomFactor,
            leftOffset,
            mouseCursorOffset,
        });
    };

    useZoom(containerRef, onZoom, { minZoomFactor: 1, initialZoomFactor });
};
