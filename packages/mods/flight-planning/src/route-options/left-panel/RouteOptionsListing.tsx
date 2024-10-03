import { Box, Icon, IconButton, VStack, useColorModeValue, useDisclosure } from "@volocopter/design-library-react";
import { RouteOption, useGetQueryState } from "@voloiq/flight-planning-api/v1";
import { useDisplayedRoutes } from "../../features/displayed-routes";
import { RouteOptionMeta } from "./route-option-meta";
import { RoutesNew } from "./route-option-meta/RoutesNew";

type RouteOptionsListingProps = {
    openRouteDetails: (value: boolean) => void;
};

export const RouteOptionsListing = (props: RouteOptionsListingProps) => {
    const { openRouteDetails } = props;
    const { routeOptionId, routes } = useDisplayedRoutes();
    const { data: routeOption } = useGetQueryState<RouteOption>(["route-options", { routeOptionId }]);
    const backgroundColor = useColorModeValue("monochrome.100", "gray.700");
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
                overflow="hidden"
                gap={10}
            >
                <RouteOptionMeta aircraftType={routeOption?.aircraftType} />
                <RoutesNew routeOptionName={routeOption?.name} routes={routes} openRouteDetails={openRouteDetails} />
            </VStack>
            <Box
                gap={10}
                left={toggleWidth}
                pos="absolute"
                top="47vh"
                backgroundColor={backgroundColor}
                backdropFilter="blur(2px)"
                transition="all 0.3s ease"
                borderRadius="sm"
            >
                <IconButton aria-label="leftPanelIcon" variant="ghost" onClick={onToggle}>
                    <Icon icon={isOpen ? "chevronsLeft" : "chevronsRight"} size={4} />
                </IconButton>
            </Box>
        </Box>
    );
};
