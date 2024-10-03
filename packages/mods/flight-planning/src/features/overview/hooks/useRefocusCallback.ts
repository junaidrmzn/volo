import { useCallback, useEffect, useState } from "react";
import type { RouteOption } from "@voloiq/flight-planning-api/v1";
import { Route } from "@voloiq/flight-planning-api/v1";
import { useRefocusMap } from "@voloiq/map";

export const useRefocusCallback = (displayedRoutes?: Route[], routeOption?: RouteOption) => {
    const [firstWaypointFetchDone, setFirstWaypointFetchDone] = useState(false);
    const { refocusMap } = useRefocusMap();

    useEffect(() => {
        if (firstWaypointFetchDone) return;

        if (displayedRoutes && displayedRoutes.length > 0) {
            const waypoints = displayedRoutes.flatMap((route) => (!route || !route.waypoints ? [] : route.waypoints));

            if (waypoints.length === 0) return;

            setFirstWaypointFetchDone(true);
            refocusMap("waypoints", waypoints);
        }
    }, [firstWaypointFetchDone, refocusMap, displayedRoutes]);

    const handleRefocusCallback = useCallback(
        (route?: Route) => {
            if (route && route.waypoints && route.waypoints.length > 0) {
                refocusMap("waypoints", route.waypoints);
                return;
            }

            if (routeOption) {
                const vertiportBounds = [routeOption.arrivalExternalVertiport, routeOption.departureExternalVertiport];
                refocusMap("vertiports", vertiportBounds);
            }
        },
        [refocusMap, routeOption]
    );

    return { handleRefocusCallback };
};
