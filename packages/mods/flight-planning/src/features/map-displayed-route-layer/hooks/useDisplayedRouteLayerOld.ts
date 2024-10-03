import { FeatureCollection, LineString, MultiLineString, featureCollection } from "@turf/turf";
import { useEffect, useState } from "react";
import { Route, Waypoint } from "@voloiq/flight-planning-api/v1";
import { waypointsToFeatureCollection } from "@voloiq/flight-planning-utils";
import { useMapContext, useMapLayerEvent } from "@voloiq/map";
import { useDisplayRouteOld, useRefocusCallback } from "../../overview/hooks";
import { useSelectedRoute } from "../../selected-route";

export const useRouteDisplayedLayerOld = (
    route: Route,
    waypoints: Waypoint[] | undefined,
    routeDisplayedColor: string
) => {
    const [routeCoordinates, setRouteCoordinates] = useState<FeatureCollection<LineString | MultiLineString>>(
        featureCollection([])
    );

    const { isReady } = useMapContext();
    const { selectRoute } = useSelectedRoute();
    const { handleRefocusCallback } = useRefocusCallback();
    useDisplayRouteOld({
        greatCircleCoordinates: routeCoordinates,
        displayId: `displayed-route-${route.id}`,
        routeColor: routeDisplayedColor,
        routeType: "displayed",
    });

    /**
     * mark as selected route on click on route segment
     */
    useMapLayerEvent("click", `displayed-route-${route.id}-layer`, (event) => {
        if (!event.features || !waypoints) return;
        selectRoute(route.id);
        handleRefocusCallback(route);
    });

    useEffect(() => {
        if (!isReady || !waypoints) return;
        setRouteCoordinates(waypointsToFeatureCollection(waypoints));
    }, [isReady, waypoints]);
};
