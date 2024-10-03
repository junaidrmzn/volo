import type { AirspaceIntersections } from "@voloiq-typescript-api/flight-planning-types/dist";
import type { LineSeriesOption } from "echarts";
import { calculateAirspaceRect } from "./calculateAirspaceRect";
import { getStylesForAirspaceTypeAndClassification } from "./getStyles";

export const getEChartsSeriesFromAirspaceIntersections = (
    airspaceIntersections: AirspaceIntersections[],
    maxX: number = Number.POSITIVE_INFINITY,
    maxY: number = Number.POSITIVE_INFINITY
): echarts.LineSeriesOption[] => {
    const airspaceSeries: LineSeriesOption[] = [];
    for (const airspaceIntersection of airspaceIntersections) {
        if ((airspaceIntersection.lowerLimit ?? 0) > maxY) {
            continue;
        }
        const { lineStyle, areaStyle } = getStylesForAirspaceTypeAndClassification(airspaceIntersection);
        airspaceSeries.push({
            id: `airspace-${airspaceIntersection.externalId}`,
            name: `${airspaceIntersection.name}`,
            type: "line",
            symbol: "none",
            lineStyle,
            areaStyle,
            smooth: true,
            data: calculateAirspaceRect(airspaceIntersection, maxX),
            z: 2,
        });
    }
    return airspaceSeries;
};
