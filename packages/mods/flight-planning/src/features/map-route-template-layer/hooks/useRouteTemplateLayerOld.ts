import { FeatureCollection, LineString, MultiLineString, featureCollection } from "@turf/turf";
import { useToken } from "@volocopter/design-library-react";
import { useEffect, useState } from "react";
import { RouteTemplate } from "@voloiq/flight-planning-api/v1";
import { waypointsToFeatureCollection } from "@voloiq/flight-planning-utils";
import { useMapContext, useRefocusMap } from "@voloiq/map";
import { useDisplayRouteOld } from "../../overview/hooks";

export const useRouteTemplateLayer = (routeTemplate: RouteTemplate | undefined) => {
    const [routeCoordinates, setRouteCoordinates] = useState<FeatureCollection<LineString | MultiLineString>>(
        featureCollection([])
    );

    useDisplayRouteOld({
        greatCircleCoordinates: routeCoordinates,
        displayId: "preview-template-route",
        routeColor: useToken("colors", "darkBlue.500"),
        routeType: "template",
    });
    const { isReady } = useMapContext();
    const { refocusMap } = useRefocusMap();

    useEffect(() => {
        if (!isReady || !routeTemplate?.waypoints) return;
        setRouteCoordinates(waypointsToFeatureCollection(routeTemplate.waypoints));
        refocusMap("waypointTemplates", routeTemplate.waypoints);
    }, [isReady, routeTemplate?.waypoints, refocusMap]);
};
