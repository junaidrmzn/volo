import { useGetWaypoints } from "@voloiq/flight-planning-api/v1";
import { VoloiqMap, createWaypointsDataFromHashMap, useMapContext } from "@voloiq/map";
import { useSelectedRouteSequenceIndex } from "../../../selected-route-sequence-index";

export const useSelectedSegmentWaypoints = (routeId: number) => {
    const { map } = useMapContext();
    const { data: waypoints } = useGetWaypoints(routeId);
    const mapObject = map as VoloiqMap;
    const waypointsData = createWaypointsDataFromHashMap(mapObject, true);
    const routeWaypoints = !waypointsData || mapObject?.takeWaypointsFromRouteRequest ? waypoints : waypointsData;

    const { selectedRouteSequenceIndex } = useSelectedRouteSequenceIndex();

    if (selectedRouteSequenceIndex === undefined) return {};
    if (!routeWaypoints) return {};
    const startWaypoint = routeWaypoints.find((waypoint) => waypoint.routeSequenceIndex === selectedRouteSequenceIndex);
    const endWaypoint = routeWaypoints.find(
        (waypoint) => waypoint.routeSequenceIndex === selectedRouteSequenceIndex + 1
    );
    return {
        startWaypoint,
        endWaypoint,
    };
};
