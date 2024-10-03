import type { AirspaceIntersections } from "@voloiq-typescript-api/flight-planning-types/dist";
import type { LineSeriesOption } from "echarts";
import { getEChartsSeriesFromAirspaceIntersections } from "./getEChartsSeriesFromAirspaceIntersections";

export const formatAirspaceIntersectionData = (
    routeAltitudeData: number[][], // contains waypoint altitude in ft
    airspaceIntersections?: AirspaceIntersections[]
): LineSeriesOption[] => {
    if (!Array.isArray(routeAltitudeData) || routeAltitudeData.length === 0) return [];
    if (!Array.isArray(airspaceIntersections) || airspaceIntersections.length === 0) return [];

    const arrivalVertiport = routeAltitudeData[routeAltitudeData.length - 1];
    const arrivalVertiportX = arrivalVertiport ? arrivalVertiport[0] : 1000;
    const ceilingTolerance = 150;

    const altitudeCeiling =
        Math.max(
            ...routeAltitudeData.map((waypointTimeAltitude) => (waypointTimeAltitude[1] ? waypointTimeAltitude[1] : 0))
        ) + ceilingTolerance; // Highest point of the route + tolerance

    return getEChartsSeriesFromAirspaceIntersections(airspaceIntersections, arrivalVertiportX, altitudeCeiling);
};
