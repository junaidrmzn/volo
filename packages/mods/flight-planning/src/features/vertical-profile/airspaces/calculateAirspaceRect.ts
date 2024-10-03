import type { AirspaceIntersections } from "@voloiq-typescript-api/flight-planning-types/dist";
import { METERS_TO_FEET, METERS_TO_NAUTICAL_MILES } from "../../../utils";
import { UPPER_VISUAL_LIMIT } from "../constants";

export const calculateAirspaceRect = (airspaceIntersection: AirspaceIntersections, maxX: number) => {
    if (
        airspaceIntersection.lowerLimit === undefined ||
        airspaceIntersection.lowerLimit === null ||
        !airspaceIntersection.upperLimit
    ) {
        return [];
    }
    return [
        [
            airspaceIntersection.rightBorder ? airspaceIntersection.rightBorder * METERS_TO_NAUTICAL_MILES : maxX,
            airspaceIntersection.lowerLimit * METERS_TO_FEET,
        ], // Bottom Right
        [
            airspaceIntersection.rightBorder ? airspaceIntersection.rightBorder * METERS_TO_NAUTICAL_MILES : maxX,
            airspaceIntersection.upperLimit * METERS_TO_FEET > UPPER_VISUAL_LIMIT
                ? UPPER_VISUAL_LIMIT
                : airspaceIntersection.upperLimit * METERS_TO_FEET,
        ], // Top Right
        [
            airspaceIntersection.leftBorder ? airspaceIntersection.leftBorder * METERS_TO_NAUTICAL_MILES : 0,
            airspaceIntersection.upperLimit * METERS_TO_FEET > UPPER_VISUAL_LIMIT
                ? UPPER_VISUAL_LIMIT
                : airspaceIntersection.upperLimit * METERS_TO_FEET,
        ], // Top Left
        [
            airspaceIntersection.leftBorder ? airspaceIntersection.leftBorder * METERS_TO_NAUTICAL_MILES : 0,
            airspaceIntersection.lowerLimit * METERS_TO_FEET,
        ], // Bottom Left
        [
            airspaceIntersection.rightBorder ? airspaceIntersection.rightBorder * METERS_TO_NAUTICAL_MILES : maxX,
            airspaceIntersection.lowerLimit * METERS_TO_FEET,
        ], // Bottom Right
    ];
};
