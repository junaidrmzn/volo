import { circle } from "@turf/turf";
import { useCallback } from "react";
import { addGeoJsonLine, removeMapLayer, updateGeoJsonMapLayer, useMapContext } from "@voloiq/map";
import { circleLayout, circlePaint } from "./layout";
import { useCenterPointMarker } from "./useCenterPointMarker";

type UseSupportCircleOptions = {
    layerId: string;
    centerLat: number;
    centerLng: number;
    radius: number;
    color: string;
};

export const useSupportCircle = (options: UseSupportCircleOptions) => {
    const { centerLat, centerLng, color, layerId, radius } = options;
    const { map } = useMapContext();
    const { addMarkerToMap, removeMarkerFromMap } = useCenterPointMarker(centerLat, centerLng, color);
    const radiusInKm = radius / 1000;

    const data = circle([centerLng, centerLat], radiusInKm, { steps: 100 });

    const addCircleToMap = useCallback(() => {
        if (!map) return;
        addGeoJsonLine(map, layerId, data, circleLayout(), circlePaint(color));
    }, [color, data, map, layerId]);

    const updateCircleOnMap = useCallback(() => {
        if (!map) return;
        updateGeoJsonMapLayer(map, layerId, data);
    }, [data, layerId, map]);

    const removeCircleFromMap = useCallback(() => {
        if (!map) return;
        removeMapLayer(map, layerId);
    }, [layerId, map]);

    return {
        addCircleToMap,
        updateCircleOnMap,
        removeCircleFromMap,
        addMarkerToMap,
        removeMarkerFromMap,
    };
};
