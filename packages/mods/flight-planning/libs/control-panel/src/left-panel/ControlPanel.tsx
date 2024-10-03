import { Box, Icon, IconButton, VStack, useColorModeValue, useDisclosure } from "@volocopter/design-library-react";
import { RouteOptionMeta } from "./route-option-meta";
import { Routes } from "./routes";
import { WaypointList } from "./waypoints/WaypointList";

export type ControlPanelProps = {
    routeOption: RouteOption;
    routes: Route[];
    waypoints: Waypoint[];
};

export const ControlPanel = (props: ControlPanelProps) => {
    const { routeOption, routes, waypoints } = props;
    const backgroundColor = useColorModeValue("rgba(255, 255, 255, 0.8)", "rgba(51, 57, 71, 0.8)");

    const { isOpen, onToggle } = useDisclosure({ defaultIsOpen: true });
    const toggleWidth = isOpen ? "348px" : "0px";

    return (
        <Box>
            <VStack
                w={toggleWidth}
                pos="absolute"
                top="96px"
                h="calc(100vh - 96px)"
                backdropFilter="blur(2px)"
                transition="all 0.3s ease"
                gap={10}
                overflowY="auto"
            >
                <RouteOptionMeta aircraftType={routeOption.aircraftType} />
                <Routes routeOptionName={routeOption.name} routes={routes} />
                <WaypointList waypoints={waypoints} />
            </VStack>
            <Box
                gap={10}
                left={toggleWidth}
                pos="absolute"
                top="47vh"
                backgroundColor={backgroundColor}
                backdropFilter="blur(2px)"
                transition="all 0.3s ease"
                borderRadius="0px var(--borderRadius-xsmall, 4px) var(--borderRadius-xsmall, 4px) 0px"
            >
                <IconButton aria-label="leftPanelIcon" variant="ghost" onClick={onToggle}>
                    <Icon icon={isOpen ? "chevronsLeft" : "chevronsRight"} size={4} />
                </IconButton>
            </Box>
        </Box>
    );
};
