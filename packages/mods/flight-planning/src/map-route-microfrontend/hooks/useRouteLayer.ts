import { FeatureCollection, LineString, MultiLineString, featureCollection } from "@turf/turf";
import { useToken } from "@volocopter/design-library-react";
import { useEffect, useState } from "react";
import { v4 as uuidV4 } from "uuid";
import { Waypoint } from "@voloiq/flight-planning-api/v1";
import { useDisplayRoute, waypointsToFeatureCollection } from "@voloiq/flight-planning-utils";

type UseRouteLayerOptions = {
    waypoints: Waypoint[];
    isMapReady: boolean;
};
export const useRouteLayer = (options: UseRouteLayerOptions) => {
    const { waypoints, isMapReady } = options;
    const [routeCoordinates, setRouteCoordinates] = useState<FeatureCollection<LineString | MultiLineString>>(
        featureCollection([])
    );

    const color = useToken("colors", "darkBlue.300");

    useDisplayRoute({
        greatCircleCoordinates: routeCoordinates,
        layerId: uuidV4(),
        routeColor: color,
        routeType: "displayed",
    });

    useEffect(() => {
        if (!isMapReady || !waypoints) return;
        setRouteCoordinates(waypointsToFeatureCollection(waypoints));
    }, [isMapReady, waypoints]);
};
