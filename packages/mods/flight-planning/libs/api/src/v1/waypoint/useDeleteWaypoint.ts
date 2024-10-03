import { useToast } from "@volocopter/design-library-react";
import { useMutation, useQueryClient } from "react-query";
import { Waypoint } from "@voloiq/flight-planning-api/v1";
import type { AxiosError, Error, ResponseEnvelope } from "@voloiq/service";
import { paramsSerializer, useService } from "@voloiq/service";

export const useDeleteWaypoint = (routeId: number | string, onSuccessfulDelete?: () => void) => {
    const queryClient = useQueryClient();
    const queryKey = ["routes", { routeId }, "waypoints"];
    const toast = useToast();
    const { axiosInstance, baseUrl } = useService();

    const deleteWaypoint = (waypointId: number): Promise<ResponseEnvelope<Waypoint>> => {
        return axiosInstance.delete(`${baseUrl}/routes/${routeId}/waypoints/${waypointId}`, {
            paramsSerializer,
            withCredentials: true,
        });
    };

    const mutation = useMutation<ResponseEnvelope<Waypoint>, AxiosError<ResponseEnvelope<Error>>, number, Waypoint[]>(
        ["deleteWaypointOnRoute"],
        (waypointId: number) => deleteWaypoint(waypointId),
        {
            onMutate: async (waypointId: number) => {
                // optimistic update
                await queryClient.cancelQueries("routes");

                const previousWaypoints = queryClient.getQueryData<Waypoint[]>(queryKey);

                if (previousWaypoints) {
                    queryClient.setQueryData<Waypoint[]>(queryKey, [
                        ...previousWaypoints?.filter((waypoint) => waypoint.id !== waypointId),
                    ]);
                }
                return previousWaypoints;
            },
            onError: (error, __, context) => {
                toast({
                    title: "Error deleting waypoint",
                    description: error.response?.data.error?.message || "",
                    status: "error",
                });

                if (context) {
                    queryClient.setQueryData<Waypoint[]>(queryKey, context);
                }
            },
            onSuccess: onSuccessfulDelete,
        }
    );

    return {
        deleteWaypointOnRoute: mutation.mutate,
        deleteWaypointOnRouteAsync: mutation.mutateAsync,
        isLoading: mutation.isLoading,
        isSuccess: mutation.isSuccess,
        isError: mutation.isError,
        error: mutation.error,
    };
};
