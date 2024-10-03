import { useQuery, useQueryClient } from "react-query";
import { Route } from "@voloiq/flight-planning-api/v1";
import type { Error, ResponseEnvelope } from "@voloiq/service";
import { paramsSerializer, useService } from "@voloiq/service";
import { sortWaypointsOnRouteByRouteSequenceIndex } from "../../utils/sortWaypointsOnRouteByRouteSequenceIndex";
import type { ExtractFunctionReturnType } from "../types";

export const useGetRoute = (routeId: string | number, withWaypoints: boolean = false) => {
    const queryClient = useQueryClient();
    const { axiosInstance, baseUrl } = useService();
    const getRoute = async (routeId: string | number, withWaypoints: boolean) => {
        const { data } = await axiosInstance.get<ResponseEnvelope<Route>>(
            `${baseUrl}/routes/${routeId}${withWaypoints ? "?withWaypoints=true" : ""}`,
            {
                paramsSerializer,
                withCredentials: true,
            }
        );
        return data.data;
    };

    type QueryFunctionType = typeof getRoute;

    return useQuery<ExtractFunctionReturnType<QueryFunctionType>, Error>({
        queryKey: ["routes", { routeId }],
        queryFn: () => getRoute(routeId, withWaypoints),
        staleTime: 60_000,
        onSuccess: (data) => {
            if (!data || !withWaypoints) return;

            queryClient.setQueryData(
                ["routes", { routeId }, "waypoints"],
                data.waypoints && data.waypoints.sort((a, b) => sortWaypointsOnRouteByRouteSequenceIndex(a, b))
            );
        },
    });
};
