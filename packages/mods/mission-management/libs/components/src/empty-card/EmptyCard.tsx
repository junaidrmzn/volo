import { Box, HStack } from "@volocopter/design-library-react";

export const EmptyCard = () => {
    return (
        <HStack
            width="100%"
            height="100%"
            bg="bgContentLayer"
            borderRadius="xs"
            borderColor="borderOnAccentPrimaryMuted"
            borderWidth="thin"
            minH={13.5}
        >
            <Box bg="semanticUnknownBasic" width="6px" borderLeftRadius="xs" height="100%" />
        </HStack>
    );
};
