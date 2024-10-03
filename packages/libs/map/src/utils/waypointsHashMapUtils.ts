import { ArcSegment, Waypoint } from "@voloiq/flight-planning-api/v1";
import type { FeaturesCoordinates, VoloiqMap, WaypointsHashMap } from "../components";

type HashmapWaypointData = { coordinates: FeaturesCoordinates; properties: Waypoint };

export const deafultWaypointData: HashmapWaypointData[] = [
    {
        coordinates: [0, 0],
        properties: {
            id: 0,
            name: "unamed",
            lat: 0,
            lng: 0,
            alt: 0,
            rnp: 0,
            routeSequenceIndex: 0,
            transitionType: "fly-by",
            targetTimeOver: 0,
            speed: 0,
            heading: 0,
            transitionRadius: 0,
        },
    },
];

const getHashMapWaypoints = (map: VoloiqMap, fromBackUp?: boolean, routeId?: number) => {
    if (fromBackUp && routeId && map.waypointsHashMapBackUp) {
        return map.waypointsHashMapBackUp[routeId] ?? undefined;
    }
    if (!fromBackUp && map.waypointsHashMap) return map.waypointsHashMap;
    return undefined;
};

const checkForTemporaryWaypoint = (hashMapValues: WaypointsHashMap) =>
    Object.keys(hashMapValues).filter((key) => Number.parseInt(key, 2) <= 0);

export const removeTemporaryWaypoint = (waypointDetails: Waypoint, map: VoloiqMap) => {
    if (map.waypointsHashMap) {
        const keys = checkForTemporaryWaypoint(map.waypointsHashMap);
        if (keys) {
            if (map.waypointsHashMap[-1]) {
                const lastWP = map.waypointsHashMap[-1];
                if (lastWP) lastWP.properties.id = waypointDetails.id;
            }
            if (map.waypointsHashMap[0]) {
                const lastWP = map.waypointsHashMap[0];
                if (lastWP) lastWP.properties.id = waypointDetails.id;
            }
        }
    }
};

export const createWaypointsData = (map: VoloiqMap, waypoints?: Waypoint[]) => {
    if (map && waypoints) {
        map.isMapNeedsRefresh = true;
        return waypoints.map((wp) => ({
            coordinates: [wp.lng, wp.lat],
            properties: {
                ...wp,
                selected: map.selectedRouteSequenceIndex === wp.routeSequenceIndex,
            },
        }));
    }
    if (map && !waypoints && map.waypointsHashMap) {
        const hashMapValues = Object.values(map.waypointsHashMap).sort((a, b) => a.properties.id - b.properties.id);
        const waypointsDataFromHashMap = hashMapValues.map((wp) => wp.properties);
        map.isMapNeedsRefresh = true;
        waypointsDataFromHashMap.sort((a, b) => a.routeSequenceIndex - b.routeSequenceIndex);
        return waypointsDataFromHashMap.map((wp) => ({
            coordinates: [wp.lng, wp.lat],
            properties: {
                ...wp,
                selected: map.selectedRouteSequenceIndex === wp.routeSequenceIndex,
            },
        }));
    }

    map.isMapNeedsRefresh = true;

    return deafultWaypointData;
};

export const createWaypointsHashMap = (map: VoloiqMap, waypoints: HashmapWaypointData[]): void => {
    const waypointsHashMap: { [id: number]: { coordinates: FeaturesCoordinates; properties: Waypoint } } = {};
    const newestWaypointId = Math.max(...waypoints.map((o) => o.properties.id));
    if (!map.newestWaypointIdOnRoute || map.newestWaypointIdOnRoute < newestWaypointId)
        map.newestWaypointIdOnRoute = newestWaypointId;
    const hasValuesInHashMap =
        map && map.waypointsHashMap !== undefined && Object.values(map.waypointsHashMap).length > 1;
    for (const wp of waypoints) {
        if (hasValuesInHashMap && map.waypointsHashMap && map.waypointsHashMap[wp.properties.id]) {
            wp.properties.waypointType = map.waypointsHashMap[wp.properties.id]?.properties.waypointType;
        } else if (hasValuesInHashMap && map.waypointsHashMap && !map.waypointsHashMap[wp.properties.id]) {
            wp.properties.waypointType = "waypoint";
        } else {
            wp.properties.waypointType =
                wp.properties.routeSequenceIndex === 0 || wp.properties.routeSequenceIndex === waypoints.length - 1
                    ? "voloport"
                    : "waypoint";
        }
        waypointsHashMap[wp.properties.id] = wp;
    }
    map.waypointsHashMap = waypointsHashMap;
};

