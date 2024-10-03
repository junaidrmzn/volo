import { useEffect } from "react";
import { checkIfSourceExists, useMapContext } from "@voloiq/map";
import { useSegmentEditingContext } from "../../context";
import { useSupportCircle } from "./useSupportCircle";

type UseSupportCircleOptions = {
    centerLat: number;
    centerLng: number;
    radius: number;
    color: string;
};

export const useAddSupportCircle = (options: UseSupportCircleOptions) => {
    const { centerLat, centerLng, radius, color } = options;
    const { segmentEditMode } = useSegmentEditingContext();
    const { map } = useMapContext();

    const layerId = "support-circle";
    const isEditingArcSegment = segmentEditMode === "turn";

    const { addCircleToMap, removeCircleFromMap, updateCircleOnMap, removeMarkerFromMap, addMarkerToMap } =
        useSupportCircle({ layerId, centerLat, centerLng, radius, color });

    useEffect(() => {
        if (!isEditingArcSegment || !map) return () => {};

        addMarkerToMap();

        if (!checkIfSourceExists(map, layerId)) {
            addCircleToMap();
        } else {
            updateCircleOnMap();
        }

        return () => {
            removeMarkerFromMap();
            removeCircleFromMap();
        };
    }, [
        isEditingArcSegment,
        addCircleToMap,
        map,
        updateCircleOnMap,
        removeMarkerFromMap,
        addMarkerToMap,
        removeCircleFromMap,
    ]);
};
