import type { AirspaceIntersections } from "@voloiq-typescript-api/flight-planning-types/dist";

const lineColorMap: { [key: string]: string } = {
    A: "red",
    ALRT: "red",
    D: "transparent",
    DGR: "transparent",
    R: "transparent",
    RESTR: "transparent",
    P: "transparent",
};
const fallBackLineColor = "blue";
const getLineColorForAirspaceType = (airspaceType?: string): string =>
    typeof airspaceType !== "undefined" ? lineColorMap[airspaceType] || fallBackLineColor : fallBackLineColor;

const getFillColorForAirspaceType = (airspaceType?: string): string => {
    const redAirspaceTypes = new Set(["D", "DGR", "R", "RESTR", "P", "PRHB"]);
    return redAirspaceTypes.has(airspaceType ?? "") ? "red" : "transparent";
};

export const getStylesForAirspaceTypeAndClassification = (airspaceIntersection: AirspaceIntersections) => {
    type LineStyleType = "dashed" | "solid" | "dotted" | undefined;
    const lineStyleType: LineStyleType = airspaceIntersection.type === "CTR" ? "dashed" : "solid";
    const lineStyle = {
        width: 2,
        opacity: 0.4,
        color: getLineColorForAirspaceType(airspaceIntersection.type),
        type: lineStyleType,
    };

    type AreaStyleOrigin = "end" | "start" | "auto" | undefined;
    const areaStyleOrigin: AreaStyleOrigin = "end";
    const areaStyle = {
        origin: areaStyleOrigin,
        color: getFillColorForAirspaceType(airspaceIntersection.type),
        opacity: 0.2,
    };
    return { lineStyle, areaStyle };
};
