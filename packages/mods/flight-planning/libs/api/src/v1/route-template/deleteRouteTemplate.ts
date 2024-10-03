import { useToast } from "@volocopter/design-library-react";
import { useMutation, useQueryClient } from "react-query";
import type { AxiosError, Error, ResponseEnvelope } from "@voloiq/service";
import { paramsSerializer, useService } from "@voloiq/service";
import { RouteTemplate } from "./models";

export const useDeleteRouteTemplate = () => {
    const queryClient = useQueryClient();
    const toast = useToast();
    const { axiosInstance, baseUrl } = useService();
    const deleteRouteTemplate = async (routeTemplate: RouteTemplate): Promise<void> => {
        return axiosInstance.delete(`${baseUrl}/route-templates/${routeTemplate.id}`, {
            paramsSerializer,
            withCredentials: true,
        });
    };

    const mutation = useMutation<void, AxiosError<ResponseEnvelope<Error>>, RouteTemplate, RouteTemplate[]>(
        "deleteRouteTemplate",
        (routeTemplate: RouteTemplate) => deleteRouteTemplate(routeTemplate),
        {
            onMutate: async (deletedRouteTemplate: RouteTemplate) => {
                // optimistic update
                await queryClient.cancelQueries("route-templates");
                const previousRouteTemplates = queryClient.getQueryData<RouteTemplate[]>("route-templates");

                if (previousRouteTemplates) {
                    queryClient.setQueryData<RouteTemplate[]>(
                        "route-templates",
                        previousRouteTemplates.filter((routeTemplate) => routeTemplate.id !== deletedRouteTemplate.id)
                    );
                }
                return previousRouteTemplates;
            },
            onError: (error, __, context) => {
                toast({
                    title: "Error deleting route template",
                    description: error.response?.data.error?.message || "",
                    status: "error",
                });

                if (context) {
                    queryClient.setQueryData<RouteTemplate[]>("route-templates", context);
                }
            },
            onSettled: () => {
                queryClient.invalidateQueries("route-templates");
            },
        }
    );

    return {
        deleteRouteTemplate: mutation.mutate,
        deleteRouteTemplateAsync: mutation.mutateAsync,
        isLoading: mutation.isLoading,
        isSuccess: mutation.isSuccess,
        isError: mutation.isError,
        error: mutation.error,
    };
};
