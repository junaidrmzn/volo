import { useQuery } from "react-query";
import type { Error, ResponseEnvelope } from "@voloiq/service";
import { paramsSerializer, useService } from "@voloiq/service";
import { ExtractFunctionReturnType } from "../../extractFunctionReturnType";
import { RouteTemplate } from "./models";

export const useGetRouteTemplate = (routeTemplateId: string | number, withWaypoints?: boolean) => {
    const { axiosInstance, baseUrl } = useService();

    const getRouteTemplate = async (routeTemplateId: string | number, withWaypoints?: boolean) => {
        const { data } = await axiosInstance.get<ResponseEnvelope<RouteTemplate>>(
            `${baseUrl}/route-templates/${routeTemplateId}${withWaypoints ? "?withWaypoints=true" : ""}`,
            {
                paramsSerializer,
                withCredentials: true,
            }
        );
        return data.data;
    };

    type QueryFunctionType = typeof getRouteTemplate;

    return useQuery<ExtractFunctionReturnType<QueryFunctionType>, Error>({
        queryKey: ["route-templates", routeTemplateId],
        queryFn: () => getRouteTemplate(routeTemplateId, withWaypoints),
        staleTime: 60_000,
    });
};
