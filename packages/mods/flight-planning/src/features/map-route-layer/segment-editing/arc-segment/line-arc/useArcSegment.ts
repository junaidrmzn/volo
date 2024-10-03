import * as turf from "@turf/turf";
import { useCallback } from "react";
import { calculateLineArcCoordinates } from "@voloiq/flight-planning-utils";
import { addGeoJsonLine, removeMapLayer, updateGeoJsonMapLayer, useMapContext } from "@voloiq/map";
import { lineArcLayout, lineArcPaint } from "./layout";

type UseDisplayRouteArcSegmentOptions = {
    startLat: number;
    startLng: number;
    endLat: number;
    endLng: number;
    centerLat: number;
    centerLng: number;
    radius: number;
    color: string;
    layerId: string;
};

export const useArcSegment = (options: UseDisplayRouteArcSegmentOptions) => {
    const { startLat, startLng, endLat, endLng, centerLat, centerLng, color, radius, layerId } = options;
    const { map } = useMapContext();

    const data = calculateLineArcCoordinates([centerLng, centerLat], [startLng, startLat], [endLng, endLat], radius);
    const lineArcFeatureCollection = turf.featureCollection([data]);

    const addArcSegmentToMap = useCallback(() => {
        if (!map) return;
        addGeoJsonLine(map, layerId, lineArcFeatureCollection, lineArcLayout(), lineArcPaint(color));
    }, [color, lineArcFeatureCollection, map, layerId]);

    const updateArcSegmentOnMap = useCallback(() => {
        if (!map) return;
        updateGeoJsonMapLayer(map, layerId, lineArcFeatureCollection);
    }, [lineArcFeatureCollection, layerId, map]);

    const removeArcSegmentFromMap = useCallback(() => {
        if (!map) return;
        removeMapLayer(map, layerId);
    }, [layerId, map]);

    return {
        addArcSegmentToMap,
        updateArcSegmentOnMap,
        removeArcSegmentFromMap,
    };
};
