import type { RefObject } from "react";
import { useLayoutEffect, useRef, useState } from "react";

type MinimumWidth = number;
export type Query<T extends {}> = Record<MinimumWidth, T> & { 0: T };
export type UseContainerQueryResult<T extends {}> = [RefObject<HTMLDivElement>, T];

// There is a CSS only solution for this, however, at the time of writing this (Sep 2022) it's only available
// in the latest Chrome version and no other browser. That's why we opted for the JS solution for now
export const useContainerQuery = <T extends {}>(query: Query<T>): UseContainerQueryResult<T> => {
    const ref = useRef<HTMLDivElement>(null);
    const [activeBreakpoint, setActiveBreakpoint] = useState<number>();

    useLayoutEffect(() => {
        const { current: element } = ref;
        if (!element) {
            return () => {};
        }
        const resizeObserver = new ResizeObserver((entries) => {
            const [entry] = entries;
            const elementWidth = entry?.borderBoxSize[0]?.inlineSize ?? 0;
            const breakpoints = Object.keys(query).map((breakpoint) => Number.parseInt(breakpoint, 10));
            const activeBreakpoint = Math.max(...breakpoints.filter((breakpoint) => breakpoint <= elementWidth));
            setActiveBreakpoint(activeBreakpoint);
        });

        resizeObserver.observe(element);
        return () => resizeObserver.unobserve(element);
    }, [query]);

    const activeBreakpointValue = activeBreakpoint !== undefined ? query[activeBreakpoint]! : query[0];

    return [ref, activeBreakpointValue];
};
