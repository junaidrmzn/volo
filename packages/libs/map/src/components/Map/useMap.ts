import type { LngLatBounds } from "maplibre-gl";
import { Map } from "maplibre-gl";
import { useEffect, useRef, useState } from "react";
import * as utils from "../../utils";
import { useMapWithMapFocus } from "../map-focus";
import { MAPBOX_SATELLITE_STYLE, MAPSTYLE, TESTING_MAP_STYLE } from "./MapStyle";
import { addLayerToMap, updateLayer, updateSourceData } from "./mapLayer";
import type { VoloiqMap } from "./types";
import { useMapOnWindow } from "./useMapOnWindow";

/**
 * Hook to provide Map component with map instance and map container ref
 * @param latitude default lattitude at center
 * @param longitude default longitude at center
 * @param zoom default zoom
 * @param satellite flag on wether to use satellite style or not
 * @param focusOn lng/lat parameters to determine where to move the map focus
 * @returns
 */

const initializeMap = (map: VoloiqMap) => {
    map.addLayerToMap = addLayerToMap;
    map.removeMapLayer = utils.removeMapLayer;
    map.addGeoJsonLayer = utils.addGeoJsonLayer;
    map.updateLayer = updateLayer;
    map.createLayerFromGeoJson = utils.createLayerFromGeoJson;
    map.updateSourceData = updateSourceData;
    map.waypointEditSession = {};
    map.mapVersion = "1.0,0";
    map.takeWaypointsFromRouteRequest = true;
    map.waypointsHashMapBackUp = {};
    map.updateCycle = 1;
    map.numberOfAllowedUpdateCycles = 10;
    map.updateRouteLayer = true;
};

export const useMap = (
    zoom: number,
    satellite: boolean,
    focusOn: LngLatBounds,
    testMode?: boolean,
    preserveDrawingBuffer?: boolean
) => {
    const mapContainer = useRef<HTMLDivElement>(null);
    const map = useRef<maplibregl.Map | VoloiqMap | undefined>(undefined);
    const [isReady, setIsReady] = useState(false);
    useMapOnWindow(map);
    useMapWithMapFocus(map, focusOn);
    useEffect(() => {
        if (!mapContainer.current) return;
        if (map.current) return;
        map.current = new Map({
            container: mapContainer.current,
            style: testMode ? TESTING_MAP_STYLE : MAPBOX_SATELLITE_STYLE,
            zoom,
            attributionControl: false,
            preserveDrawingBuffer,
        });
        map.current?.on("idle", () => {
            setIsReady(true);
        });

        // disable map rotation using right click + drag
        map.current?.dragRotate.disable();
        utils.reFocusMap(map, focusOn);
        // disable map rotation using touch rotation gesture
    }, [satellite, zoom, testMode]);

    useEffect(() => {
        if (!map.current || !isReady || testMode) return;
        map.current.setStyle(satellite ? MAPBOX_SATELLITE_STYLE : MAPSTYLE);
        const mapObject = utils.returnVoloiqMap(map.current);
        utils.loadSVGIcons(mapObject);
        initializeMap(mapObject);
    }, [satellite, isReady, testMode]);

    return { map: map.current, mapContainer, isReady };
};
