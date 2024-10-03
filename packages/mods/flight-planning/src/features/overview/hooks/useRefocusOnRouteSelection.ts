import { useEffect } from "react";
import type { UseQueryResult } from "react-query";
import type { RouteOption } from "@voloiq/flight-planning-api/v1";
import { Route } from "@voloiq/flight-planning-api/v1";
import { useRefocusMap } from "@voloiq/map";
import type { Error } from "@voloiq/service";
import { useRefocusCallback } from "./useRefocusCallback";

export const useRefocusOnRouteSelection = (
    routeOptionsQuery: UseQueryResult<RouteOption | undefined, Error>,
    displayedRoutes: Route[],
    selectedRoute: Route | undefined,
    refocusAllowed: boolean
) => {
    useRefocusCallback(displayedRoutes);
    const { refocusMap } = useRefocusMap();

    useEffect(() => {
        if (!refocusAllowed) {
            return;
        }

        // if selectedRoute is set: focus only on selectedRoute
        if (selectedRoute && selectedRoute.waypoints) {
            refocusMap("waypoints", selectedRoute.waypoints);
            return;
        }

        // if there is no selected Route but displayedRoutes are set: focus on all displayedRoutes
        if (displayedRoutes && displayedRoutes.length > 0) {
            const waypoints = displayedRoutes.flatMap((route) => (!route || !route.waypoints ? [] : route.waypoints));
            refocusMap("waypoints", waypoints);
            return;
        }

        // if neither selectedRoute nor displayedRoutes are set: focus on the vertiports
        if (routeOptionsQuery.isSuccess && routeOptionsQuery.data) {
            const vertiportBounds = [
                routeOptionsQuery.data.arrivalExternalVertiport,
                routeOptionsQuery.data.departureExternalVertiport,
            ];
            refocusMap("waypoints", []);
            refocusMap("vertiports", vertiportBounds);
        }
    }, [
        routeOptionsQuery.data,
        routeOptionsQuery.isSuccess,
        refocusMap,
        displayedRoutes,
        selectedRoute,
        refocusAllowed,
    ]);
};
