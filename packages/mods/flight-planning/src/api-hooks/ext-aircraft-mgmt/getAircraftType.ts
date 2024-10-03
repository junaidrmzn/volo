import type { AircraftType } from "@voloiq-typescript-api/aircraft-management-types";
import { useQuery, useQueryClient } from "react-query";
import type { ExternalAircraftType } from "@voloiq/flight-planning-api/v1";
import { paramsSerializer, useService } from "@voloiq/service";
import type { Error, ResponseEnvelope } from "@voloiq/service";
import type { ExtractFunctionReturnType } from "../types";

type UseGetAircraftTypeOptions = {
    routeOptionId: string | number;
    aircraftTypeId?: string;
    enabled: boolean;
};
export const useGetAircraftType = (options: UseGetAircraftTypeOptions) => {
    const { routeOptionId, aircraftTypeId, enabled = true } = options;
    const { baseUrl, axiosInstance } = useService();
    const queryClient = useQueryClient();

    const getExternalAircraftType = async () => {
        const { data } = await axiosInstance.get<ResponseEnvelope<ExternalAircraftType[] | AircraftType[]>>(
            `${baseUrl}/external/aircraft-types`,
            {
                paramsSerializer,
                withCredentials: true,
                params: { aircraftTypeId },
            }
        );

        return data.data && data.data.shift();
    };

    type QueryFunctionType = typeof getExternalAircraftType;
    return useQuery<ExtractFunctionReturnType<QueryFunctionType>, Error>({
        queryKey: ["aircraft-type", { aircraftTypeId }],
        queryFn: () => getExternalAircraftType(),
        enabled,
        onSettled: () => queryClient.invalidateQueries(["route-options", { routeOptionId }]),
        staleTime: 120_000,
    });
};
