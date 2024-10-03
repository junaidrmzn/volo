import { useToast } from "@volocopter/design-library-react";
import { useMutation, useQueryClient } from "react-query";
import { Waypoint, WaypointUpdate } from "@voloiq/flight-planning-api/v1";
import type { AxiosError, Error, ResponseEnvelope } from "@voloiq/service";
import { paramsSerializer, useService } from "@voloiq/service";
import { sortWaypointsOnRouteByRouteSequenceIndex } from "../../../../../src/utils";

type WaypointResponseType = { data?: Waypoint } & Waypoint;

export const useEditWaypoint = (routeId: number | string, onSuccessfulEdit?: () => void) => {
    const queryClient = useQueryClient();
    const queryKey = ["routes", { routeId }, "waypoints"];
    const toast = useToast();
    const { axiosInstance, baseUrl } = useService();

    const editWaypoint = (
        routeId: string | number,
        waypointOnRoute: Partial<Waypoint>
    ): Promise<ResponseEnvelope<WaypointResponseType>> => {
        return axiosInstance.put(
            `${baseUrl}/routes/${routeId}/waypoints/${waypointOnRoute.id}`,
            // TODO: await backend fix for sending fields which are recalculated anyway.
            { ...waypointOnRoute },
            {
                paramsSerializer,
                withCredentials: true,
            }
        );
    };

    const mutation = useMutation<
        ResponseEnvelope<Partial<WaypointResponseType>>,
        AxiosError<ResponseEnvelope<Error>>,
        WaypointUpdate,
        WaypointUpdate[]
    >(
        ["editWaypointOnRoute"],
        (updatedWaypointOnRoute: Partial<WaypointUpdate>) => editWaypoint(routeId, updatedWaypointOnRoute),
        {
            onMutate: async (updatedWaypointOnRoute: WaypointUpdate) => {
                // optimistic update
                await queryClient.cancelQueries("routes");
                const previousWaypointOnRoutes = queryClient.getQueryData<Waypoint[]>(queryKey);

                if (previousWaypointOnRoutes) {
                    const newWaypointOnRouteData = [
                        ...previousWaypointOnRoutes?.filter(
                            (waypointOnRoute) => waypointOnRoute.id !== updatedWaypointOnRoute.id
                        ),
                        updatedWaypointOnRoute,
                    ];
                    newWaypointOnRouteData.sort(sortWaypointsOnRouteByRouteSequenceIndex);
                    queryClient.setQueryData<WaypointUpdate[]>(queryKey, [...newWaypointOnRouteData]);
                }
                return previousWaypointOnRoutes;
            },
            onError: (error, __, context) => {
                toast({
                    title: "Error updating waypoint",
                    description: error.response?.data.error?.message || "",
                    status: "error",
                });

                if (context) {
                    queryClient.setQueryData<WaypointUpdate[]>(queryKey, context);
                }
            },
            onSuccess: onSuccessfulEdit,
        }
    );

    return {
        editWaypointOnRoute: mutation.mutate,
        editWaypointOnRouteAsync: mutation.mutateAsync,
        isLoading: mutation.isLoading,
        isSuccess: mutation.isSuccess,
        isError: mutation.isError,
        error: mutation.error,
        data: mutation.data,
    };
};
