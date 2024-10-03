import type { FlightPlanInfo } from "@voloiq-typescript-api/flight-planning-types";
import { useQuery } from "react-query";
import type { Error, ResponseEnvelope } from "@voloiq/service";
import { paramsSerializer, useService } from "@voloiq/service";
import type { ExtractFunctionReturnType } from "../types";

export const useGetFlightPlanByExternalId = (flightPlanExternalId: string) => {
    const { axiosInstance, baseUrl } = useService();
    const getFlightPlanByExternalId = async (flightPlanExternalId: string) => {
        const { data } = await axiosInstance.get<ResponseEnvelope<FlightPlanInfo[]>>(
            `${baseUrl}/flight-plans?externalId=${flightPlanExternalId}`,
            {
                paramsSerializer,
                withCredentials: true,
            }
        );
        return data.data && data.data.length > 0 ? data.data[0] : undefined;
    };

    type QueryFunctionType = typeof getFlightPlanByExternalId;

    return useQuery<ExtractFunctionReturnType<QueryFunctionType>, Error>({
        queryKey: ["flight-plans", { flightPlanExternalId }],
        queryFn: () => getFlightPlanByExternalId(flightPlanExternalId),
        staleTime: 60_000,
    });
};
