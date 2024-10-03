import { useQuery } from "react-query";
import type { Error, ResponseEnvelope } from "@voloiq/service";
import { paramsSerializer, useService } from "@voloiq/service";
import { RouteTemplate } from "./models";

export const useGetRouteTemplates = (enabled: boolean = true, params?: Record<string, string | number>) => {
    const { axiosInstance, baseUrl } = useService();

    const getRouteTemplates = async (params?: Record<string, string | number>) => {
        const { data } = await axiosInstance.get<ResponseEnvelope<RouteTemplate[]>>(`${baseUrl}/route-templates`, {
            params,
            paramsSerializer,
            withCredentials: true,
        });
        return data.data || [];
    };

    return useQuery<Awaited<ReturnType<typeof getRouteTemplates>>, Error>({
        enabled,
        queryKey: ["route-templates", { ...params }],
        queryFn: () => getRouteTemplates(params),
        staleTime: 60_000,
    });
};
