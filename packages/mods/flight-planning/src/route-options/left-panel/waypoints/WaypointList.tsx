import { Box, List, useDisclosure } from "@volocopter/design-library-react";
import { Waypoint } from "@voloiq/flight-planning-api/v1";
import { LayoutSection } from "@voloiq/flight-planning-components";
import { useSelectedRoute } from "../../../features/selected-route";
import { WaypointListWrapper } from "./WaypointListWrapper";
import { useWaypointsTranslation } from "./translations";
import { getWaypointsCount } from "./utils/getWaypointsCount";

export type WaypointListProps = {
    waypoints?: Waypoint[];
};

export const WaypointList = (props: WaypointListProps) => {
    const { waypoints } = props;
    const waypointsCount = getWaypointsCount(waypoints);
    const { selectedRoute } = useSelectedRoute();
    const { t } = useWaypointsTranslation();
    const { isOpen } = useDisclosure({ defaultIsOpen: true });
    const toggleWidth = isOpen ? "348px" : "0px";

    return (
        <Box
            w={toggleWidth}
            pos="absolute"
            top="29vh"
            backgroundColor="bgNavigationLayer1"
            overflowX="hidden"
            overflowY="scroll"
            h="400px"
        >
            <LayoutSection firstLabel={`${t("waypoints")} (${waypointsCount})`} hasCollapseButton>
                <List>
                    {selectedRoute && waypoints && (
                        <WaypointListWrapper waypoints={waypoints} selectedRoute={selectedRoute} />
                    )}
                </List>
            </LayoutSection>
        </Box>
    );
};
