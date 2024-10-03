import { useToast } from "@volocopter/design-library-react";
import type { RouteUpdateFromRouteFollowingEvent } from "@voloiq-typescript-api/flight-planning-types";
import { useMutation, useQueryClient } from "react-query";
import { VoloiqMap } from "@voloiq/map";
import { useParams } from "@voloiq/routing";
import type { AxiosError, Error, ResponseEnvelope } from "@voloiq/service";
import { paramsSerializer, useService } from "@voloiq/service";

export type INTERSECTION_TYPES = "BRANCHOFF" | "JOINONWARDS";

export type IntersectRouteType = {
    event: RouteUpdateFromRouteFollowingEvent;
    type: INTERSECTION_TYPES;
};

export const useIntersectRoutes = (routeId: string | number, map?: VoloiqMap) => {
    const queryClient = useQueryClient();
    const toast = useToast();
    const { axiosInstance, baseUrl } = useService();
    const { routeOptionId } = useParams();

    const intersectRoutes = (routeId: string | number, data: IntersectRouteType): Promise<void> => {
        return axiosInstance.put(
            `${baseUrl}/routes/${routeId}/${data.type === "BRANCHOFF" ? "branch-off" : "join-onwards"}`,
            data.event,
            {
                paramsSerializer,
                withCredentials: true,
            }
        );
    };

    const mutation = useMutation<void, AxiosError<ResponseEnvelope<Error>>, IntersectRouteType>(
        ["intersectRoute"],
        (data: IntersectRouteType) => intersectRoutes(routeId, data),
        {
            onError: (error) => {
                toast({
                    title: "Error intersecting route",
                    description: error.response?.data.error?.message || "",
                    status: "error",
                });
            },
            onSettled: () => {
                if (map) map.takeWaypointsFromRouteRequest = true;
                queryClient.invalidateQueries(["routes", { routeId }]);
                if (routeOptionId) queryClient.invalidateQueries(["routeOptions", { routeOptionId }, "routes"]);
            },
        }
    );

    return {
        intersectRoutes: mutation.mutate,
        intersectRoutesAsync: mutation.mutateAsync,
        isLoading: mutation.isLoading,
        isSuccess: mutation.isSuccess,
        isError: mutation.isError,
        error: mutation.error,
    };
};
