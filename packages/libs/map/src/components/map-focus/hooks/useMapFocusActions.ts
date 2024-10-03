import type { LngLatLike } from "maplibre-gl";
import { useCallback, useContext } from "react";
import { MapFocusActionsContext } from "../contexts/actions";

/**
 * To be hooked onto a component which is going to trigger and define refocusings
 * on a map.
 */
export const useRefocusMap = () => {
    const { dispatchMapFocusController } = useContext(MapFocusActionsContext);
    const refocusMap = useCallback(
        (pointCollectionName: string, pointCollection?: LngLatLike[]) => {
            if (!pointCollection) return;
            dispatchMapFocusController({
                type: "updatePointCollectionAndTriggerRefocus",
                pointCollectionName,
                pointCollection,
            });
        },
        [dispatchMapFocusController]
    );

    const temporaryFocusMap = useCallback(
        (coordinates: LngLatLike[]) => {
            if (!coordinates) return;
            dispatchMapFocusController({
                type: "temporaryFocusCoordinates",
                coordinates,
            });
        },
        [dispatchMapFocusController]
    );

    return { refocusMap, temporaryFocusMap };
};
