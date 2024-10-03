import { useQuery, useQueryClient } from "react-query";
import { Route } from "@voloiq/flight-planning-api/v1";
import type { Error, ResponseEnvelope } from "@voloiq/service";
import { paramsSerializer, useService } from "@voloiq/service";
import { sortWaypointsOnRouteByRouteSequenceIndex } from "../../utils";
import type { ExtractFunctionReturnType } from "../types";

export const useGetRoutes = (
    routeOptionId?: string | number,
    withWaypoints: boolean = false,
    isEnabled: boolean = false
) => {
    const queryClient = useQueryClient();
    const queryKey = ["routeOptions", { routeOptionId }, "routes"];
    const { axiosInstance, baseUrl } = useService();

    const getRoutes = async () => {
        const url = `${baseUrl}/route-options/${routeOptionId}/routes${withWaypoints ? "?withWaypoints=true" : ""}`;
        const { data } = await axiosInstance.get<ResponseEnvelope<Route[]>>(url, {
            paramsSerializer,
            withCredentials: true,
        });
        return data.data || [];
    };

    const query = useQuery<ExtractFunctionReturnType<typeof getRoutes>, Error>({
        enabled: isEnabled,
        queryKey,
        queryFn: () => getRoutes(),
        staleTime: 60_000,
        onSuccess: (data) => {
            if (!data || !withWaypoints) return;
            // eslint-disable-next-line unicorn/no-array-for-each
            data.forEach((route) => {
                if (route.id > 0) {
                    queryClient.setQueryData(
                        ["routes", { routeId: route.id }, "waypoints"],
                        route.waypoints &&
                            route.waypoints.sort((a, b) => sortWaypointsOnRouteByRouteSequenceIndex(a, b))
                    );
                }
            });
        },
    });

    return {
        ...query,
        invalidate: () => queryClient.invalidateQueries(queryKey),
    };
};
