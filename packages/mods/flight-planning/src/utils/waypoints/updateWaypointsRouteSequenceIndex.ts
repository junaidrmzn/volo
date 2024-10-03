import * as turf from "@turf/turf";
import { Waypoint } from "@voloiq/flight-planning-api/v1";
import { waypointsToFeatureCollection } from "@voloiq/flight-planning-utils";
import { VoloiqMap, updateWaypointsHashMap } from "@voloiq/map";
import { flattenGeometry } from "../route";

const findSegmentIndex = (array: number[], value: number): number => {
    let left = 0;
    let right = array.length - 1;
    let mid;

    while (left <= right) {
        mid = Math.floor((left + right) / 2);
        const middleValue = array[mid] ?? 0;
        if (middleValue === value) return mid;
        if (middleValue < value) left = mid + 1;
        else {
            right = mid - 1;
        }
    }
    const rightValue = array[right];
    const leftValue = array[left];
    if (right < 0) return 0;
    if (left >= array.length) return array.length - 1;
    return rightValue && leftValue && value > rightValue && value < leftValue ? left : right;
};

const createRouteSegmentsLineSliceLengthArray = (
    waypoints: Waypoint[],
    lineString: turf.helpers.Feature<turf.helpers.LineString, turf.helpers.Properties>
) => {
    if (waypoints && waypoints[0]?.lng && waypoints[0]?.lat) {
        const startWaypoint = [waypoints[0].lng, waypoints[0].lat];
        const copiedWaypoints = [...waypoints];
        copiedWaypoints.shift();
        return copiedWaypoints.map((wp) =>
            turf.length(turf.lineSlice(startWaypoint, [wp.lng, wp.lat], lineString), { units: "meters" })
        );
    }
    return [];
};

const findClosesWaypointRsi = (newWaypoint: Waypoint, waypoints: Waypoint[]) => {
    const featureCollection = waypointsToFeatureCollection(waypoints);
    const flattenLineString = flattenGeometry(featureCollection);
    if (waypoints[0] && waypoints[0].lng && waypoints[0].lat && newWaypoint.lng && newWaypoint.lat && flattenGeometry) {
        const startLineCoordinates = [waypoints[0].lng, waypoints[0].lat];
        const newWaypointCoordinates = [newWaypoint.lng, newWaypoint.lat];
        const newWaypointLineSliceLength = turf.length(
            turf.lineSlice(startLineCoordinates, newWaypointCoordinates, flattenLineString),
            { units: "meters" }
        );
        const segmentsLengthArray = createRouteSegmentsLineSliceLengthArray(waypoints, flattenLineString);
        const closestRsi = findSegmentIndex(segmentsLengthArray, newWaypointLineSliceLength);
        return closestRsi ?? 0;
    }
    return 0;
};

export const getNewWaypointRouteSequenceIndex = (
    waypoints: Waypoint[],
    newWaypoint: Waypoint,
    map: VoloiqMap
): number => {
    const closestRsi = findClosesWaypointRsi(newWaypoint, waypoints);
    const closestWaypointIndex = closestRsi + 1;
    newWaypoint.routeSequenceIndex = closestWaypointIndex;
    for (const [index, wp] of waypoints.entries()) {
        if (index >= closestWaypointIndex) wp.routeSequenceIndex += 1;
    }

    waypoints.splice(closestWaypointIndex, 0, newWaypoint);
    updateWaypointsHashMap(waypoints, map);
    return newWaypoint.routeSequenceIndex;
};

export const updateWaypointsAfterDelete = (waypoints: Waypoint[], deletedWaypointRSI: number, map: VoloiqMap): void => {
    waypoints.splice(deletedWaypointRSI, 1);
    const updatedWaypoints: Waypoint[] = waypoints.map((wp) => {
        if (wp.routeSequenceIndex > deletedWaypointRSI) wp.routeSequenceIndex -= 1;
        return wp;
    });
    updateWaypointsHashMap(updatedWaypoints, map);
};
