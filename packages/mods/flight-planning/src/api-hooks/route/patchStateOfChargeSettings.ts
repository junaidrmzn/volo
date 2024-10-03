import { useToast } from "@volocopter/design-library-react";
import type { RouteEnergySettings } from "@voloiq-typescript-api/flight-planning-types";
import { useMutation, useQueryClient } from "react-query";
import type { AxiosError, AxiosResponse, Error, ResponseEnvelope } from "@voloiq/service";
import { paramsSerializer, useService } from "@voloiq/service";
import { useFlightPlanningTranslation } from "../../translations";

export const usePatchStateOfChargeSettings = (routeId: string | number) => {
    const queryClient = useQueryClient();
    const { t: translate } = useFlightPlanningTranslation();
    const toast = useToast();
    const { axiosInstance, baseUrl } = useService();

    const patchStateOfChargeSettings = async (
        routeId: string | number,
        settings: Partial<RouteEnergySettings>
    ): Promise<ResponseEnvelope<RouteEnergySettings>> => {
        const response: AxiosResponse = await axiosInstance.patch(
            `${baseUrl}/routes/${routeId}/energy-settings`,
            settings,
            {
                paramsSerializer,
                withCredentials: true,
            }
        );
        return response.data;
    };

    const mutation = useMutation<
        ResponseEnvelope<RouteEnergySettings>,
        AxiosError<ResponseEnvelope<Error>>,
        RouteEnergySettings
    >(["patchSocSettings"], (settings: Partial<RouteEnergySettings>) => patchStateOfChargeSettings(routeId, settings), {
        onError: (error) => {
            toast({
                title: translate("errorMessages.patchSocPanelSettings"),
                description: error.response?.data.error?.message || "",
                status: "error",
            });
        },
        onSuccess: () => {
            toast({
                title: "Settings",
                description: "Updated Successfully",
                status: "success",
            });
        },
        onSettled: () => {
            queryClient.invalidateQueries(["jobs", { routeId }, "full-energy-calculation"]);
        },
    });
    return {
        patchStateOfChargeSettings: mutation.mutate,
        patchStateOfChargeSettingsAsync: mutation.mutateAsync,
        isLoading: mutation.isLoading,
        isSuccess: mutation.isSuccess,
        isError: mutation.isError,
        error: mutation.error,
    };
};
