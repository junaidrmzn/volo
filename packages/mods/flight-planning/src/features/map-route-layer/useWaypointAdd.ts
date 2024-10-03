import { Waypoint, WaypointCreate, WaypointTransition } from "@voloiq/flight-planning-api/v1";
import {
    MapLayerMouseEvents,
    MapMouseEvents,
    PointGeom,
    VoloiqMap,
    createWaypointsDataFromHashMap,
    deselectAllWaypoints,
    returnVoloiqMap,
    useMapContext,
} from "@voloiq/map";
import { ResponseEnvelope } from "@voloiq/service";
import { useFlightPlanningTranslation } from "../../translations";
import { getNewWaypointRouteSequenceIndex } from "../../utils/waypoints";
import type { GeoJsonRouteFeature } from "./types";

/* eslint no-underscore-dangle: 0 */
type WaypointResponse = {
    data?: Waypoint;
} & Waypoint;
type UseWaypointAddOptions = {
    layerId: string;
    createWaypointAsync: (waypoint: WaypointCreate) => Promise<ResponseEnvelope<Waypoint>>;
    onSuccessfulAdd?: () => unknown;
    isWaypointAddable: boolean;
    isVoloiqMap?: boolean;
};

const isStillAddingWaypoint = (waypoints: Waypoint[], map: VoloiqMap) => {
    const waypointWithTemporaryId = waypoints.find((wp) => wp.id <= 0);
    map.isAddingWaypoint = !!waypointWithTemporaryId;
    return !!waypointWithTemporaryId;
};

const isCloseToExistingWaypoint = (waypointsLayer: string, event: MapMouseEvents, map: VoloiqMap): boolean => {
    const bbox: [PointGeom, PointGeom] = [
        [event.point.x - 15, event.point.y - 15],
        [event.point.x + 15, event.point.y + 15],
    ];
    const selectedFeatures = map.queryRenderedFeatures(bbox, {
        layers: [waypointsLayer],
    });
    return !!selectedFeatures[0];
};

export const useWaypointAdd = (options: UseWaypointAddOptions) => {
    const { createWaypointAsync, layerId, onSuccessfulAdd, isWaypointAddable, isVoloiqMap } = options;

    const { t } = useFlightPlanningTranslation();
    const { map } = useMapContext();

    /**
     * add waypoints on click on route segment
     */
    if (map && isWaypointAddable) {
        const addWaypoint = async (event: MapLayerMouseEvents) => {
            const waypoints = createWaypointsDataFromHashMap(map as VoloiqMap, true);
            if (
                !event.features ||
                !event.features[0] ||
                !waypoints ||
                isStillAddingWaypoint(waypoints, map) ||
                (map && isVoloiqMap && isCloseToExistingWaypoint("waypoints-layer", event, returnVoloiqMap(map)))
            )
                return;
            deselectAllWaypoints(map);
            const feature: GeoJsonRouteFeature = event.features[0];
            const mapObject = map as VoloiqMap;
            if (mapObject.updateRouteSequenceIndex) mapObject.updateRouteSequenceIndex(undefined);
            const { routeSequenceIndex = 0 } = feature.properties;
            const previousWaypoint = waypoints[routeSequenceIndex - 1];
            mapObject.isAddingWaypoint = true;

            const initWaypointValues = {
                name: t("flight.waypointAttributes.Unnamed"),
                lat: event.lngLat.lat,
                lng: event.lngLat.lng,
                routeSequenceIndex: 0,
                alt: previousWaypoint ? (previousWaypoint?.alt === 0 ? 150 : previousWaypoint?.alt) : 0,
                speed: previousWaypoint ? previousWaypoint?.speed : 0,
                rnp: previousWaypoint && previousWaypoint.rnp ? previousWaypoint.rnp : 0,
                transitionType: WaypointTransition.flyBy,
                transitionRadius: 100,
            };
            const addedWaypoint: WaypointCreate = {
                name: initWaypointValues.name,
                lat: initWaypointValues.lat,
                lng: initWaypointValues.lng,
                routeSequenceIndex: map
                    ? getNewWaypointRouteSequenceIndex(
                          waypoints,
                          {
                              id: -1,
                              heading: 100,
                              targetTimeOver: 100,
                              waypointType: "waypoint",
                              ...initWaypointValues,
                          },
                          map
                      )
                    : 0,
                alt: initWaypointValues.alt,
                speed: initWaypointValues.speed,
                rnp: initWaypointValues.rnp,
                transitionType: initWaypointValues.transitionType,
                transitionRadius: initWaypointValues.transitionRadius,
            };
            const newWaypointResponse = (await createWaypointAsync(
                addedWaypoint
            )) as ResponseEnvelope<WaypointResponse>;
            const newWaypointData = newWaypointResponse?.data?.data ?? newWaypointResponse?.data;

            if (mapObject.waypointsHashMap && newWaypointData) {
                newWaypointData.waypointType = "waypoint";
                mapObject.waypointsHashMap[newWaypointData.id] = {
                    coordinates: [newWaypointData.lng, newWaypointData.lat],
                    properties: newWaypointData,
                };
            }
            mapObject.isMapNeedsRefresh = true;
            onSuccessfulAdd?.();
        };

        const allMapClickEvents = map._delegatedListeners?.click;
        if (allMapClickEvents) {
            const clickEventLayers = allMapClickEvents.map((clickEvent: typeof allMapClickEvents) => clickEvent.layer);
            if (clickEventLayers && !clickEventLayers.includes(`${layerId}-layer`))
                map.on("click", `${layerId}-layer`, addWaypoint);
        } else {
            map.on("click", `${layerId}-layer`, addWaypoint);
        }
    }
};
