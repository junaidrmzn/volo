import type { BoxProps } from "@volocopter/design-library-react";
import { Box, Divider } from "@volocopter/design-library-react";

export const FilterWrapper = (props: BoxProps) => {
    const { children, ...boxProps } = props;
    return (
        <Box {...boxProps}>
            <Divider my={5} />
            {children}
        </Box>
    );
};
