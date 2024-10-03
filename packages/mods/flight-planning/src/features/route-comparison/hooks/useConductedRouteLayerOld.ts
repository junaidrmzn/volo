import * as turf from "@turf/turf";
import { useEffect, useState } from "react";
import { calculateGreatCircleRoute } from "@voloiq/flight-planning-utils";
import { useMapContext } from "@voloiq/map";
import { useDisplayRouteOld } from "../../overview/hooks";

type RouteComparisonLayerOptions = {
    displayId: number | string;
    routeColor: string;
    avgDeviationInMeters?: number;
    lineOpacity?: number;
    bounds?: number[][];
};
export const useConductedRouteLayerOld = (options: RouteComparisonLayerOptions) => {
    const { displayId, routeColor, avgDeviationInMeters, lineOpacity, bounds } = options;

    const [greatCircleCoordinates, setGreatCircleCoordinates] = useState<
        turf.helpers.FeatureCollection<turf.helpers.LineString | turf.helpers.MultiLineString, turf.helpers.Properties>
    >(turf.featureCollection([]));

    const { isReady } = useMapContext();

    useDisplayRouteOld({
        greatCircleCoordinates,
        displayId,
        routeColor,
        routeType: "displayed",
        isWaypointEditable: false,
        width: avgDeviationInMeters,
        opacity: lineOpacity,
    });

    useEffect(() => {
        if (!isReady || !Array.isArray(bounds) || bounds?.length === 0) return;
        setGreatCircleCoordinates(calculateGreatCircleRoute(bounds));
    }, [isReady, bounds]);
};
