import { useLayoutEffect, useRef, useState } from "react";
import { match } from "ts-pattern";

export type OverflowDirections = "NONE" | "LEFT" | "RIGHT" | "LEFT AND RIGHT";

export const useOverflowDirections = () => {
    const ref = useRef<HTMLDivElement>(null);
    const [overflowDirections, setOverflowDirections] = useState<OverflowDirections>("NONE");

    useLayoutEffect(() => {
        const { current } = ref;

        if (!current) {
            return () => {};
        }

        const calculateAndSetOverflow = () => {
            const overflowDirection = match(current)
                .when(
                    (current) => current.scrollWidth === current.clientWidth,
                    () => "NONE" as const
                )
                .when(
                    (current) => current.scrollLeft === 0,
                    () => "RIGHT" as const
                )
                .when(
                    (current) => Math.round(current.scrollLeft) >= current.scrollWidth - current.clientWidth,
                    () => "LEFT" as const
                )
                .otherwise(() => "LEFT AND RIGHT" as const);

            setOverflowDirections(overflowDirection);
        };

        const resizeObserver = new ResizeObserver(calculateAndSetOverflow);

        resizeObserver.observe(current);
        current.addEventListener("scroll", calculateAndSetOverflow);

        calculateAndSetOverflow();

        return () => {
            resizeObserver.unobserve(current);
            current.removeEventListener("scroll", calculateAndSetOverflow);
        };
    }, [ref]);

    return { overflowDirections, ref };
};
