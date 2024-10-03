import { useEffect } from "react";
import { Waypoint } from "@voloiq/flight-planning-api/v1";
import { useRefocusMap } from "@voloiq/map";

export const useFocusWaypoints = (waypoints: Waypoint[]) => {
    const { refocusMap } = useRefocusMap();

    useEffect(() => {
        if (waypoints.length === 0) return;

        refocusMap("waypoints", waypoints);
    }, [refocusMap, waypoints]);
};
