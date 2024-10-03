import type { Marker } from "maplibre-gl";
import { useState } from "react";
import { Route, Waypoint } from "@voloiq/flight-planning-api/v1";
import { useEditWaypointWrapper } from "../../api-hooks";
import { getDistanceFromLatLonInKm } from "../../utils";
import { useDisplayedRoutes } from "../displayed-routes";
import { useSelectedRouteSequenceIndex } from "../selected-route-sequence-index";

export type dragHandlerType = (index: number, longitude: number, latitude: number) => void;

type UseWaypointDragOptions = {
    routeId: number;
    waypointsOnRoute: Waypoint[];
    dragHandler: dragHandlerType;
    onDragEndCallback?: () => void;
};

export const useWaypointDrag = (options: UseWaypointDragOptions) => {
    const { dragHandler, routeId, waypointsOnRoute, onDragEndCallback } = options;

    const [nearestWaypointToSnapTo, setNearestWaypointToSnapTo] = useState<Waypoint>();
    const [snapTargetRoute, setSnapTargetRoute] = useState<Route>();

    const { setSelectedRouteSequenceIndex } = useSelectedRouteSequenceIndex();
    const { editWaypointOnRouteAsync } = useEditWaypointWrapper(routeId);
    const { displayedRoutes } = useDisplayedRoutes();
    /**
     * updates the dragged waypoint to the new position
     * @param routeSequenceIndex
     * @param newLng
     * @param newLat
     * @returns
     */
    const handleDragEnd = async (routeSequenceIndex: number, newLng: number, newLat: number) => {
        const draggedWp = waypointsOnRoute.find((wp) => wp.routeSequenceIndex === routeSequenceIndex);
        if (!draggedWp) return;
        draggedWp.lat = newLat;
        draggedWp.lng = newLng;
        await editWaypointOnRouteAsync({
            ...draggedWp,
        });
        onDragEndCallback?.();
    };

    /**
     * Method to determine the nearest waypoint in km
     * @param waypoint Dragged waypoint
     * @returns boolean true if nearest waypoint found, false if no waypoint found
     */
    const getWaypointToSnapTo = (waypoint?: Waypoint) => {
        if (!waypoint) return false;
        const allWaypointsFromOtherRoutes: Waypoint[] = [];
        for (const dr of displayedRoutes) {
            if (!dr.waypoints) continue;
            if (dr.id !== routeId) allWaypointsFromOtherRoutes.push(...dr.waypoints);
        }
        if (allWaypointsFromOtherRoutes.length === 0) return false;
        const nearWaypoints = allWaypointsFromOtherRoutes.filter(
            (wp) => getDistanceFromLatLonInKm(wp.lat, wp.lng, waypoint.lat, waypoint.lng) < 1
        );
        const nearWaypointsSorted = nearWaypoints.sort(
            (a, b) =>
                getDistanceFromLatLonInKm(a.lat, a.lng, waypoint.lat, waypoint.lng) -
                getDistanceFromLatLonInKm(b.lat, b.lng, waypoint.lat, waypoint.lng)
        );
        const nearest = nearWaypointsSorted[0];

        if (!nearest) return false;

        setNearestWaypointToSnapTo(nearest);
        setSnapTargetRoute(displayedRoutes.find((dr) => dr.waypoints?.includes(nearest)));

        return true;
    };

    /**
     * triggered when dragging has stopped
     * @param marker
     * @param routeSequenceIndex
     */
    const onDragEnd = (marker: Marker, routeSequenceIndex: number) => {
        handleDragEnd(routeSequenceIndex, marker.getLngLat().lng, marker.getLngLat().lat);
    };

    /**
     * triggered while dragging.
     * updates the live view of the routes connected to the dragged waypoint
     * @param marker
     * @param routeSequenceIndex
     * @returns
     */
    const onDrag = (marker: Marker, routeSequenceIndex: number) => {
        const wpMarker = waypointsOnRoute.find((wp) => wp.routeSequenceIndex === routeSequenceIndex);

        if (!wpMarker) return;

        wpMarker.lat = marker.getLngLat().lat;
        wpMarker.lng = marker.getLngLat().lng;

        // move to new position
        dragHandler(wpMarker.routeSequenceIndex, marker.getLngLat().lng, marker.getLngLat().lat);
    };

    const onDragStart = (routeSequenceIndex: number) => {
        setSelectedRouteSequenceIndex(routeSequenceIndex);
    };

    return {
        onDragEnd,
        onDrag,
        onDragStart,
        nearestWaypointToSnapTo,
        setNearestWaypointToSnapTo,
        setSnapTargetRoute,
        snapTargetRoute,
        getWaypointToSnapTo,
        handleDragEnd,
    };
};
