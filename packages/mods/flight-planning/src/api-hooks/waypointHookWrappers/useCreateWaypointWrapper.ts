import { useEffect } from "react";
import { useQueryClient } from "react-query";
import { useCreateWaypoint } from "@voloiq/flight-planning-api/v1";
import { VoloiqMap, removeTemporaryWaypoint, updateMapOnSuccessfulEdit, updateSelectedWaypoint } from "@voloiq/map";
import { useParams } from "@voloiq/routing";

export const useCreateWayointWrapper = (routeId: number | string, mapObject?: VoloiqMap) => {
    const { data, isLoading, createWaypointAsync, isError, isSuccess } = useCreateWaypoint(routeId);
    const { routeOptionId } = useParams();
    const queryClient = useQueryClient();

    useEffect(() => {
        if (mapObject && isError) {
            mapObject.takeWaypointsFromRouteRequest = true;
            mapObject.isAddingWaypoint = false;
            queryClient.invalidateQueries(["routes", { routeId }]);
            if (routeOptionId) queryClient.invalidateQueries(["routeOptions", { routeOptionId }, "routes"]);
        }
        if (mapObject && isSuccess) {
            if (data?.data) {
                const waypoint = data.data.data ?? data.data;
                mapObject.newestWaypointIdOnRoute = waypoint.id;
                removeTemporaryWaypoint(waypoint, mapObject);
                mapObject.selectedWaypointId = waypoint.id;
                updateSelectedWaypoint(
                    mapObject,
                    { coordinates: [waypoint.lng, waypoint.lat], properties: waypoint },
                    true
                );
            }
            mapObject.isAddingWaypoint = false;
            updateMapOnSuccessfulEdit(mapObject);
            mapObject.isAddingWaypoint = false;
            queryClient.invalidateQueries(["routes", { routeId }]);
        }
    }, [isError, mapObject, isSuccess]);
    return { isLoading, createWaypointAsync };
};
