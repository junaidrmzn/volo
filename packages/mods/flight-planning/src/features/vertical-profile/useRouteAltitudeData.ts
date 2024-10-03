import { useMemo } from "react";
import { getDistanceInNauticalMiles } from "@voloiq/flight-planning-utils";
import { VoloiqMapStoreType, createWaypointsDataFromHashMap } from "@voloiq/map";
import { convertWaypointUnitsForDisplay } from "../../utils/convertWaypointUnits";

export const useRouteAltitudeData = (voloiqMapStore?: VoloiqMapStoreType) => {
    const waypointsData = createWaypointsDataFromHashMap(voloiqMapStore?.map, true);
    const routeAltitudeData: [number, number][] = useMemo(() => {
        let totalDistance = 0;
        return (
            waypointsData?.map((waypoint, index, array) => {
                const waypointToDisplay = convertWaypointUnitsForDisplay(waypoint);
                if (index === 0) return [0, waypointToDisplay.alt || 0];

                const previousWaypoint = array[index - 1];
                if (previousWaypoint) {
                    const distance = Number.parseFloat(
                        getDistanceInNauticalMiles(waypoint, previousWaypoint).toPrecision(3)
                    );

                    totalDistance += distance;
                }

                return [totalDistance, waypointToDisplay.alt || 0];
            }) || []
        );
    }, [waypointsData]);

    const endDistance = routeAltitudeData[routeAltitudeData.length - 1]?.[0] ?? 0;
    return {
        routeAltitudeData,
        endDistance,
    };
};
