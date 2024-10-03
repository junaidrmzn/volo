import { useToast } from "@volocopter/design-library-react";
import { useMutation } from "react-query";
import type { AxiosError, AxiosResponse, Error, ResponseEnvelope } from "@voloiq/service";
import { paramsSerializer, useService } from "@voloiq/service";
import { useFlightPlanningTranslation } from "../../translations";

type VfrLayer = {
    vfr_type: string;
    region_id: string;
    file_name: string;
    valid_to: Date;
};

type VfrTileEntity = {
    modified_on: Date;
    id: string;
    file_name: string;
    valid_to: Date;
    url?: string;
    created_on: Date;
    vfr_type: string;
    region_id: string;
};

export const usePostCreateTile = () => {
    const { axiosInstance } = useService();

    const postCreateTile = async (body: Partial<VfrLayer>): Promise<ResponseEnvelope<VfrTileEntity[]>> => {
        const { data }: AxiosResponse = await axiosInstance.post(
            `${BACKEND_BASE_URL}/v1/flight-planning-tiles/tiles`,
            body,
            {
                paramsSerializer,
                withCredentials: true,
            }
        );
        return data;
    };

    const toast = useToast();
    const { t } = useFlightPlanningTranslation();

    const mutation = useMutation<ResponseEnvelope<VfrTileEntity[]>, AxiosError<ResponseEnvelope<Error>>, VfrLayer>(
        ["createTile"],
        (body: Partial<VfrLayer>) => postCreateTile(body),
        {
            onMutate: async (body) => {
                return body;
            },
            onError: (error) => {
                toast({
                    title: t("vfrLayer.errors.patch"),
                    description: error.response?.data.error?.message || "",
                    status: "error",
                });
            },
        }
    );
    return {
        postCreateTile: mutation.mutateAsync,
        isLoading: mutation.isLoading,
        isSuccess: mutation.isSuccess,
        isError: mutation.isError,
        error: mutation.error,
    };
};
