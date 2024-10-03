import { useToast } from "@volocopter/design-library-react";
import type { RoutePreliminaryEnergy } from "@voloiq-typescript-api/flight-planning-types";
import { useQuery, useQueryClient } from "react-query";
import type { AxiosError, ResponseEnvelope } from "@voloiq/service";
import { paramsSerializer, useService } from "@voloiq/service";
import { useFlightPlanningTranslation } from "../../translations/useFlightPlanningTranslation";
import type { ExtractFunctionReturnType } from "../types";

export const useGetRoutePreliminaryEnergy = (routeId: string | number, enabled: boolean = true) => {
    const toast = useToast();
    const { t: translate } = useFlightPlanningTranslation();
    const queryClient = useQueryClient();
    const { baseUrl, axiosInstance } = useService();
    const queryKey = ["routes", { routeId }, "energy", "preliminaryEnergy"];

    const getRoutePreliminaryEnergy = async (routeId: string | number) => {
        const { data } = await axiosInstance.get<ResponseEnvelope<RoutePreliminaryEnergy>>(
            `${baseUrl}/routes/${routeId}/preliminary-energy`,
            {
                paramsSerializer,
                withCredentials: true,
            }
        );

        return data.data;
    };

    const query = useQuery<
        ExtractFunctionReturnType<typeof getRoutePreliminaryEnergy>,
        AxiosError<ResponseEnvelope<Error>>
    >({
        enabled,
        queryKey,
        queryFn: async () => {
            const response = await getRoutePreliminaryEnergy(routeId);
            return response;
        },
        onError: (error) => {
            toast({
                title: translate("errorMessages.preliminaryEnergyFetchError"),
                description: error.response?.data.error?.message || "",
                status: "error",
            });
            queryClient.cancelQueries(["routes", { routeId }, "energy", "fullEnergy"]);
            queryClient.invalidateQueries(["routes", { routeId }, "energy", "fullEnergy"]);
        },
    });

    return {
        ...query,
        invalidate: () => queryClient.invalidateQueries(queryKey),
    };
};
