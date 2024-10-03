import { useToast } from "@volocopter/design-library-react";
import type { ConductedRouteEnergy } from "@voloiq-typescript-api/flight-planning-types";
import { useQuery } from "react-query";
import type { AxiosError, ResponseEnvelope } from "@voloiq/service";
import { paramsSerializer, useService } from "@voloiq/service";
import { useFlightPlanningTranslation } from "../../translations/useFlightPlanningTranslation";
import type { ExtractFunctionReturnType } from "../types";

export const useGetConductedRouteEnergyTemperature = (routeId: string | number, enabled: boolean) => {
    const toast = useToast();
    const { t: translate } = useFlightPlanningTranslation();
    const { baseUrl, axiosInstance } = useService();

    const getConductedRouteEnergyTemperature = async (routeId: string | number) => {
        const { data } = await axiosInstance.get<ResponseEnvelope<ConductedRouteEnergy>>(
            `${baseUrl}/routes/${routeId}/conducted-route/energy`,
            {
                paramsSerializer,
                withCredentials: true,
            }
        );
        return data.data;
    };

    return useQuery<
        ExtractFunctionReturnType<typeof getConductedRouteEnergyTemperature>,
        AxiosError<ResponseEnvelope<Error>>
    >({
        enabled,
        queryKey: ["routes", { routeId }, "energy", "conductedRouteEnergyTemperature"],
        queryFn: async () => {
            const response = await getConductedRouteEnergyTemperature(routeId);
            return response;
        },
        onError: (error) => {
            toast({
                title: translate("errorMessages.conductedRouteEnergyTemperatureFetchError"),
                description: error.response?.data.error?.message || "",
                status: "error",
            });
        },
    });
};
