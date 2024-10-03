import { useToast } from "@volocopter/design-library-react";
import type { FlightPlanningMission } from "@voloiq-typescript-api/flight-planning-types";
import { useMutation, useQueryClient } from "react-query";
import type { AxiosError, Error, ResponseEnvelope } from "@voloiq/service";
import { paramsSerializer, useService } from "@voloiq/service";

export const useEditFlightPlanningMission = () => {
    const { baseUrl, axiosInstance } = useService();
    const queryClient = useQueryClient();
    const toast = useToast();

    const editFlightPlanningMission = async (
        mission: FlightPlanningMission
    ): Promise<ResponseEnvelope<FlightPlanningMission>> => {
        const { data } = await axiosInstance.put(`${baseUrl}/flight-planning-missions/${mission.id}`, mission, {
            paramsSerializer,
            withCredentials: true,
        });
        return data.data;
    };

    const mutation = useMutation<
        ResponseEnvelope<FlightPlanningMission>,
        AxiosError<ResponseEnvelope<Error>>,
        FlightPlanningMission,
        FlightPlanningMission[]
    >(["editMission"], (updatedMission: FlightPlanningMission) => editFlightPlanningMission(updatedMission), {
        onMutate: async (updatedMission: FlightPlanningMission) => {
            // optimistic update
            await queryClient.cancelQueries("flight-planning-missions");
            const previousMissions = queryClient.getQueryData<FlightPlanningMission[]>("flight-planning-missions");

            if (previousMissions) {
                queryClient.setQueryData<FlightPlanningMission[]>("flight-planning-missions", [
                    ...previousMissions?.filter((mission) => mission.id !== updatedMission.id),
                    updatedMission,
                ]);
            }
            return previousMissions;
        },
        onError: (error, __, context) => {
            toast({
                title: "Error updating mission",
                description: error.response?.data.error?.message || "",
                status: "error",
            });

            if (context) {
                queryClient.setQueryData<FlightPlanningMission[]>("flight-planning-missions", context);
            }
        },
        onSettled: () => {
            queryClient.invalidateQueries("flight-planning-routes");
        },
    });

    return {
        editMission: mutation.mutate,
        editMissionAsync: mutation.mutate,
        isLoading: mutation.isLoading,
        isSuccess: mutation.isSuccess,
        isError: mutation.isError,
        error: mutation.error,
    };
};
