/* eslint-disable @typescript-eslint/no-explicit-any */
import { useToast } from "@volocopter/design-library-react";
import type { FlightPlanInfo } from "@voloiq-typescript-api/flight-planning-types";
import { useMutation, useQueryClient } from "react-query";
import type { AxiosError, ResponseEnvelope } from "@voloiq/service";
import { paramsSerializer, useService } from "@voloiq/service";
import { useFlightPlanningTranslation } from "../../translations";

export const useActivateFlightPlan = () => {
    const queryClient = useQueryClient();
    const toast = useToast();
    const { t } = useFlightPlanningTranslation();
    const { axiosInstance, baseUrl } = useService();

    const activateFlightPlan = async (flightPlan: FlightPlanInfo) => {
        flightPlan.serviceProvider = undefined;
        const { data } = await axiosInstance.put<ResponseEnvelope<FlightPlanInfo>>(
            `${baseUrl}/flight-plans/${flightPlan.id}/activate`,
            flightPlan,
            {
                paramsSerializer,
                withCredentials: true,
            }
        );
        return data;
    };

    const mutation = useMutation<ResponseEnvelope<FlightPlanInfo>, AxiosError<ResponseEnvelope<Error>>, FlightPlanInfo>(
        ["activateFlightPlan"],
        (flightPlan: FlightPlanInfo) => activateFlightPlan(flightPlan),
        {
            onSuccess: () => {
                toast({
                    title: t("flightPlanManagement.success.activation"),
                    description: t("flightPlanManagement.success.activationText"),
                    status: "success",
                });
            },
            onSettled: () => {
                queryClient.invalidateQueries(["flight-plans"]);
            },
            onError: (error) => {
                toast({
                    title: t("flightPlanManagement.errors.activateFlightPlan"),
                    description: error.response?.data.error?.message || "",
                    status: "error",
                });
            },
        }
    );
    return {
        activateFlightPlan: mutation.mutate,
        activateFlightPlanAsync: mutation.mutateAsync,
        isLoading: mutation.isLoading,
        isSuccess: mutation.isSuccess,
        isError: mutation.isError,
        error: mutation.error,
    };
};
