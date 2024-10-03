import { useEffect, useRef, useState } from "react";

export const useScrollProvider = () => {
    const headerRef = useRef<HTMLDivElement>(null);
    const iconRef = useRef<HTMLDivElement>(null);
    const timeGridContainerRef = useRef<HTMLDivElement>(null);
    const [timeGridOffset, setTimeGridOffset] = useState(0);
    const scrollTo = (xPosition: number) => {
        timeGridContainerRef.current!.scrollLeft = xPosition;
        headerRef.current!.scrollLeft = xPosition;
    };

    useEffect(() => {
        const { current: header } = headerRef;
        const { current: icon } = iconRef;
        const { current: timeGridContainer } = timeGridContainerRef;

        if (!header || !timeGridContainer || !icon) {
            return () => null;
        }

        const scrollHorizontal = (event: WheelEvent) => {
            if (timeGridContainer === null) return;
            event.preventDefault();
            event.stopPropagation();
            const { scrollLeft } = timeGridContainer;
            const left = scrollLeft + 100 * (event.deltaY < 0 ? -1 : 1);
            scrollTo(left);
        };

        setTimeGridOffset(
            icon.getBoundingClientRect().width * 2 +
                header.getBoundingClientRect().left -
                timeGridContainer.getBoundingClientRect().left
        );

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

    return { headerRef, timeGridContainerRef, timeGridOffset, scrollTo, iconRef };
};
