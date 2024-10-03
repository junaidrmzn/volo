import { useToast } from "@volocopter/design-library-react";
import { useMutation, useQueryClient } from "react-query";
import type { AxiosError, Error, ResponseEnvelope } from "@voloiq/service";
import { paramsSerializer, useService } from "@voloiq/service";
import { sortWaypointsOnRouteByRouteSequenceIndex } from "../../../../../src/utils";
import { Waypoint, WaypointCreate } from "./models";

type WaypointResponseType = { data?: Waypoint } & Waypoint;

export const useCreateWaypoint = (routeId: number | string) => {
    const queryClient = useQueryClient();
    const queryKey = ["routes", { routeId }, "waypoints"];
    const toast = useToast();
    const { axiosInstance, baseUrl } = useService();
    const createWaypoint = (
        routeId: number | string,
        waypoint: WaypointCreate
    ): Promise<ResponseEnvelope<WaypointResponseType>> => {
        return axiosInstance.post(`${baseUrl}/routes/${routeId}/waypoints`, waypoint, {
            paramsSerializer,
            withCredentials: true,
        });
    };

    const mutation = useMutation<
        ResponseEnvelope<WaypointResponseType>,
        AxiosError<ResponseEnvelope<Error>>,
        WaypointCreate,
        Waypoint[]
    >(["createWaypoint"], (newWaypoint: WaypointCreate) => createWaypoint(routeId, newWaypoint), {
        onMutate: async (newWaypoint: WaypointCreate) => {
            // optimistic update
            await queryClient.cancelQueries("routes");

            const previousWaypoints = queryClient.getQueryData<Waypoint[]>(queryKey);

            if (previousWaypoints) {
                previousWaypoints
                    .filter((waypoint) => waypoint.routeSequenceIndex >= newWaypoint.routeSequenceIndex)
                    .map((waypoint) => ({ ...waypoint, routeSequenceIndex: waypoint.routeSequenceIndex + 1 }));
                previousWaypoints.push({
                    ...newWaypoint,
                    id: 0,
                    heading: 0,
                    targetTimeOver: 0,
                    altAboveRefAlt: newWaypoint.alt,
                });
                previousWaypoints.sort(sortWaypointsOnRouteByRouteSequenceIndex);
                queryClient.setQueryData<Waypoint[]>(queryKey, [...previousWaypoints]);
            }
            return previousWaypoints;
        },
        onError: (error, __, context) => {
            toast({
                title: "Error creating waypoint",
                description: error.response?.data.error?.message || "",
                status: "error",
            });

            if (context) {
                queryClient.setQueryData<Waypoint[]>(queryKey, context);
            }
        },
    });

    return {
        createWaypoint: mutation.mutate,
        createWaypointAsync: mutation.mutateAsync,
        isLoading: mutation.isLoading,
        isSuccess: mutation.isSuccess,
        isError: mutation.isError,
        error: mutation.error,
        data: mutation.data,
    };
};
