import { FeatureCollection, LineString, MultiLineString, featureCollection } from "@turf/turf";
import { useEffect, useState } from "react";
import { useIsAuthorizedTo } from "@voloiq/auth";
import { Route, useGetWaypoints } from "@voloiq/flight-planning-api/v1";
import { calculateGreatCircleSegment, waypointsToFeatureCollection } from "@voloiq/flight-planning-utils";
import { useMapContext } from "@voloiq/map";
import { useDisplayRouteOld } from "../overview/hooks";
import { extractNextCoordinate, extractPreviousCoordinate, sanitizeLongitude } from "./helpers";
import { useApplySegmentEditFiltering } from "./segment-editing";

type UseRouteLayerOptions = {
    routeLayerId: string;
    route: Route;
    routeColor: string;
    isLoading: boolean;
};

// TODO: needs to be refactored as its to complex
export const useRouteLayerOld = (options: UseRouteLayerOptions) => {
    const { routeLayerId, route, routeColor, isLoading } = options;
    const { isReady } = useMapContext();
    const [routeCoordinates, setRouteCoordinates] = useState<FeatureCollection<LineString | MultiLineString>>(
        featureCollection([])
    );
    const isWaypointEditable = useIsAuthorizedTo(["update"], ["Waypoint"]);

    const { filterRouteSegmentByRouteSequenceIndex } = useApplySegmentEditFiltering();

    useDisplayRouteOld({
        greatCircleCoordinates: routeCoordinates,
        displayId: routeLayerId,
        routeColor,
        routeType: "selected",
        isWaypointEditable,
        routeCoordinatesFilter: filterRouteSegmentByRouteSequenceIndex,
        isLoading,
    });

    const waypointsQuery = useGetWaypoints(route.id);

    /**
     * recalculate previous and next route segments if the coordinates changed by dragging
     */
    const changeCoordinateAtIndexDragHandler = (index: number, longitude: number, latitude: number) => {
        const sanitizedLongitude = sanitizeLongitude(longitude);

        setRouteCoordinates((coordinates) => {
            if (!coordinates.features[index - 1] && !coordinates.features[index]) return coordinates;
            const greatCircleCoordinatesCopy = { ...coordinates };

            // skip previous coordinate for first index
            if (index > 0) {
                const previousCoord = extractPreviousCoordinate(index, coordinates.features);
                const newFeaturePrevious = calculateGreatCircleSegment(
                    previousCoord,
                    [sanitizedLongitude, latitude],
                    index
                );
                greatCircleCoordinatesCopy.features[index - 1] = newFeaturePrevious;
            }

            // skip next coordinate for last index
            if (index < coordinates.features.length) {
                const nextCoord = extractNextCoordinate(index, coordinates.features);
                const newFeatureNext = calculateGreatCircleSegment([sanitizedLongitude, latitude], nextCoord, index);
                greatCircleCoordinatesCopy.features[index] = newFeatureNext;
            }

            return greatCircleCoordinatesCopy;
        });
    };

    /**
     * calculate great circle coordinates
     */
    useEffect(() => {
        if (!waypointsQuery.data) return;
        if (!isReady || waypointsQuery.data.length < 2) return;

        setRouteCoordinates(waypointsToFeatureCollection(waypointsQuery.data));
    }, [isReady, waypointsQuery.data]);

    return {
        changeCoordinateAtIndexDragHandler,
    };
};
