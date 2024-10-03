import type { ResponseEnvelope, ServiceParameters } from "@voloiq/service";
import { paramsSerializer, useService } from "@voloiq/service";
import type { RouteOptionResource } from "../../resource-overview/types";

export const useGetRouteOption = () => {
    const { axiosInstance, baseUrl } = useService();
    const getRouteOption = async (routeOptionId: string, params?: ServiceParameters) => {
        const { data } = await axiosInstance.get<ResponseEnvelope<RouteOptionResource>>(
            `${baseUrl}/route-options/${routeOptionId}`,
            {
                params,
                paramsSerializer,
                withCredentials: true,
            }
        );
        return data;
    };
    return { getRouteOption };
};
