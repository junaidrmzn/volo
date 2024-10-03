import { FeatureCollection, LineString, MultiLineString, featureCollection } from "@turf/turf";
import { useEffect, useState } from "react";
import { Route, Waypoint } from "@voloiq/flight-planning-api/v1";
import { useDisplayRoute, waypointsToFeatureCollection } from "@voloiq/flight-planning-utils";
import {
    VoloiqMap,
    createWaypointsData,
    createWaypointsDataFromHashMap,
    createWaypointsHashMap,
    useMapContext,
    useMapLayerEvent,
} from "@voloiq/map";
import { useRefocusCallback } from "../../overview/hooks";
import { useSelectedRoute } from "../../selected-route";

export const useRouteDisplayedLayer = (
    route: Route,
    waypoints: Waypoint[] | undefined,
    routeDisplayedColor: string
) => {
    const [routeCoordinates, setRouteCoordinates] = useState<FeatureCollection<LineString | MultiLineString>>(
        featureCollection([])
    );

    const { map, isReady } = useMapContext();
    const { selectRoute } = useSelectedRoute();
    const { handleRefocusCallback } = useRefocusCallback();
    const mapObject = map as VoloiqMap;
    useDisplayRoute({
        greatCircleCoordinates: routeCoordinates,
        layerId: `displayed-route-${route.id}`,
        routeColor: routeDisplayedColor,
        routeType: "displayed",
    });

    /**
     * mark as selected route on click on route segment

     */
    useMapLayerEvent("click", `displayed-route-${route.id}-layer`, (event) => {
        if (!event.features || !waypoints) return;
        if (
            mapObject.currentRouteId &&
            route.id !== mapObject.currentRouteId &&
            mapObject.waypointsHashMap &&
            mapObject.waypointsHashMapBackUp
        )
            mapObject.waypointsHashMapBackUp[mapObject.currentRouteId] = mapObject.waypointsHashMap;
        mapObject.waypointsHashMap = undefined;
        selectRoute(route.id);
        handleRefocusCallback(route);
        createWaypointsHashMap(mapObject, createWaypointsData(mapObject, waypoints));
        setRouteCoordinates(waypointsToFeatureCollection(waypoints));
    });

    useEffect(() => {
        if (!isReady || !waypoints) return;
        setRouteCoordinates(
            waypointsToFeatureCollection(
                route.id === mapObject.currentRouteId && mapObject
                    ? createWaypointsDataFromHashMap(mapObject, true, true, route.id) ?? waypoints
                    : waypoints
            )
        );
    }, [isReady, waypoints]);
};
