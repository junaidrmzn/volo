import { Box, List } from "@volocopter/design-library-react";
import { LayoutSection } from "@voloiq/flight-planning-components";
import { WaypointListWrapper } from "./WaypointListWrapper";
import { useWaypointsTranslation } from "./translations";
import { getWaypointsCount } from "./utils/getWaypointsCount";

export type WaypointListProps = {
    waypoints?: Waypoint[];
};

export const WaypointList = (props: WaypointListProps) => {
    const { waypoints } = props;
    const waypointsCount = getWaypointsCount(waypoints);
    const { t } = useWaypointsTranslation();

    return (
        <Box maxWidth="100%" pos="absolute" top="47vh" backgroundColor="bgNavigationLayer1">
            <LayoutSection firstLabel={`${t("waypoints")} (${waypointsCount})`} hasCollapseButton>
                <List>{waypoints && <WaypointListWrapper waypoints={waypoints} />}</List>
            </LayoutSection>
        </Box>
    );
};
