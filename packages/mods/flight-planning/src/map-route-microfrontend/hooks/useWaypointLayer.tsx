import { Waypoint } from "@voloiq/flight-planning-api/v1";
import type { FeaturesCoordinates, SymbolLayerSpec, VoloiqMap } from "@voloiq/map";

/* eslint no-underscore-dangle: 0 */
type WaypointLayerProps = {
    map: VoloiqMap;
    waypoints: Waypoint[];
};

const createWaypointsData = (waypoints: Waypoint[], map: VoloiqMap) =>
    waypoints.map((wp, index) => ({
        coordinates: [wp.lng, wp.lat],
        properties: {
            selected: map?.selectedRouteSequenceIndex === wp.routeSequenceIndex,
            waypointType: `${index === waypoints.length - 1 || index === 0 ? "voloport" : "waypoint"}`,
            ...wp,
        },
    }));

const createWaypointsHasMap = (
    map: VoloiqMap,
    waypoints: { coordinates: FeaturesCoordinates; properties: Waypoint }[]
): void => {
    map.waypointsHashMap = undefined;
    const waypointsHashMap: { [id: number]: { coordinates: FeaturesCoordinates; properties: Waypoint } } = {};
    for (const wp of waypoints) {
        waypointsHashMap[wp.properties.id] = wp;
    }
    map.waypointsHashMap = waypointsHashMap;
};

export const useWaypointLayer: FCC<WaypointLayerProps> = (props: WaypointLayerProps) => {
    const { map, waypoints } = props;

    const waypointsData = createWaypointsData(waypoints, map);

    if (map) {
        const isLayerExist = !!map.getLayer("waypoints-layer");
        if (!isLayerExist) {
            const options = {
                id: "waypoints-layer",
                source: "waypoints-source",
                type: "symbol",
                layout: {
                    "icon-image": ["case", ["==", ["get", "waypointType"], "waypoint"], "waypoint", "voloport"],
                    "icon-size": 1,
                    "icon-allow-overlap": true,
                },
            };

            createWaypointsHasMap(map, waypointsData);
            map.createLayerFromGeoJson?.(map, waypointsData, "Point", options as SymbolLayerSpec);
            setTimeout(() => map.createLayerFromGeoJson?.(map, waypointsData, "Point", options as SymbolLayerSpec), 1);
            const orderArray = map.style._order;
            const lastLayer = orderArray[-1];
            if (orderArray.includes("waypoints-layer") && orderArray[-1] !== "waypoints-layer")
                map.moveLayer("waypoints-layer", lastLayer);
        } else if (map && map.waypointsHashMap && map.isMapNeedsRefresh) {
            const waypointsData = createWaypointsData(waypoints, map);
            createWaypointsHasMap(map, waypointsData);
            const layerProperties = map.getLayer("waypoints-layer");
            map.createLayerFromGeoJson?.(map, waypointsData, "Point", layerProperties as SymbolLayerSpec);
        }
    }

    return null;
};
