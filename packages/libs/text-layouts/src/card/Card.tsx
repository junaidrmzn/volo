import type { BoxProps } from "@volocopter/design-library-react";
import { Box, VStack } from "@volocopter/design-library-react";

export const Card = (props: BoxProps) => {
    const { children, ...boxProps } = props;
    return (
        <Box borderRadius="sm" p="9" bg="monochrome.100" {...boxProps}>
            <VStack spacing="4" alignItems="stretch">
                {children}
            </VStack>
        </Box>
    );
};
