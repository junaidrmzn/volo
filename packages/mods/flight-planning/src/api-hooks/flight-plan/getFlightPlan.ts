import type { FlightPlanInfo } from "@voloiq-typescript-api/flight-planning-types";
import { useQuery } from "react-query";
import type { Error, ResponseEnvelope } from "@voloiq/service";
import { paramsSerializer, useService } from "@voloiq/service";
import type { ExtractFunctionReturnType } from "../types";

export const useGetFlightPlan = (flightPlanId: number) => {
    const { axiosInstance, baseUrl } = useService();

    const getFlightPlan = async (flightPlanId: number) => {
        const { data } = await axiosInstance.get<ResponseEnvelope<FlightPlanInfo>>(
            `${baseUrl}/flight-plans/${flightPlanId}`,
            {
                paramsSerializer,
                withCredentials: true,
            }
        );
        return data.data;
    };

    type QueryFunctionType = typeof getFlightPlan;

    return useQuery<ExtractFunctionReturnType<QueryFunctionType>, Error>({
        queryKey: ["flight-plans", { flightPlanId }],
        queryFn: () => getFlightPlan(flightPlanId),
        staleTime: 60_000,
    });
};
