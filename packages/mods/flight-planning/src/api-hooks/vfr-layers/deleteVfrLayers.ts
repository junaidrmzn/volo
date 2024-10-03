import { useToast } from "@volocopter/design-library-react";
import { useMutation, useQueryClient } from "react-query";
import type { AxiosError, Error, ResponseEnvelope } from "@voloiq/service";
import { paramsSerializer, useService } from "@voloiq/service";
import { useFlightPlanningTranslation } from "../../translations";

export const useDeleteVfrLayer = () => {
    const { axiosInstance } = useService();

    const deleteVfrLayer = async (tileset_id: string) => {
        const response = await axiosInstance.delete(
            `${BACKEND_BASE_URL}/v1/flight-planning-tiles/tiles/${tileset_id}`,
            {
                paramsSerializer,
                withCredentials: true,
            }
        );
        return response;
    };

    const queryClient = useQueryClient();
    const toast = useToast();
    const { t } = useFlightPlanningTranslation();

    const mutation = useMutation<ResponseEnvelope<string>, AxiosError<ResponseEnvelope<Error>>, string>(
        ["vfrLayer"],
        (tileset_id: string) => deleteVfrLayer(tileset_id),
        {
            onError: (error) => {
                toast({
                    title: t("vfrLayer.errors.delete"),
                    description: error.response?.data.error?.message || "",
                    status: "error",
                });
            },
            onSettled: () => {
                queryClient.invalidateQueries("vfrLayer");
            },
        }
    );

    return {
        deleteVfrLayer: mutation.mutate,
        isLoading: mutation.isLoading,
        isSuccess: mutation.isSuccess,
        isError: mutation.isError,
        error: mutation.error,
    };
};
