import type { LngLatLike } from "maplibre-gl";
import type { Dispatch, SetStateAction } from "react";
import { useContext, useEffect } from "react";
import { MapFocusMapContext, useMapContext, useMapEvent } from "@voloiq/map";

export const useAircraftCentering = (
    coords: LngLatLike,
    isCentered: boolean,
    setIsCentered: Dispatch<SetStateAction<boolean>>
) => {
    const { map } = useMapContext();
    const { mapFocusControllerState, dispatchMapFocusController } = useContext(MapFocusMapContext);

    useMapEvent("mousedown", (isCentered?) => {
        setIsCentered(!isCentered);
    });
    useMapEvent("wheel", () => {
        setIsCentered(false);
    });
    useMapEvent("touchstart", () => {
        setIsCentered(false);
    });

    useEffect(() => {
        if (!map || !mapFocusControllerState.refocusTriggered || !isCentered) return;
        map.easeTo({ center: coords });
        dispatchMapFocusController({ type: "resetTriggerSignal" });
    }, [map, mapFocusControllerState.refocusTriggered, dispatchMapFocusController, coords, isCentered]);

    return { coords };
};
