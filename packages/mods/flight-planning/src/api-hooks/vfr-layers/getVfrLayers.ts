import { useQuery } from "react-query";
import type { Error, ResponseEnvelope } from "@voloiq/service";
import { paramsSerializer, useService } from "@voloiq/service";
import type { VfrLayer } from "../../features/vfr-list/types";
import type { ExtractFunctionReturnType } from "../types";

export const useGetVfrLayers = () => {
    const { axiosInstance } = useService();

    type QueryFunctionType = typeof getVfrLayers;

    const getVfrLayers = async () => {
        const { data } = await axiosInstance.get<ResponseEnvelope<VfrLayer[]>>(
            `${BACKEND_BASE_URL}/v1/flight-planning-tiles/tiles`,
            {
                paramsSerializer,
                withCredentials: true,
            }
        );
        return data.data;
    };

    return useQuery<ExtractFunctionReturnType<QueryFunctionType>, Error>({
        queryKey: ["vfrLayer"],
        queryFn: () => getVfrLayers(),
    });
};
