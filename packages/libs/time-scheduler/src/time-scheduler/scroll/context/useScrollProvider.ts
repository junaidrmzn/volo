import { useEffect, useRef, useState } from "react";
import { useTimeSchedulerState } from "../../time-scheduler-state/useTimeSchedulerState";

export const useScrollProvider = () => {
    const headerRef = useRef<HTMLDivElement>(null);
    const timeGridContainerRef = useRef<HTMLDivElement>(null);
    const [timeGridOffset, setTimeGridOffset] = useState(0);

    const scrollTo = (xPosition: number) => {
        timeGridContainerRef.current!.scrollLeft = xPosition;
        headerRef.current!.scrollLeft = xPosition;
    };
    const { dispatch } = useTimeSchedulerState();

    useEffect(() => {
        const { current: header } = headerRef;
        const { current: timeGridContainer } = timeGridContainerRef;

        if (!header || !timeGridContainer) {
            return () => null;
        }

        const scrollHorizontal = (event: WheelEvent) => {
            const isVerticalScroll = Math.abs(event.deltaY) > Math.abs(event.deltaX);
            if (timeGridContainer === null || isVerticalScroll) return;

            event.preventDefault();
            event.stopPropagation();

            const { scrollLeft, clientWidth, scrollWidth } = timeGridContainer;
            const left = scrollLeft + event.deltaX;

            scrollTo(left);
            if (left < 500) {
                dispatch({ type: "scroll", direction: "left", leftOffset: left });
            } else if (left + clientWidth > scrollWidth - 500) {
                dispatch({ type: "scroll", direction: "right", leftOffset: left });
            } else {
                dispatch({ type: "scroll", direction: "left", leftOffset: left, updateOffsetOnly: true });
            }
        };

        setTimeGridOffset(header.getBoundingClientRect().left - timeGridContainer.getBoundingClientRect().left);

        const headerScrollListener = () => {
            timeGridContainer.scrollLeft = header.scrollLeft;
        };
        const timeGridScrollListener = () => {
            header.scrollLeft = timeGridContainer.scrollLeft;
        };

        header.addEventListener("scroll", headerScrollListener);
        timeGridContainer.addEventListener("scroll", timeGridScrollListener);
        timeGridContainer.addEventListener("wheel", scrollHorizontal, { passive: false });

        return () => {
            header.removeEventListener("scroll", headerScrollListener);
            timeGridContainer.removeEventListener("scroll", timeGridScrollListener);
            timeGridContainer.removeEventListener("wheel", scrollHorizontal);
        };
    }, []);

    return { headerRef, timeGridContainerRef, timeGridOffset, scrollTo };
};
