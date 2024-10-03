import { useToast } from "@volocopter/design-library-react";
import { useMutation, useQueryClient } from "react-query";
import type { AxiosError, Error, ResponseEnvelope } from "@voloiq/service";
import { paramsSerializer, useService } from "@voloiq/service";
import { useFlightPlanningTranslation } from "../../translations/useFlightPlanningTranslation";

export const useComputeAltitudeProfile = (routeId: number | string) => {
    const toast = useToast();
    const { t: translate } = useFlightPlanningTranslation();
    const queryClient = useQueryClient();
    const { axiosInstance, baseUrl } = useService();

    const computeAltitudeProfile = async () => {
        await axiosInstance.patch(`${baseUrl}/routes/${routeId}/altitude-profile`, null, {
            paramsSerializer,
            withCredentials: true,
        });
    };

    const mutation = useMutation<void, AxiosError<ResponseEnvelope<Error>>>(
        ["routes", { routeId }, "compute-altitude-profile"],
        () => computeAltitudeProfile(),
        {
            onSuccess: () => {
                queryClient.invalidateQueries(["routes", { routeId }]);
            },
            onError: (error) => {
                toast({
                    title: translate("common.error"),
                    description:
                        error.response?.data.error?.message ||
                        translate("routeDetails.computeAltitudeProfile.error.message"),
                    status: "error",
                });
            },
        }
    );

    return {
        computeAltitudeProfile: mutation.mutate,
        computeAltitudeProfileAsync: mutation.mutateAsync,
        isLoading: mutation.isLoading,
        isSuccess: mutation.isSuccess,
        isError: mutation.isError,
        error: mutation.error,
    };
};
