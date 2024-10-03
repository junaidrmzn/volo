import type { LngLatBounds, Map } from "maplibre-gl";
import type { MutableRefObject } from "react";
import { useContext, useEffect } from "react";
import { MapFocusMapContext } from "../contexts/map";

/**
 * To be hooked onto the map component
 */
/* eslint no-underscore-dangle: 0 */
export const useMapWithMapFocus = (map: MutableRefObject<Map | undefined>, bounds: LngLatBounds) => {
    const { mapFocusControllerState, dispatchMapFocusController } = useContext(MapFocusMapContext);
    const mapContainerRect = map.current?.getCanvasContainer().getBoundingClientRect();
    const paddingX = Math.min(300, (mapContainerRect?.width ?? 1200) / 4);
    const paddingY = Math.min((mapContainerRect?.height ?? 0) / 2, (paddingX * 9) / 16);

    useEffect(() => {
        if (!map.current || !mapFocusControllerState.refocusTriggered) return;
        map.current.fitBounds(
            [
                [bounds._ne.lng, bounds._ne.lat],
                [bounds._sw.lng, bounds._sw.lat],
            ],
            {
                padding: { bottom: paddingY, left: paddingX, right: paddingX, top: paddingY },
                animate: false,
                maxZoom: 13,
            }
        );
        dispatchMapFocusController({ type: "resetTriggerSignal" });
    }, [map, bounds, mapFocusControllerState.refocusTriggered, dispatchMapFocusController]);

    return { bounds };
};
