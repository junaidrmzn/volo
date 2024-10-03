import { Box, BoxProps, useColorModeValue } from "@volocopter/design-library-react";
import type { ReactNode } from "react";
import { useItemRowHeight } from "../scheduler-row-height/useItemRowHeight";
import { useSchedulerRowLabelHeight } from "./useSchedulerRowLabelHeight";

export type SchedulerRowLabelProps = {
    label: ReactNode;
    schedulerRowIndex: number;
} & BoxProps;

export const SchedulerRowLabel = (props: SchedulerRowLabelProps) => {
    const { label, schedulerRowIndex, ...boxProps } = props;

    const labelBackground = useColorModeValue("gray.100", "gray.800");
    const { getGridItemHeightProps } = useItemRowHeight({ schedulerRowIndex });
    const { height, transition, minHeight } = getGridItemHeightProps();
    const { ref } = useSchedulerRowLabelHeight({ schedulerRowIndex, labelChildren: label });

    return (
        <Box
            ref={ref}
            display="flex"
            alignItems="flex-start"
            background={labelBackground}
            position="relative"
            height={height}
            minHeight={minHeight}
            transition={transition}
            width="100%"
            {...boxProps}
        >
            {label}
        </Box>
    );
};
