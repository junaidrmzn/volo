import type { BoxProps } from "@volocopter/design-library-react";
import { Box } from "@volocopter/design-library-react";
import type { ReactElement, RefObject } from "react";
import { mergeRefs } from "@voloiq/utils";
import { TimeGrid } from "./TimeGrid";
import { useScroll } from "./scroll/context/useScroll";

export type TimeGridContainerProps = {
    timeSchedulerRows: ReactElement[];
    containerRef: RefObject<HTMLDivElement>;
} & BoxProps;

export const TimeGridContainer = (props: TimeGridContainerProps) => {
    const { timeSchedulerRows, containerRef, ...boxProps } = props;

    const { timeGridContainerRef } = useScroll();

    return (
        <Box
            overflow="scroll"
            position="relative"
            data-testid="time-grid-container"
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
            <TimeGrid timeSchedulerRows={timeSchedulerRows} />
        </Box>
    );
};
