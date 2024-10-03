import { Box, Icon, IconButton, useColorModeValue, useDisclosure } from "@volocopter/design-library-react";
import { NotamLayerWrapper } from "../../features/map-notam-layer";

export const RightPanel = () => {
    const backgroundColor = useColorModeValue("monochrome.100", "gray.700");
    const { isOpen, onToggle } = useDisclosure();
    const toggleWidth = isOpen ? "348px" : "0px";

    return (
        <Box>
            <Box
                w={toggleWidth}
                pos="absolute"
                top="96px"
                right={0}
                h="calc(100vh - 96px)"
                backdropFilter="blur(2px)"
                backgroundColor={backgroundColor}
                transition="transform 0.3s ease"
                overflow="hidden"
                gap={10}
                transform={`translateX(${isOpen ? "0" : "100%"})`}
            >
                <NotamLayerWrapper />
            </Box>
            <Box
                gap={10}
                right={toggleWidth}
                pos="absolute"
                top="47vh"
                backgroundColor={backgroundColor}
                backdropFilter="blur(2px)"
                transition="all 0.3s ease"
                borderRadius="sm"
            >
                <IconButton aria-label="rightPanelIcon" variant="ghost" onClick={onToggle}>
                    <Icon icon={isOpen ? "chevronsRight" : "chevronsLeft"} size={4} />
                </IconButton>
            </Box>
        </Box>
    );
};
