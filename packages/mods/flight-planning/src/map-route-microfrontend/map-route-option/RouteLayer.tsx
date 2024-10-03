import type { Route } from "@voloiq/flight-planning-api/v1";
import { returnVoloiqMap, useMapContext } from "@voloiq/map";
import { useFocusWaypoints } from "../hooks/useFocusWaypoints";
import { useRouteLayer } from "../hooks/useRouteLayer";
import { useWaypointLayer } from "../hooks/useWaypointLayer";

type DisplayedRouteLayerProps = {
    route: Route;
};

export const RouteLayer = (props: DisplayedRouteLayerProps) => {
    const { route } = props;
    const { map, isReady } = useMapContext();
    const mapObject = returnVoloiqMap(map);

    const waypoints = route?.waypoints || [];

    useRouteLayer({ waypoints, isMapReady: isReady });
    useWaypointLayer({ map: mapObject, waypoints });
    useFocusWaypoints(waypoints);

    return null;
};
