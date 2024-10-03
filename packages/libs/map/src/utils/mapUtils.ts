import { FeatureCollection, distance } from "@turf/turf";
import { LngLatBounds, Map } from "maplibre-gl";
import type {
    GeoJsonSource,
    GeoJsonType,
    SymbolLayerSpec,
    VoloiqCustomDataType,
    VoloiqMap,
} from "../components/Map/types";
import { createLayerFromGeoJson } from "./createGeoJsonLayer";

/* eslint no-underscore-dangle: 0 */
export const isVoloiqMap = (map: maplibregl.Map | VoloiqMap | undefined) => map && "mapVersion" in map;
export const returnVoloiqMap = (map: maplibregl.Map | VoloiqMap | undefined) => map as VoloiqMap;

export const isWaypointPositionUpdated = (
    originalCoordinates: [number, number],
    newCoordinates: [number, number]
): boolean => {
    const calculatedDistance = distance(originalCoordinates, newCoordinates, { units: "meters" });
    if (calculatedDistance > 10) return true;
    return false;
};

export const resetWaypointSelection = (selectedId: number, mapObject: VoloiqMap): void => {
    const hashMap = mapObject.waypointsHashMap;
    if (hashMap?.[selectedId]?.properties.selected) {
        const hashMapValues = Object.values(hashMap);
        const layerProperties = mapObject.getLayer("waypoints-layer");
        createLayerFromGeoJson(mapObject, hashMapValues, "Point", layerProperties as SymbolLayerSpec);
    }
};

export const updateSelectedWaypoint = (
    map: VoloiqMap,
    waypointObject: VoloiqCustomDataType | undefined,
    deselectAllWaypoints?: boolean
): void => {
    if (deselectAllWaypoints && map.waypointsHashMap) {
        const waypointKeys = Object.keys(map.waypointsHashMap);
        for (const key of waypointKeys) {
            const id = Number.parseInt(key, 2);
            const waypointObject = map.waypointsHashMap[id];
            if (waypointObject && waypointObject.properties.selected) waypointObject.properties.selected = false;
        }
    }

    if (waypointObject && waypointObject.properties && waypointObject.properties?.id === map.selectedWaypointId) {
        waypointObject.properties.selected = true;
        if (waypointObject.properties.routeSequenceIndex > -1)
            map.updateRouteSequenceIndex?.(waypointObject?.properties.routeSequenceIndex);
    }

    if (
        map.previousSelectedWaypoint !== map.selectedWaypointId &&
        map.previousSelectedWaypoint &&
        map.waypointsHashMap
    ) {
        const previousWaypointObject = map.waypointsHashMap[map.previousSelectedWaypoint]?.properties;
        if (previousWaypointObject) previousWaypointObject.selected = false;
    }
    if (waypointObject?.properties?.id) resetWaypointSelection(waypointObject.properties.id, map);
};

export const deselectAllWaypoints = (map: VoloiqMap | undefined, id?: number) => {
    if (map) {
        const source = map.getSource("waypoints-source") as GeoJsonSource;
        if (source) {
            for (const feature of (source._data as FeatureCollection).features) {
                if (feature.properties && feature.properties.routeSequenceIndex !== id)
                    feature.properties.selected = false;
            }
            source.setData(source._data as GeoJsonType);
            map.currentWaypointEditId = undefined;
            map.previousSelectedWaypoint = undefined;
        }
    }
};

export const reFocusMap = (map: React.MutableRefObject<Map | VoloiqMap | undefined>, bounds: LngLatBounds) => {
    const mapContainerRect = map.current?.getCanvasContainer().getBoundingClientRect();
    const paddingX = Math.min(300, (mapContainerRect?.width ?? 1200) / 4);
    const paddingY = Math.min((mapContainerRect?.height ?? 0) / 2, (paddingX * 9) / 16);
    if (map.current && map.current.fitBounds)
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
};
