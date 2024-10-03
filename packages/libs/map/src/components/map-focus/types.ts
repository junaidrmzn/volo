import type { LngLatLike } from "maplibre-gl";

/**
 * Params which are used by the map to fit the bounds. Can be waypoints or waypoint-templates.
 */
export type PointCollections = { [pointCollectionName: string]: LngLatLike[] };

/**
 * Action of the mapFocusController's reducer.
 */
export type MapFocusControllerAction =
    | { type: "triggerRefocus" }
    | { type: "updatePointCollectionAndTriggerRefocus"; pointCollectionName: string; pointCollection: LngLatLike[] }
    | { type: "temporaryFocusCoordinates"; coordinates: LngLatLike[] }
    | { type: "resetTriggerSignal" };

/**
 * State managed by the mapFocusController's reducer.
 */
export type MapFocusControllerState = {
    refocusTriggered: boolean;
    pointCollections: PointCollections;
    temporaryFocusedCoordinates?: LngLatLike[];
};
