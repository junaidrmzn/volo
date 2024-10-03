import type { RefObject } from "react";
import useInView from "react-cool-inview";
import { useTimeSchedulerState } from "../time-scheduler-state/useTimeSchedulerState";

export type UseObservedDateUnitsProps = {
    containerRef: RefObject<HTMLElement>;
};

export type ItemRef = ReturnType<typeof useObservedDateUnits>["leftItemRef"];

export const useObservedDateUnits = (props: UseObservedDateUnitsProps) => {
    const { containerRef } = props;
    const { dispatch } = useTimeSchedulerState();

    const onScrollToOuterElement = (direction: "left" | "right") => {
        const { current: element } = containerRef;
        if (element === null) return;

        const { scrollLeft: leftOffset } = element;
        dispatch({ type: "scroll", direction, leftOffset });
    };

    const { observe: leftItemRef } = useInView({
        onEnter: () => onScrollToOuterElement("left"),
    });

    const { observe: rightItemRef } = useInView({
        onEnter: () => onScrollToOuterElement("right"),
    });

    return {
        leftItemRef,
        rightItemRef,
    };
};
