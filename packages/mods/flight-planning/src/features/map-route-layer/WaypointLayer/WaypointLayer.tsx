import { Waypoint } from "@voloiq/flight-planning-api/v1";
import type { SymbolLayerSpec, VoloiqMap } from "@voloiq/map";
import { createWaypointsData, createWaypointsHashMap } from "@voloiq/map";
import { initEvents } from "./WaypointsEvents";

/* eslint no-underscore-dangle: 0 */
type WaypointLayerProps = {
    map: VoloiqMap;
    waypoints: Waypoint[];
    routeId: number;
    updateSelectedRouteSequenceIndex: (routeSequenceIndex: number | undefined) => void;
    handleWaypointEdit: (waypoint: Waypoint) => Promise<void>;
    updateRouteCoordinates: (props: {
        index?: number;
        lng?: number;
        lat?: number;
        waypointsArray?: Waypoint[];
    }) => void;
    selectedRouteSequenceIndex: number | undefined;
};

export const WaypointLayer: FCC<WaypointLayerProps> = (props: WaypointLayerProps) => {
    const {
        map,
        waypoints,
        routeId,
        updateSelectedRouteSequenceIndex,
        handleWaypointEdit,
        updateRouteCoordinates,
        selectedRouteSequenceIndex,
    } = props;
    map.updateRouteSequenceIndex = updateSelectedRouteSequenceIndex;
    map.currentRouteId = routeId;
    map.editWaypoint = handleWaypointEdit;
    map.updateRouteCoordinates = updateRouteCoordinates;
    map.selectedRouteSequenceIndex = selectedRouteSequenceIndex;

    const waypointsData = createWaypointsData(map, waypoints);

    if (map) {
        const isLayerExist = !!map.getLayer("waypoints-layer");
        const orderArray = map.style._order;
        const lastLayer = orderArray[-1];
        if (!isLayerExist) {
            const options = {
                id: "waypoints-layer",
                source: "waypoints-source",
                type: "symbol",
                layout: {
                    "icon-image": [
                        "case",
                        ["all", ["==", ["get", "waypointType"], "waypoint"], ["==", ["get", "selected"], true]],
                        "selected-waypoint",
                        ["all", ["==", ["get", "waypointType"], "waypoint"], ["==", ["get", "selected"], false]],
                        "waypoint",
                        ["==", ["get", "selected"], true],
                        "selected-voloport",
                        "voloport",
                    ],
                    "icon-size": 1,
                    "icon-allow-overlap": true,
                },
            };
            createWaypointsHashMap(map, waypointsData);

            map.createLayerFromGeoJson?.(map, waypointsData, "Point", options as SymbolLayerSpec, lastLayer);
            initEvents(map);
        } else if (map) {
            if (orderArray.includes("waypoints-layer") && orderArray[-1] !== "waypoints-layer")
                map.moveLayer("waypoints-layer", lastLayer);

            if (map.waypointsHashMap) {
                map.isMapNeedsRefresh = false;
                const waypointsData = createWaypointsData(map);
                createWaypointsHashMap(map, waypointsData);
                const layerProperties = map.getLayer("waypoints-layer");
                map.createLayerFromGeoJson?.(map, waypointsData, "Point", layerProperties as SymbolLayerSpec);
            }
        }
    }

    return null;
};
