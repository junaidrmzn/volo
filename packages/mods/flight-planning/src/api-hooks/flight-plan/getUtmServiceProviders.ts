import type { UTMServiceProvider } from "@voloiq-typescript-api/flight-planning-types";
import { useQuery } from "react-query";
import type { Error, ResponseEnvelope } from "@voloiq/service";
import { paramsSerializer, useService } from "@voloiq/service";
import type { ExtractFunctionReturnType } from "../types";

export const useGetUtmServiceProviders = () => {
    const { axiosInstance, baseUrl } = useService();

    const getUtmServiceProviders = async () => {
        const { data } = await axiosInstance.get<ResponseEnvelope<UTMServiceProvider[]>>(
            `${baseUrl}/flight-plans/service-providers`,
            {
                paramsSerializer,
                withCredentials: true,
            }
        );
        return data.data || [];
    };

    type QueryFunctionType = typeof getUtmServiceProviders;

    return useQuery<ExtractFunctionReturnType<QueryFunctionType>, Error>({
        queryKey: ["service-providers"],
        queryFn: () => getUtmServiceProviders(),
        staleTime: 60_000,
    });
};
