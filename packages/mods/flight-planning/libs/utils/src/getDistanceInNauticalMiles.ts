import { Waypoint } from "@voloiq/flight-planning-api/v1";
import { getDistanceFromLatLonInKm } from "./getDistanceFromLatLonInKm";

export const getDistanceInNauticalMiles = (currentWaypoint: Waypoint, previousWaypoint?: Waypoint): number => {
    if (!previousWaypoint) {
        return 0;
    }

    return (
        getDistanceFromLatLonInKm(
            currentWaypoint.lat,
            currentWaypoint.lng,
            previousWaypoint.lat,
            previousWaypoint.lng
        ) / 1.852
    );
};
