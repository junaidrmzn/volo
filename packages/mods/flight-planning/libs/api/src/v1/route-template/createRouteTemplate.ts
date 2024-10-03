import { useToast } from "@volocopter/design-library-react";
import { useMutation, useQueryClient } from "react-query";
import type { AxiosError, Error, ResponseEnvelope } from "@voloiq/service";
import { paramsSerializer, useService } from "@voloiq/service";
import { RouteTemplate } from "./models";

type RouteTemplateCreate = RouteTemplate | { routeId?: number };

export const useCreateRouteTemplate = () => {
    const queryClient = useQueryClient();
    const toast = useToast();
    const { axiosInstance, baseUrl } = useService();
    const createRouteTemplate = (newRouteTemplate: RouteTemplateCreate): Promise<ResponseEnvelope<RouteTemplate>> => {
        return axiosInstance.post(`${baseUrl}/route-templates`, newRouteTemplate, {
            paramsSerializer,
            withCredentials: true,
        });
    };

    const mutation = useMutation<
        ResponseEnvelope<RouteTemplate>,
        AxiosError<ResponseEnvelope<Error>>,
        RouteTemplateCreate
    >("createRouteTemplate", (newRouteTemplate: RouteTemplateCreate) => createRouteTemplate(newRouteTemplate), {
        onError: (error) => {
            toast({
                title: "Error creating route template",
                description: error.response?.data.error?.message || "",
                status: "error",
            });
        },
        onSettled: () => {
            queryClient.invalidateQueries("route-templates");
        },
    });

    return {
        createRouteTemplate: mutation.mutate,
        createRouteTemplateAsync: mutation.mutateAsync,
        isLoading: mutation.isLoading,
        isSuccess: mutation.isSuccess,
        isError: mutation.isError,
        error: mutation.error,
    };
};
