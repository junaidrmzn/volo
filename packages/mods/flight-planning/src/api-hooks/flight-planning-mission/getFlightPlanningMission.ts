import { useToast } from "@volocopter/design-library-react";
import type { FlightPlanningMission } from "@voloiq-typescript-api/flight-planning-types";
import { useQuery } from "react-query";
import type { Error, ResponseEnvelope, ServiceParameters } from "@voloiq/service";
import { paramsSerializer, useService } from "@voloiq/service";
import type { ExtractFunctionReturnType } from "../types";

export const useGetFlightPlanningMission = (missionId: string, params?: ServiceParameters) => {
    const { baseUrl, axiosInstance } = useService();
    const toast = useToast();

    const getFlightPlanningMission = async () => {
        const { data } = await axiosInstance.get<ResponseEnvelope<FlightPlanningMission>>(
            `${baseUrl}/flight-planning-missions/${missionId}`,
            {
                params,
                paramsSerializer,
                withCredentials: true,
            }
        );
        return data.data;
    };

    return useQuery<ExtractFunctionReturnType<typeof getFlightPlanningMission>, Error>({
        queryKey: ["flight-planning-missions", { id: missionId }],
        queryFn: () => getFlightPlanningMission(),
        staleTime: 60_000,
        onError: async (error) => {
            toast({
                title: "Error retrieving flight planning mission.",
                description: error.message || "",
                status: "error",
            });
        },
    });
};
