import { FeatureCollection, LineString, MultiLineString, featureCollection } from "@turf/turf";
import { flatMap } from "lodash";
import { Waypoint } from "@voloiq/flight-planning-api/v1";
import { calculateGreatCircleSegment } from "./calculateGreatCircleSegment";
import { calculateLineArcSegment } from "./calculateLineArcSegment";
import { sortWaypointsByRouteSequenceIndex } from "./sortWaypointsByRouteSequenceIndex";

export const waypointsToFeatureCollection = (
    waypoints: Waypoint[]
): FeatureCollection<LineString | MultiLineString> => {
    if (waypoints.length < 2) return featureCollection([]);

    waypoints.sort((a, b) => sortWaypointsByRouteSequenceIndex(a, b));

    const features = flatMap(waypoints, (waypoint, index) => {
        const nextWaypoint = waypoints[index + 1];
        if (!nextWaypoint) return [];

        // arc segment
        if (waypoint.routeSegment && waypoint.routeSegment.type === "arc")
            return calculateLineArcSegment(waypoint, nextWaypoint, index + 1);

        // straight segment
        return calculateGreatCircleSegment(
            [waypoint.lng, waypoint.lat],
            [nextWaypoint.lng, nextWaypoint.lat],
            index + 1
        );
    });

    return featureCollection(features);
};
