import { MapMouseEvents, PointGeom, SymbolLayerSpec, VoloiqMap, updateSelectedWaypoint } from "@voloiq/map";

/* eslint no-underscore-dangle: 0 */

const onWaypointMove = (event: MapMouseEvents) => {
    event.preventDefault();
    let currentWP;
    const map = event.target as VoloiqMap;
    const minWaypointDragMoves = 3;
    map.dragDone = false;
    map._canvas.style.cursor = "grabbing";
    if (map.waypointsHashMap && map.currentWaypointEditId && map.updateCycle) {
        map.updateCycle += 1;
        const wayPointObject = map.waypointsHashMap[map.currentWaypointEditId];
        if (wayPointObject) {
            wayPointObject.coordinates = [event.lngLat.lng, event.lngLat.lat];
            wayPointObject.properties.lng = event.lngLat.lng;
            wayPointObject.properties.lat = event.lngLat.lat;
            map.waypointsHashMap[map.currentWaypointEditId] = wayPointObject;
            currentWP = wayPointObject.properties;
        }
        if (
            map.updateCycle &&
            (map.updateCycle < minWaypointDragMoves ||
                map.updateCycle % (map.numberOfAllowedUpdateCycles ?? 10) === 0) &&
            map.updateRouteCoordinates &&
            currentWP
        ) {
            const waypoint = currentWP;

            map.updateRouteCoordinates({
                index: waypoint.routeSequenceIndex,
                lng: waypoint.lng,
                lat: waypoint.lat,
            });
            map.updateRouteLayer = true;
            map.updateRouteCoordinates({ index: waypoint.routeSequenceIndex, lng: waypoint.lng, lat: waypoint.lat });

            const features = Object.values(map.waypointsHashMap);
            const layerProperties = map.getLayer("waypoints-layer");
            map.createLayerFromGeoJson?.(map, features, "Point", layerProperties as SymbolLayerSpec);
        }
    }
};

const onMouseUp = (event: MapMouseEvents) => {
    const map = event.target as VoloiqMap;
    map.off("mousemove", onWaypointMove);
    if (map.updateCycle) map.updateCycle = 1;
    map._canvas.style.cursor = "grab";
    if (map.waypointsHashMap && map.currentWaypointEditId) {
        const currentWPObject = map.waypointsHashMap[map.currentWaypointEditId]?.properties;
        if (currentWPObject) {
            const currentWP = currentWPObject;
            map.dragDone = true;
            if (map.editWaypoint && map.currentRouteId && currentWP) {
                map.previousSelectedWaypoint = currentWP.id;
                map.editWaypoint(currentWP);
                if (map.updateRouteCoordinates) {
                    map.updateRouteLayer = true;
                    const waypoint = currentWP;
                    map.updateRouteCoordinates({
                        index: waypoint.routeSequenceIndex,
                        lng: waypoint.lng,
                        lat: waypoint.lat,
                    });
                }

                const features = Object.values(map.waypointsHashMap);
                const layerProperties = map.getLayer("waypoints-layer");
                map.createLayerFromGeoJson?.(map, features, "Point", layerProperties as SymbolLayerSpec);
            }
        }
    }
};

const onWaypointEnter = (map: VoloiqMap) => {
    map.on("mouseenter", "waypoints-layer", (event: MapMouseEvents) => {
        const bbox: [PointGeom, PointGeom] = [
            [event.point.x - 15, event.point.y - 15],
            [event.point.x + 15, event.point.y + 15],
        ];
        const selectedFeatures = map.queryRenderedFeatures(bbox, {
            layers: ["waypoints-layer"],
        });
        if (selectedFeatures[0]) {
            map._canvas.style.cursor = selectedFeatures[0].properties.selected ? "grabbing" : "pointer";
            map.selectedWaypointId = selectedFeatures[0].properties.id;
            map.selectedWaypointType = selectedFeatures[0].properties.waypointType;
        }
    });
};
const onWaypointLeave = (map: VoloiqMap) => {
    map.on("mouseleave", "waypoints-layer", () => {
        map._canvas.style.cursor = "";
    });
};

const onMouseDown = (map: VoloiqMap) => {
    map.on("mousedown", "waypoints-layer", (event) => {
        const map = event.target as VoloiqMap;
        event.preventDefault();
        map.isWaypointUpdate = true;
        map._canvas.style.cursor = "grabbing";
        if (map.selectedWaypointId && map.waypointsHashMap && map.waypointsHashMap[map.selectedWaypointId]) {
            if (map.selectedWaypointId !== map.currentWaypointEditId) {
                updateSelectedWaypoint(map, map.waypointsHashMap[map.selectedWaypointId]);
                map.currentWaypointEditId = map.selectedWaypointId;
            }
            if (map.selectedWaypointType !== "voloport" && map.waypointsHashMap) {
                const featureProperties = map.waypointsHashMap[map.selectedWaypointId]?.properties;
                map.waypointOriginalCoordinates = {
                    lng: featureProperties?.lng ?? 0,
                    lat: featureProperties?.lat ?? 0,
                };
                map.on("mousemove", onWaypointMove);
            }
            map.once("mouseup", onMouseUp);
        }
    });
};

export const initEvents = (map: VoloiqMap) => {
    onWaypointEnter(map);
    onWaypointLeave(map);
    onMouseDown(map);
};
