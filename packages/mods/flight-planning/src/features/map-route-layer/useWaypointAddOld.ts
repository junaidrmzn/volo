import { Waypoint, WaypointCreate, WaypointTransition } from "@voloiq/flight-planning-api/v1";
import { useMapLayerEvent } from "@voloiq/map";
import { ResponseEnvelope } from "@voloiq/service";
import { useFlightPlanningTranslation } from "../../translations";
import type { GeoJsonRouteFeature } from "./types";

type UseWaypointAddOptions = {
    layerId: string;
    createWaypointAsync: (waypoint: WaypointCreate) => Promise<ResponseEnvelope<Waypoint>>;
    isLoading: boolean;
    waypoints: Waypoint[];
    onSuccessfulAdd?: () => unknown;
    isWaypointAddable: boolean;
};

export const useWaypointAddOld = (options: UseWaypointAddOptions) => {
    const { createWaypointAsync, isLoading, layerId, waypoints, onSuccessfulAdd, isWaypointAddable } = options;
    const { t } = useFlightPlanningTranslation();

    /**
     * add waypoints on click on route segment
     */
    useMapLayerEvent("click", `${layerId}-layer`, async (event) => {
        if (!event.features || !event.features[0] || !waypoints || !isWaypointAddable || isLoading) return;

        const feature: GeoJsonRouteFeature = event.features[0];
        const { routeSequenceIndex = 0 } = feature.properties;
        const previousWaypoint = waypoints[routeSequenceIndex - 1];

        // add waypoint between prev and next
        // create new waypoint
        const addedWaypoint: WaypointCreate = {
            name: t("flight.waypointAttributes.Unnamed"),
            lat: event.lngLat.lat,
            lng: event.lngLat.lng,
            routeSequenceIndex,
            alt: previousWaypoint ? (previousWaypoint?.alt === 0 ? 150 : previousWaypoint?.alt) : 0,
            speed: previousWaypoint ? previousWaypoint?.speed : 0,
            rnp: previousWaypoint && previousWaypoint.rnp ? previousWaypoint.rnp : 0,
            transitionType: WaypointTransition.flyBy,
            transitionRadius: 100,
        };
        await createWaypointAsync(addedWaypoint);
        onSuccessfulAdd?.();
    });
};
