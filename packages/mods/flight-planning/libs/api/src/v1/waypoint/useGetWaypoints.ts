import { useQuery } from "react-query";
import { Waypoint } from "@voloiq/flight-planning-api/v1";
import type { Error, ResponseEnvelope } from "@voloiq/service";
import { isSizeBasedPagination, paramsSerializer, useService } from "@voloiq/service";
import type { ExtractFunctionReturnType } from "../../extractFunctionReturnType";

type WaypointsQueryParams = { page: 1; size: number };
const defaultParams: WaypointsQueryParams = { page: 1, size: 100 };

export const useGetWaypoints = (routeId: string | number, params: WaypointsQueryParams = defaultParams) => {
    const { baseUrl, axiosInstance } = useService();

    const getWaypointsOnRoute = async (routeId: string | number, params?: WaypointsQueryParams) => {
        const { data } = await axiosInstance.get<ResponseEnvelope<Waypoint[]>>(
            `${baseUrl}/routes/${routeId}/waypoints`,
            { paramsSerializer, withCredentials: true, params }
        );
        if (
            data.data &&
            data.pagination &&
            isSizeBasedPagination(data.pagination) &&
            data.pagination.totalPages &&
            data.pagination.totalPages > 1
        ) {
            const allData = data.data;
            const allPromises = [];
            for (let index = 2; index <= data.pagination.totalPages; index++) {
                allPromises.push(
                    axiosInstance.get<ResponseEnvelope<Waypoint[]>>(`/routes/${routeId}/waypoints`, {
                        paramsSerializer,
                        withCredentials: true,
                        params: { ...params, page: index },
                    })
                );
            }
            const allNewData = await Promise.all(allPromises);
            for (const response of allNewData) allData.push(...(response.data.data || []));
            return allData;
        }
        return data.data || [];
    };

    type QueryFunctionType = typeof getWaypointsOnRoute;

    return useQuery<ExtractFunctionReturnType<QueryFunctionType>, Error>({
        queryKey: ["routes", { routeId }, "waypoints"],
        queryFn: () => getWaypointsOnRoute(routeId, params),
        staleTime: 60_000,
    });
};