export const updateWaypointsHashMap = (waypoints: Waypoint[], map: VoloiqMap): void => {
    const waypointsForHashMap = waypoints.map((wp) => ({
        coordinates: [wp.lng, wp.lat],
        properties: {
            selected: map?.selectedRouteSequenceIndex === wp.routeSequenceIndex,
            ...wp,
        },
    }));
    createWaypointsHashMap(map, waypointsForHashMap);
    if (map.updateRouteCoordinates) map.updateRouteCoordinates({ waypointsArray: waypoints });
    map.isMapNeedsRefresh = true;
};

export const createWaypointsDataFromHashMap = (
    map?: VoloiqMap,
    waypointsNeede?: boolean,
    fromBackup?: boolean,
    routeId?: number
): Waypoint[] | undefined => {
    if ((map && map.isMapNeedsRefresh) || (map && waypointsNeede)) {
        map.isMapNeedsRefresh = false;
        const waypoints = getHashMapWaypoints(map, fromBackup, routeId);
        const formattedWaypoints = waypoints ? Object.values(waypoints).map((wp) => wp.properties) : undefined;
        return formattedWaypoints?.sort((a, b) => a.routeSequenceIndex - b.routeSequenceIndex);
    }
    return undefined;
};

export const updateArcSegmentsOnWaypointsHashMap = (
    waypointId: number,
    map: VoloiqMap,
    arcSegmentData?: ArcSegment,
    isRemoveArcSegment?: boolean
) => {
    if (map.waypointsHashMap) {
        const waypointObject = map.waypointsHashMap[waypointId];
        if (waypointObject && !isRemoveArcSegment && arcSegmentData)
            waypointObject.properties.routeSegment = {
                ...arcSegmentData,
                type: "arc",
            };
        else if (waypointObject && isRemoveArcSegment) waypointObject.properties.routeSegment = undefined;
        if (waypointObject && map?.updateRouteCoordinates)
            map.updateRouteCoordinates({
                index: waypointObject.properties.routeSequenceIndex,
                lng: waypointObject.properties.lng,
                lat: waypointObject.properties.lat,
            });
        createWaypointsDataFromHashMap(map, true);
    }
};

export const updateWaypointOnHashMap = (newWayPointData: Waypoint, map: VoloiqMap) => {
    if (map.waypointsHashMap && newWayPointData.id) {
        const waypoint = map.waypointsHashMap[newWayPointData.id];
        if (waypoint) {
            waypoint.properties = newWayPointData;
            waypoint.coordinates = [newWayPointData.lng, newWayPointData.lat];
            if (newWayPointData?.routeSegment) waypoint.properties.routeSegment = newWayPointData.routeSegment;
            map.waypointsHashMap[newWayPointData.id] = waypoint;
        }
    }
};

export const updateMapOnSuccessfulEdit = (
    map: VoloiqMap,
    waypointdata?: Waypoint,
    isConditionNeeded?: boolean
): void => {
    if (
        isConditionNeeded &&
        map.waypointsHashMap &&
        waypointdata &&
        ((map.waypointEditSession && !map.currentWaypointEditId) ||
            (map.waypointEditSession &&
                map.currentWaypointEditId &&
                !map.waypointEditSession[map.currentWaypointEditId]))
    ) {
        const waypointObject = map.waypointsHashMap[waypointdata.id];
        if (waypointObject) waypointObject.properties.alt = waypointdata.alt;
        map.isMapNeedsRefresh = true;
    } else if (!isConditionNeeded) map.isMapNeedsRefresh = true;
};
