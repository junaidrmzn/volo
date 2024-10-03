import { FeatureCollection, LineString, MultiLineString, featureCollection } from "@turf/turf";
import { useEffect, useRef, useState } from "react";
import { useIsAuthorizedTo } from "@voloiq/auth";
import { Route, Waypoint, useGetWaypoints } from "@voloiq/flight-planning-api/v1";
import { useDisplayRoute, waypointsToFeatureCollection } from "@voloiq/flight-planning-utils";
import { createWaypointsDataFromHashMap, returnVoloiqMap, updateWaypointOnHashMap, useMapContext } from "@voloiq/map";
import { getInitialAndMinimalRadiusForArcBetweenWaypoints } from "../waypoint-on-route-details/components/RadiusInput/useGetMinimalRadius";
import { sanitizeLongitude } from "./helpers";
import { useApplySegmentEditFiltering } from "./segment-editing";
import { createArcSegmentCircle } from "./segment-editing/arc-segment/support-circle/createArcSegmentCircle";

type UseRouteLayerOptions = {
    routeLayerId: string;
    route: Route;
    routeColor: string;
    isLoading: boolean;
};

// TODO: needs to be refactored as its to complex
export const useRouteLayer = (options: UseRouteLayerOptions) => {
    const { routeLayerId, route, routeColor, isLoading } = options;
    const { map, isReady } = useMapContext();
    const mapObject = returnVoloiqMap(map);
    const { data: waypoints } = useGetWaypoints(route.id);
    const waypointsData = createWaypointsDataFromHashMap(mapObject);
    if (!mapObject?.selectedRouteSequenceIndex && waypoints)
        for (const wp of waypoints) {
            wp.selected = false;
        }
    const routeWaypoints = mapObject?.takeWaypointsFromRouteRequest ? waypoints : waypointsData;

    if (mapObject?.takeWaypointsFromRouteRequest) mapObject.takeWaypointsFromRouteRequest = false;
    const waypointsRef = useRef(routeWaypoints);
    const [routeCoordinates, setRouteCoordinates] = useState<FeatureCollection<LineString | MultiLineString>>(
        featureCollection([])
    );
    const isWaypointEditable = useIsAuthorizedTo(["update"], ["Waypoint"]);

    const { filterRouteSegmentByRouteSequenceIndex } = useApplySegmentEditFiltering();

    useDisplayRoute({
        greatCircleCoordinates: routeCoordinates,
        layerId: routeLayerId,
        routeColor,
        routeType: "selected",
        isWaypointEditable,
        routeCoordinatesFilter: filterRouteSegmentByRouteSequenceIndex,
        isLoading,
    });

    const updateNewRouteCoordinates = (waypointsData: Waypoint[]) => {
        setRouteCoordinates(waypointsToFeatureCollection(waypointsData));
    };

    const changeCoordinateAtIndexDragHandler = (index: number, longitude: number, latitude: number) => {
        const sanitizedLongitude = sanitizeLongitude(longitude);
        const waypointsData = createWaypointsDataFromHashMap(mapObject, true);
        const waypointsCopy =
            waypointsData?.map((waypoint, waypointIndex) => {
                if (waypoint.routeSequenceIndex === index) {
                    waypoint.lat = latitude;
                    waypoint.lng = sanitizedLongitude;
                }
                if (waypoint.routeSegment?.type === "arc" && waypointsData[waypointIndex + 1]) {
                    const nextWaypoint = waypointsData[waypointIndex + 1]!;
                    const { radius: arcSegmentRadius } = waypoint.routeSegment;
                    const { minimalRadius } = getInitialAndMinimalRadiusForArcBetweenWaypoints(waypoint, nextWaypoint);
                    const newRadius = Math.max(minimalRadius, arcSegmentRadius);
                    const { radius, centerLat, centerLng } = createArcSegmentCircle(
                        waypoint.lat,
                        waypoint.lng,
                        nextWaypoint.lat,
                        nextWaypoint.lng,
                        newRadius,
                        false
                    );
                    waypoint.routeSegment = {
                        ...waypoint.routeSegment,
                        latitude: centerLat,
                        longitude: centerLng,
                        radius,
                    };
                }

                updateWaypointOnHashMap(waypoint, mapObject);
                return waypoint;
            }) ?? [];
        waypointsRef.current = waypointsCopy;
        setRouteCoordinates(waypointsToFeatureCollection(waypointsCopy));
    };
    useEffect(() => {
        if (routeCoordinates.features.length === 0) {
            mapObject.updateRouteLayer = true;
            const noDataOnWaypointsHashMap = mapObject.waypointsHashMap === undefined;
            const hashMapWaypoints = createWaypointsDataFromHashMap(
                mapObject,
                true,
                noDataOnWaypointsHashMap,
                route.id
            );

            if (hashMapWaypoints) {
                const features = waypointsToFeatureCollection(hashMapWaypoints);
                setRouteCoordinates(features);
            } else if (waypoints) setRouteCoordinates(waypointsToFeatureCollection(waypoints));
        }
    }, [routeCoordinates]);

    /**
     * calculate great circle coordinates
     */
    useEffect(() => {
        if (!routeWaypoints || !isReady || routeWaypoints.length < 2 || !mapObject.dragDone) return;
        setRouteCoordinates(waypointsToFeatureCollection(routeWaypoints));
    }, [isReady, routeWaypoints]);

    return {
        changeCoordinateAtIndexDragHandler,
        updateNewRouteCoordinates,
        getWaypointsAfterChange: () => waypointsRef.current,
    };
};
