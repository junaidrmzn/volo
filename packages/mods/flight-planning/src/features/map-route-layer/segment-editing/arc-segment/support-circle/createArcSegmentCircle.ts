import { bearing, destination, distance, midpoint } from "@turf/turf";

/**
 * Calculate the center of a circle that is defined by two points and a radius
 *
 * The algorithm works as follows:
 * -------------------------------------
 * There will be two circles with the same radius that can be +90° and -90° rotated around the line between the two points.
 * The two points and the circles with their radius and center points define a rhombus that is defined by a side length of the radius r.
 *
 * 1. Calculate the midpoint between the two points and the half distance (center of rhombus)
 * 2. The distance from both points to the center (radius) and the half distance between two points define a right triangle
 * 3. We use pythagoras to calculate the distance from the center of the rhombus to the center of the circle
 * 4. The new center point is the rhombus center + the output of step 3 rotated by +90° or -90°
 *
 */
export const createArcSegmentCircle = (
    startLat: number,
    startLng: number,
    endLat: number,
    endLng: number,
    radius: number,
    inverseCircle: boolean
) => {
    const startCoordinates = [startLng, startLat];
    const endCoordinates = [endLng, endLat];
    const radiusInKm = radius / 1000;

    const distanceStartEnd = distance(startCoordinates, endCoordinates) / 2;
    const midpointStartEnd = midpoint(startCoordinates, endCoordinates);

    const distanceMidpointCenter = Math.sqrt(Math.abs(radiusInKm ** 2 - distanceStartEnd ** 2));

    const angle = bearing(startCoordinates, endCoordinates) + (inverseCircle ? -90 : 90);
    const center = destination(midpointStartEnd, distanceMidpointCenter, angle);

    const centerLng = center.geometry.coordinates[0] || 0;
    const centerLat = center.geometry.coordinates[1] || 0;

    return { radius, centerLng, centerLat };
};
