import type { Alert } from "@voloiq-typescript-api/flight-planning-types";
import { useQuery } from "react-query";
import type { Error, ResponseEnvelope } from "@voloiq/service";
import { paramsSerializer, useService } from "@voloiq/service";
import type { ExtractFunctionReturnType } from "../types";

export const useGetAlertsByRouteId = (routeId: string | number) => {
    const { axiosInstance, baseUrl } = useService();

    const getAlertsByRouteId = async (routeId: string | number) => {
        const { data } = await axiosInstance.get<ResponseEnvelope<Alert[]>>(`${baseUrl}/routes/${routeId}/alerts`, {
            paramsSerializer,
            withCredentials: true,
        });
        return data.data;
    };

    type QueryFunctionType = typeof getAlertsByRouteId;

    return useQuery<ExtractFunctionReturnType<QueryFunctionType>, Error>({
        queryKey: ["alerts", { routeId }],
        queryFn: () => getAlertsByRouteId(routeId),
    });
};
