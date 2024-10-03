import { distance } from "@turf/turf";
import { Waypoint } from "@voloiq/flight-planning-api/v1";

export const DEFAULT_DISTANCE_RADIUS_RATIO = 0.75;
export const MIN_DISTANCE_RADIUS_RATIO = 0.5;

export const calculateDistanceMeter = (a?: Waypoint, b?: Waypoint) => {
    if (!a || !b) return 0;
    return Math.round(distance([a.lng, a.lat], [b.lng, b.lat]) * 1000);
};

export const reverseWaypoints = (first: Waypoint, second: Waypoint, inverse: boolean) => {
    if (inverse)
        return {
            startLat: second.lat,
            startLng: second.lng,
            endLat: first.lat,
            endLng: first.lng,
        };

    return {
        startLat: first.lat,
        startLng: first.lng,
        endLat: second.lat,
        endLng: second.lng,
    };
};
