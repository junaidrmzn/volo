import { Box, useDisclosure } from "@volocopter/design-library-react";
import { useSelectedRoute } from "../../features/selected-route";
import { RouteOptionDetailWrapper } from "./RouteOptionDetailWrapper";
import { RouteOptionsListing } from "./RouteOptionsListing";
import { Validity } from "./route-option-meta/Validity";
import { WaypointList } from "./waypoints/WaypointList";

export const LeftPanel = () => {
    const { isOpen, onOpen, onClose } = useDisclosure();
    const { selectedRoute } = useSelectedRoute();

    return isOpen ? (
        <Box display="flex" flexDirection="row">
            <RouteOptionDetailWrapper onClose={onClose} isOpen={isOpen} />
            <WaypointList waypoints={selectedRoute?.waypoints} />
            <Validity />
        </Box>
    ) : (
        <RouteOptionsListing openRouteDetails={onOpen} />
    );
};
