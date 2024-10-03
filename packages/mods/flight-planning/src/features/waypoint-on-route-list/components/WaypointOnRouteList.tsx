import { Box } from "@volocopter/design-library-react";
import { Waypoint } from "@voloiq/flight-planning-api/v1";
import { VoloiqMapStoreType } from "@voloiq/map";
import { useWaypointOnRouteList } from "../hooks";
import { SortableList } from "./SortableList";

type WaypointOnRouteListProps = {
    routeId: number;
    waypoints: Waypoint[];
    onWaypointDragCallback?: () => void;
    voloiqMapStore?: VoloiqMapStoreType;
};

export const WaypointOnRouteList = (props: WaypointOnRouteListProps) => {
    const { routeId, waypoints, onWaypointDragCallback, voloiqMapStore } = props;

    const { handleDrop, handleDragOver, handleDragStart, onItemSelect } = useWaypointOnRouteList(
        routeId,
        waypoints,
        voloiqMapStore,
        onWaypointDragCallback
    );

    return (
        <Box data-testid="waypoint-on-route-list-box" flex="1 1 auto" overflowY="auto">
            <SortableList
                handleDrop={handleDrop}
                handleDragOver={handleDragOver}
                handleDragStart={handleDragStart}
                items={waypoints}
                onItemSelect={onItemSelect}
                isWaypointList
            />
        </Box>
    );
};
