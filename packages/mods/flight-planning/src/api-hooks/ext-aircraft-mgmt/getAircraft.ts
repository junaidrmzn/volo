import { useQuery } from "react-query";
import type { ExternalAircraft } from "@voloiq/flight-planning-api/v1";
import type { Error, ResponseEnvelope } from "@voloiq/service";
import { paramsSerializer, useService } from "@voloiq/service";
import type { ExtractFunctionReturnType } from "../types";

export const useGetAllAircraft = () => {
    const { axiosInstance, baseUrl } = useService();

    const getAllExternalAircraft = async () => {
        const { data } = await axiosInstance.get<ResponseEnvelope<ExternalAircraft[]>>(`${baseUrl}/external/aircraft`, {
            paramsSerializer,
            withCredentials: true,
        });
        return data.data || [];
    };

    type QueryFunctionType = typeof getAllExternalAircraft;

    return useQuery<ExtractFunctionReturnType<QueryFunctionType>, Error>({
        queryKey: ["aircraft"],
        queryFn: () => getAllExternalAircraft(),
        staleTime: 120_000,
    });
};
