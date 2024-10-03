import type { BoxProps } from "@volocopter/design-library-react";
import { Box } from "@volocopter/design-library-react";
import type { ReactElement, RefObject } from "react";
import { mergeRefs } from "@voloiq/utils";
import type { TimeGridProps } from "./TimeGrid";
import { TimeGrid } from "./TimeGrid";
import { useScroll } from "./scroll/context/useScroll";

export type TimeGridContainerProps = {
    timeSchedulerRows: ReactElement[];
    containerRef: RefObject<HTMLDivElement>;
} & Pick<TimeGridProps, "leftItemRef" | "rightItemRef"> &
    BoxProps;

export const TimeGridContainer = (props: TimeGridContainerProps) => {
    const { timeSchedulerRows, containerRef, leftItemRef, rightItemRef, ...boxProps } = props;

    const { timeGridContainerRef } = useScroll();

    return (
        <Box
            overflow="scroll"
            position="relative"
            ref={mergeRefs([containerRef, timeGridContainerRef])}
            css={{
                "&::-webkit-scrollbar": {
                    display: "none",
                },
                "-ms-overflow-style": "none",
                "scrollbar-width": "none",
            }}
            tabIndex={0}
            {...boxProps}
        >
            <TimeGrid timeSchedulerRows={timeSchedulerRows} leftItemRef={leftItemRef} rightItemRef={rightItemRef} />
        </Box>
    );
};
