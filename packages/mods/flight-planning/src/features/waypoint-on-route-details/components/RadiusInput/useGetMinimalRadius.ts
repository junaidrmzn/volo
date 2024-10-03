import { Waypoint } from "@voloiq/flight-planning-api/v1";
import {
    DEFAULT_DISTANCE_RADIUS_RATIO,
    MIN_DISTANCE_RADIUS_RATIO,
    calculateDistanceMeter,
    useSelectedSegmentWaypoints,
} from "../../../map-route-layer/segment-editing";

export const getInitialAndMinimalRadiusForArcBetweenWaypoints = (waypointA: Waypoint, waypointB: Waypoint) => {
    const segmentLength = calculateDistanceMeter(waypointA, waypointB);
    const initialRadius = waypointA.routeSegment?.radius ?? segmentLength * DEFAULT_DISTANCE_RADIUS_RATIO;
    return {
        initialRadius,
        minimalRadius: segmentLength * MIN_DISTANCE_RADIUS_RATIO,
    };
};

export const useGetInitialAndMinimalRadius = (routeId: number) => {
    const { startWaypoint, endWaypoint } = useSelectedSegmentWaypoints(routeId);

    if (!startWaypoint || !endWaypoint) {
        return {
            initialRadius: 0,
            minimalRadius: 0,
        };
    }

    return getInitialAndMinimalRadiusForArcBetweenWaypoints(startWaypoint, endWaypoint);
};
