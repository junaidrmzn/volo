import { useQuery, useQueryClient } from "react-query";
import type { RouteOption } from "@voloiq/flight-planning-api/v1";
import type { Error, ResponseEnvelope, ServiceParameters } from "@voloiq/service";
import { paramsSerializer, useService } from "@voloiq/service";
import type { ExtractFunctionReturnType } from "../types";

export const useGetRouteOptions = (params?: ServiceParameters) => {
    const queryClient = useQueryClient();
    const { baseUrl, axiosInstance } = useService();
    const queryKey = "route-options";

    const getRouteOptions = async () => {
        const { data } = await axiosInstance.get<ResponseEnvelope<RouteOption[]>>(`${baseUrl}/route-options`, {
            params,
            paramsSerializer,
            withCredentials: true,
        });
        return data || [];
    };

    return useQuery<ExtractFunctionReturnType<typeof getRouteOptions>, Error>({
        queryKey: [queryKey, params],
        queryFn: () => getRouteOptions(),
        onSuccess: (data) => {
            // prefill data for detail views of route-options in react query cache
            if (!data.data) return;
            for (const routeOption of data.data)
                queryClient.setQueryData([queryKey, { id: routeOption.id }], routeOption);
        },
    });
};
