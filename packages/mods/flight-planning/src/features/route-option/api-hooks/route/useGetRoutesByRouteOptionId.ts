import type { Route } from "@voloiq-typescript-api/flight-planning-types/dist";
import type { ResponseEnvelope } from "@voloiq/service";
import { paramsSerializer, useService } from "@voloiq/service";

export const useGetRoutesByRouteOptionId = () => {
    const { baseUrl, axiosInstance } = useService();
    const getRoutesByRouteOptionId = async (routeOptionId: string) => {
        const url = `${baseUrl}/route-options/${routeOptionId}/routes?withWaypoints=true`;
        const { data } = await axiosInstance.get<ResponseEnvelope<Route[]>>(url, {
            paramsSerializer,
            withCredentials: true,
        });
        return data.data || [];
    };
    return { getRoutesByRouteOptionId };
};
