import { useEffect } from "react";
import { useQueryClient } from "react-query";
import { useDeleteWaypoint } from "@voloiq/flight-planning-api/v1";
import { VoloiqMap, updateMapOnSuccessfulEdit } from "@voloiq/map";
import { useParams } from "@voloiq/routing";
import { useFlightStatusContext } from "../../contexts/flight-status";

export const useDeleteWaypointWrapper = (
    routeId: number | string,
    mapObject?: VoloiqMap,
    onSuccessfulDelete?: () => void
) => {
    const { isLoading, deleteWaypointOnRoute, isError, isSuccess } = useDeleteWaypoint(routeId, onSuccessfulDelete);
    const { routeOptionId } = useParams();
    const queryClient = useQueryClient();
    const { setFlightStatus } = useFlightStatusContext();

    useEffect(() => {
        if (mapObject && isError) {
            mapObject.takeWaypointsFromRouteRequest = true;
            queryClient.invalidateQueries(["routes", { routeId }]);
            if (routeOptionId) queryClient.invalidateQueries(["routeOptions", { routeOptionId }, "routes"]);
        }
        if (mapObject && isSuccess) {
            mapObject.takeWaypointsFromRouteRequest = true;
            queryClient.invalidateQueries(["routes", { routeId }]);
            updateMapOnSuccessfulEdit(mapObject);
            setFlightStatus?.({
                validationStatus: "not_yet_validated",
            });
        }
    }, [isError, mapObject, isSuccess]);

    return { isLoading, deleteWaypointOnRoute };
};
