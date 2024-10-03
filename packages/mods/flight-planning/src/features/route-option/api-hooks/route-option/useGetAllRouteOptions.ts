import type { FetchAllResourceOptions } from "@voloiq/resource-overview";
import type { ResponseEnvelope } from "@voloiq/service";
import { paramsSerializer, serializeFilters, useService } from "@voloiq/service";
import type { RouteOptionResource } from "../../resource-overview/types";

export const useGetAllRouteOptions = () => {
    const { axiosInstance, baseUrl } = useService();
    const getAllRouteOptions = async (options: FetchAllResourceOptions<RouteOptionResource>) => {
        const { size, page, filterSet, sortingConfiguration } = options;
        const filters = filterSet ? serializeFilters(filterSet) : undefined;
        const params = {
            size,
            page,
            filters,
            orderBy: sortingConfiguration
                ? `${sortingConfiguration.selectedOption}:${sortingConfiguration.selectedOrder}`
                : "date:DESC",
        };
        const { data } = await axiosInstance.get<ResponseEnvelope<RouteOptionResource[]>>(`${baseUrl}/route-options`, {
            params,
            paramsSerializer,
            withCredentials: true,
        });
        return data || [];
    };
    return { getAllRouteOptions };
};
