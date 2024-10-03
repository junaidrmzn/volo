/* eslint-disable @typescript-eslint/no-explicit-any */
import { useToast } from "@volocopter/design-library-react";
import type { FlightPlanInfo } from "@voloiq-typescript-api/flight-planning-types";
import { useMutation, useQueryClient } from "react-query";
import type { AxiosError, ResponseEnvelope } from "@voloiq/service";
import { paramsSerializer, useService } from "@voloiq/service";
import { useFlightPlanningTranslation } from "../../translations";

export const useCreateFlightPlan = (routeOptionId: number | string) => {
    const queryClient = useQueryClient();
    const toast = useToast();
    const { t } = useFlightPlanningTranslation();
    const { axiosInstance, baseUrl } = useService();

    const createFlightPlan = async (routeOptionId: number | string, newFlightPlan: FlightPlanInfo) => {
        const url = `${baseUrl}/route-options/${routeOptionId}/flight-plans`;

        const { data } = await axiosInstance.post<ResponseEnvelope<FlightPlanInfo>>(url, newFlightPlan, {
            paramsSerializer,
            withCredentials: true,
        });
        return data;
    };

    const mutation = useMutation<
        ResponseEnvelope<FlightPlanInfo>,
        AxiosError<ResponseEnvelope<Error>>,
        FlightPlanInfo & { routeTemplateId?: number }
    >(["addFlightPlan"], (newFlightPlan: FlightPlanInfo) => createFlightPlan(routeOptionId, newFlightPlan), {
        onSettled: () => {
            queryClient.invalidateQueries(["flight-plans"]);
        },
        onSuccess: () => {
            toast({
                title: t("flightPlanManagement.success.submit"),
                description: t("flightPlanManagement.success.submitText"),
                status: "success",
            });
        },
        onError: (error) => {
            toast({
                title: t("flightPlanManagement.errors.submit"),
                description: error.response?.data.error?.message || "",
                status: "error",
            });
        },
    });
    return {
        createFlightPlan: mutation.mutate,
        createFlightPlanAsync: mutation.mutateAsync,
        isLoading: mutation.isLoading,
        isSuccess: mutation.isSuccess,
        isError: mutation.isError,
        error: mutation.error,
    };
};
