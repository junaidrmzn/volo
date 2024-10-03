import { FeatureCollection, LineString, MultiLineString, Properties, featureCollection } from "@turf/turf";
import { Waypoint } from "@voloiq/flight-planning-api/v1";
import { calculateGreatCircleSegment, sortWaypointsByRouteSequenceIndex } from "@voloiq/flight-planning-utils";

export const waypointsToFeatureCollection = (
    waypoints: Waypoint[]
): FeatureCollection<LineString | MultiLineString, Properties> => {
    if (waypoints.length < 2) return featureCollection([]);

    waypoints.sort((a, b) => sortWaypointsByRouteSequenceIndex(a, b));

    const data = waypoints.flatMap((current, index) => {
        const next = waypoints[index + 1];
        if (!next) return [];
        return calculateGreatCircleSegment([current.lng, current.lat], [next.lng, next.lat], index + 1);
    });

    return featureCollection(data);
};
