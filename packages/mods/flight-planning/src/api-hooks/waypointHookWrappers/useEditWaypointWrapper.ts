import { useEffect } from "react";
import { useQueryClient } from "react-query";
import { Waypoint, useEditWaypoint } from "@voloiq/flight-planning-api/v1";
import { VoloiqMap, updateMapOnSuccessfulEdit } from "@voloiq/map";
import { useParams } from "@voloiq/routing";

export const useEditWaypointWrapper = (
    routeId: number | string,
    mapObject?: VoloiqMap,
    onSuccessfulEdit?: () => void
) => {
    const { data, isLoading, editWaypointOnRouteAsync, editWaypointOnRoute, isError, isSuccess } = useEditWaypoint(
        routeId,
        onSuccessfulEdit
    );
    const { routeOptionId } = useParams();
    const queryClient = useQueryClient();

    useEffect(() => {
        if (mapObject && isError) {
            mapObject.takeWaypointsFromRouteRequest = true;
            queryClient.invalidateQueries(["routes", { routeId }]);
            if (routeOptionId) queryClient.invalidateQueries(["routeOptions", { routeOptionId }, "routes"]);
        }
        if (mapObject && isSuccess) {
            const waypointData = (data?.data?.data ?? data?.data) as Waypoint;
            updateMapOnSuccessfulEdit(mapObject, waypointData, true);
        }
    }, [isError, mapObject, isSuccess]);

    return { isLoading, editWaypointOnRouteAsync, editWaypointOnRoute };
};
