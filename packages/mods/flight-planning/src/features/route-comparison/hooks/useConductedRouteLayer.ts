import { FeatureCollection, Geometry, featureCollection } from "@turf/turf";
import { useEffect, useState } from "react";
import { calculateGreatCircleRoute, useDisplayRoute } from "@voloiq/flight-planning-utils";
import { useMapContext } from "@voloiq/map";

type RouteComparisonLayerOptions = {
    displayId: number | string;
    routeColor: string;
    avgDeviationInMeters?: number;
    lineOpacity?: number;
    bounds?: number[][];
};
export const useConductedRouteLayer = (options: RouteComparisonLayerOptions) => {
    const { displayId, routeColor, avgDeviationInMeters, lineOpacity, bounds } = options;

    const [greatCircleCoordinates, setGreatCircleCoordinates] = useState<FeatureCollection<Geometry>>(
        featureCollection([])
    );

    const { isReady } = useMapContext();
    useDisplayRoute({
        greatCircleCoordinates,
        layerId: displayId,
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
