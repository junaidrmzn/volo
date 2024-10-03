import { Map } from "maplibre-gl";
import { MutableRefObject, useEffect } from "react";
import { VoloiqMap } from "./types";

declare global {
    // eslint-disable-next-line prefer-type-alias/prefer-type-alias
    interface Window {
        getMap: () => Map | VoloiqMap | undefined;
    }
}

// This hook exposes the map object to the window so that we can use it for writing test automation for the map
// It MUST not be used for development purposes
export const useMapOnWindow = (mapRef: MutableRefObject<Map | VoloiqMap | undefined>) =>
    useEffect(() => {
        window.getMap = () => mapRef.current;
    }, [mapRef]);
