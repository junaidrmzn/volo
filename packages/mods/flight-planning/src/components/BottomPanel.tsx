import { Box, useColorModeValue } from "@volocopter/design-library-react";
import { useFeatureFlags } from "@voloiq/feature-flags";

export const BottomPanel: FCC = (props) => {
    const { children } = props;
    const bgColor = useColorModeValue("white", "gray.900");
    const { isFeatureFlagEnabled } = useFeatureFlags();
    const uiRedesign = isFeatureFlagEnabled("ui-redesign");
    const left = uiRedesign ? "23rem" : "1.5rem";

    return (
        <Box
            position="absolute"
            bgColor={bgColor}
            bottom={6}
            left={left}
            right={6}
            h={40}
            boxShadow="lg"
            borderRadius="lg"
            overflow="hidden"
        >
            {children}
        </Box>
    );
};
