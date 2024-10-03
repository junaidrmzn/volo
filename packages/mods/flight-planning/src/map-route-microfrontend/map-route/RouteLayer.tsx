import { Waypoint } from "@voloiq/flight-planning-api/v1";
import { returnVoloiqMap, useMapContext } from "@voloiq/map";
import { useFocusWaypoints } from "../hooks/useFocusWaypoints";
import { useRouteLayer } from "../hooks/useRouteLayer";
import { useWaypointLayer } from "../hooks/useWaypointLayer";

type DisplayedRouteLayerProps = {
    waypoints: Waypoint[];
};
export const RouteLayer = (props: DisplayedRouteLayerProps) => {
    const { waypoints } = props;
    const { map, isReady } = useMapContext();
    const mapObject = returnVoloiqMap(map);

    useRouteLayer({ waypoints, isMapReady: isReady });
    useWaypointLayer({ map: mapObject, waypoints });
    useFocusWaypoints(waypoints);

    return null;
};
