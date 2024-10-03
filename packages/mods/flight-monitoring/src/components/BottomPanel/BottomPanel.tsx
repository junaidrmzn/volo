import { Box, useColorModeValue } from "@volocopter/design-library-react";

export const BottomPanel: FCC = (props) => {
    const { children } = props;
    const bgColor = useColorModeValue("white", "gray.900");

    return (
        <Box
            position="absolute"
            bgColor={bgColor}
            bottom={9}
            left={36}
            right={8}
            h={40}
            boxShadow="lg"
            borderRadius="lg"
            overflow="hidden"
        >
            {children}
        </Box>
    );
};
