import { VoloiqMap } from "../components/Map/types";
import { isVoloiqMap } from "./mapUtils";

const layersAllowedToResetHashmap = ["waypoints", "route"];

export const removeMapLayer = (map: maplibregl.Map | VoloiqMap, id: string, source?: string, ids?: string[]) => {
    if (ids)
        for (const layerId of ids) {
            if (map.getLayer(layerId)) map.removeLayer(layerId);
        }
    const sourceId = source ?? `${id}-source`;
    const layerId = `${id}-layer`;
    if (map.getLayer(layerId)) map.removeLayer(layerId);
    if (map.getSource(sourceId)) map.removeSource(sourceId);
    const isAllowedToResetHashmap = new RegExp(layersAllowedToResetHashmap.join("|")).test(layerId);
    if (isVoloiqMap(map) && isAllowedToResetHashmap) {
        const mapObject = map as VoloiqMap;
        if (
            mapObject.currentRouteId &&
            mapObject.waypointsHashMapBackUp &&
            layerId.includes(mapObject.currentRouteId.toString()) &&
            mapObject.waypointsHashMap
        )
            mapObject.waypointsHashMapBackUp[mapObject.currentRouteId] = mapObject.waypointsHashMap;
        mapObject.waypointsHashMap = undefined;
        mapObject.waypointEditSession = {};
    }
};
