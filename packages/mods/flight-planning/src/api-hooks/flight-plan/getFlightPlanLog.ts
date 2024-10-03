import type { FlightPlanLogInfo } from "@voloiq-typescript-api/flight-planning-types";
import { useQuery } from "react-query";
import type { Error, ResponseEnvelope } from "@voloiq/service";
import { paramsSerializer, useService } from "@voloiq/service";
import type { ExtractFunctionReturnType } from "../types";

export const useGetFlightPlanLog = (flightPlanId: number) => {
    const { axiosInstance, baseUrl } = useService();

    const getFlightPlanLog = async (flightPlanId: number) => {
        const { data } = await axiosInstance.get<ResponseEnvelope<FlightPlanLogInfo[]>>(
            `${baseUrl}/flight-plans/${flightPlanId}/flight-plan-log`,
            {
                paramsSerializer,
                withCredentials: true,
            }
        );
        return data.data;
    };

    type QueryFunctionType = typeof getFlightPlanLog;
    return useQuery<ExtractFunctionReturnType<QueryFunctionType>, Error>({
        queryKey: ["flight-plans", { flightPlanId }, "logs"],
        queryFn: () => getFlightPlanLog(flightPlanId),
        staleTime: 60_000,
    });
};
