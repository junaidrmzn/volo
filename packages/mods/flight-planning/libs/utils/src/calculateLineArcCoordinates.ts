import { Coord, bearing, lineArc } from "@turf/turf";

export const getPositiveBearing = (bearing: number) => {
    if (bearing < 0) return bearing + 360;
    return bearing;
};

/**
 * Calculates the angle sums of both bearings from center to start and end postition and returns them in the correct order
 * for use in turf.js lineArc function
 */
export const getMinorArcBearings = (center: Coord, startPosition: Coord, endPosition: Coord) => {
    const bearingCenterToStart = bearing(center, startPosition);
    const bearingCenterToEnd = bearing(center, endPosition);

    const arcBearing = getPositiveBearing(bearingCenterToEnd - bearingCenterToStart);

    const bearing1 = Math.abs(arcBearing) < 180 ? bearingCenterToStart : bearingCenterToEnd;
    const bearing2 = Math.abs(arcBearing) < 180 ? bearingCenterToEnd : bearingCenterToStart;

    return {
        bearing1,
        bearing2,
    };
};

export const calculateLineArcCoordinates = (
    center: Coord,
    startPosition: Coord,
    endPosition: Coord,
    radius: number,
    steps: number = 128
) => {
    const radiusInKm = radius / 1000;

    const { bearing1, bearing2 } = getMinorArcBearings(center, startPosition, endPosition);

    const feature = lineArc(center, radiusInKm, bearing1, bearing2, {
        steps,
    });

    return feature;
};
