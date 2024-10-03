import type { FlightPlanInfo } from "@voloiq-typescript-api/flight-planning-types";
import { useQuery } from "react-query";
import type { Error, ResponseEnvelope } from "@voloiq/service";
import { paramsSerializer, useService } from "@voloiq/service";
import type { ExtractFunctionReturnType } from "../types";

export const useGetFlightPlans = () => {
    const { axiosInstance, baseUrl } = useService();

    const getFlightPlans = async () => {
        const { data } = await axiosInstance.get<ResponseEnvelope<FlightPlanInfo[]>>(`${baseUrl}/flight-plans`, {
            paramsSerializer,
            withCredentials: true,
        });
        return data.data || [];
    };

    type QueryFunctionType = typeof getFlightPlans;
    return useQuery<ExtractFunctionReturnType<QueryFunctionType>, Error>({
        queryKey: ["flight-plans"],
        queryFn: () => getFlightPlans(),
        staleTime: 2,
    });
};
