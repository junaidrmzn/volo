import { useEffect } from "react";
import { checkIfSourceExists, useMapContext } from "@voloiq/map";
import { useSegmentEditingContext } from "../../context";
import { useArcSegment } from "./useArcSegment";

type UseArcSegmentOptions = {
    startLat: number;
    startLng: number;
    endLat: number;
    endLng: number;
    centerLat: number;
    centerLng: number;
    radius: number;
    color: string;
};

export const useAddArcSegment = (options: UseArcSegmentOptions) => {
    const { centerLat, centerLng, color, radius, startLat, startLng, endLat, endLng } = options;
    const { segmentEditMode } = useSegmentEditingContext();
    const { map } = useMapContext();
    const layerId = "arc-segment";
    const isEditingArcSegment = segmentEditMode === "turn";

    const { addArcSegmentToMap, removeArcSegmentFromMap, updateArcSegmentOnMap } = useArcSegment({
        startLat,
        startLng,
        endLat,
        endLng,
        centerLat,
        centerLng,
        color,
        radius,
        layerId,
    });
    useEffect(() => {
        if (!isEditingArcSegment || !map) return () => {};

        if (!checkIfSourceExists(map, layerId)) {
            addArcSegmentToMap();
        } else {
            updateArcSegmentOnMap();
        }
        return () => {
            removeArcSegmentFromMap();
        };
    }, [isEditingArcSegment, addArcSegmentToMap, removeArcSegmentFromMap, map, updateArcSegmentOnMap]);
};
