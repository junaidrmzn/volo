import { Waypoint } from "@voloiq/flight-planning-api/v1";
import { calculateLineArcCoordinates } from "./calculateLineArcCoordinates";

export const calculateLineArcSegment = (startWaypoint: Waypoint, endWaypoint: Waypoint, routeSequenceIndex: number) => {
    if (!startWaypoint.routeSegment) return [];

    // line arc segment
    const { radius, latitude, longitude } = startWaypoint.routeSegment;

    const segment = calculateLineArcCoordinates(
        [longitude, latitude],
        [startWaypoint.lng, startWaypoint.lat],
        [endWaypoint.lng, endWaypoint.lat],
        radius
    );

    segment.properties = {
        routeSequenceIndex,
    };

    return segment;
};
