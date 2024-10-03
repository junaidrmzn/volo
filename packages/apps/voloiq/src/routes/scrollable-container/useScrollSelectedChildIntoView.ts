import { RefObject, useEffect } from "react";

export type UseScrollSelectedChildIntoViewOptions = {
    scrollContainerRef: RefObject<HTMLDivElement>;
};

export const useScrollSelectedChildIntoView = (options: UseScrollSelectedChildIntoViewOptions) => {
    const { scrollContainerRef } = options;

    useEffect(() => {
        const element = scrollContainerRef.current;
        const childrenArray = [...(element?.children ?? [])];
        const activeChild = childrenArray.find((child) => child.getAttribute("aria-selected") === "true");
        if (!element || !activeChild) {
            return;
        }

        const elementRect = element.getBoundingClientRect();
        const activeChildRect = activeChild.getBoundingClientRect();
        const isChildOutsideVisibleViewport = activeChildRect.right >= elementRect.right;
        const scrollDistance = activeChildRect.left - elementRect.left;

        if (isChildOutsideVisibleViewport) {
            element.scroll({ left: scrollDistance });
        }
    }, [scrollContainerRef]);
};
